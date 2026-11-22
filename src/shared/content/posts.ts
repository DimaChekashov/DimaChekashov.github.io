import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { parse } from "yaml";
import { routing, type Locale } from "@/app/i18n/routing";
import { parseMarkdown, renderMarkdown, validateImage, validateMarkdownImages } from "./markdown";

export interface PostCard {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  categories: string[];
  cover: string;
}

interface Article {
  card: PostCard;
  tokens: ReturnType<typeof parseMarkdown>;
}

const contentRoot = path.join(process.cwd(), "content", "posts");
let postIndex: Promise<Map<Locale, Map<string, Article>>> | undefined;

function requiredText(value: unknown, field: string) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${field} must be a nonempty string`);
  }
  return value.trim();
}

function readDate(value: unknown) {
  const date = requiredText(value, "date");
  const parsed = new Date(`${date}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date.startsWith("0000") ||
      Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) {
    throw new Error("date must be a valid calendar date in YYYY-MM-DD format");
  }
  return date;
}

function readList(value: unknown, field: string) {
  if (value === undefined) return [];
  if (!Array.isArray(value)) throw new Error(`${field} must be an array of strings`);
  return [...new Set(value.map((item) => requiredText(item, field)))];
}

async function readArticle(locale: Locale, slug: string): Promise<Article | null> {
  const file = path.join(contentRoot, locale, slug, "README.md");

  try {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      throw new Error("slug must contain lowercase letters, digits and single hyphens");
    }
    const source = await readFile(file, "utf8");
    const block = /^(?:\uFEFF)?---[ \t]*\r?\n([\s\S]*?)^---[ \t]*\r?$(?:\n|$)/m.exec(source);
    if (!block || block.index !== 0) throw new Error("Expected a YAML frontmatter block");

    const metadata: unknown = parse(block[1], { schema: "core" });
    if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) {
      throw new Error("Frontmatter must be a YAML mapping");
    }
    const fields = metadata as Record<string, unknown>;
    const { draft = false, cover = "" } = fields;
    if (typeof draft !== "boolean") throw new Error("draft must be true or false");
    if (typeof cover !== "string") throw new Error("cover must be a string");

    const card = {
      slug,
      cover: cover.trim(),
      title: requiredText(fields.title, "title"),
      date: readDate(fields.date),
      excerpt: requiredText(fields.excerpt, "excerpt"),
      tags: readList(fields.tags, "tags"),
      categories: readList(fields.categories, "categories"),
    };
    const tokens = parseMarkdown(source.slice(block[0].length));
    await validateMarkdownImages(tokens);
    if (card.cover) await validateImage(card.cover);

    return draft ? null : { card, tokens };
  } catch (error) {
    throw new Error(`${path.relative(process.cwd(), file)}: ${(error as Error).message}`, { cause: error });
  }
}

async function buildIndex() {
  const entries = await Promise.all(routing.locales.map(async (locale) => {
    const directories = await readdir(path.join(contentRoot, locale), { withFileTypes: true })
      .catch((error: NodeJS.ErrnoException) => {
        if (error.code === "ENOENT") return [];
        throw error;
      });
    const articles = await Promise.all(directories.filter((entry) => entry.isDirectory())
      .map((entry) => readArticle(locale, entry.name)));
    const published = articles.filter((article) => article !== null);
    published.sort((a, b) => b.card.date.localeCompare(a.card.date) || a.card.slug.localeCompare(b.card.slug, "en"));
    return [locale, new Map(published.map((article) => [article.card.slug, article]))] as const;
  }));
  return new Map<Locale, Map<string, Article>>(entries);
}

function getIndex() {
  // Development must discover new and edited files without restarting Next.
  if (process.env.NODE_ENV === "development") return buildIndex();
  return postIndex ??= buildIndex();
}

export async function getPostsByLocale(locale: Locale): Promise<PostCard[]> {
  const articles = (await getIndex()).get(locale);
  return Array.from(articles?.values() ?? [], ({ card }) => card);
}

export async function getPostBySlug(locale: Locale, slug: string) {
  const article = (await getIndex()).get(locale)?.get(slug);
  return article && { ...article.card, contentHtml: renderMarkdown(article.tokens) };
}

export async function getPostSlugs(locale: Locale): Promise<string[]> {
  return [...((await getIndex()).get(locale)?.keys() ?? [])];
}
