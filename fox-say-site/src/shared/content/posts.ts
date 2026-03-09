import { promises as fs } from "fs";
import path from "path";
import { LOCALES, type LocaleKey } from "@/shared/lib/contsts";
import { markdownToHtml } from "./markdown";

export interface BlogPostFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  categories: string[];
  cover: string;
  draft: boolean;
}

export interface BlogPost {
  locale: LocaleKey;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  categories: string[];
  cover: string;
  draft: boolean;
  contentMarkdown: string;
  contentHtml: string;
}

const CONTENT_ROOT = path.join(process.cwd(), "content", "posts");

function parseValue(raw: string): string | string[] | boolean {
  const value = raw.trim();

  if (value === "true") return true;
  if (value === "false") return false;

  if (value.startsWith("[") && value.endsWith("]")) {
    const inner = value.slice(1, -1).trim();
    if (!inner) return [];

    return inner
      .split(",")
      .map((part) => part.trim().replace(/^"(.*)"$/, "$1"))
      .filter(Boolean);
  }

  return value.replace(/^"(.*)"$/, "$1");
}

function parseFrontmatter(source: string): {
  frontmatter: BlogPostFrontmatter;
  markdown: string;
} {
  const normalized = source.replaceAll("\r\n", "\n");

  if (!normalized.startsWith("---\n")) {
    throw new Error("Missing frontmatter block in post file");
  }

  const end = normalized.indexOf("\n---\n", 4);
  if (end === -1) {
    throw new Error("Invalid frontmatter closing delimiter");
  }

  const rawFrontmatter = normalized.slice(4, end);
  const markdown = normalized.slice(end + 5).trim();
  const frontmatterRecord: Record<string, string | string[] | boolean> = {};

  for (const line of rawFrontmatter.split("\n")) {
    const dividerIndex = line.indexOf(":");
    if (dividerIndex === -1) continue;

    const key = line.slice(0, dividerIndex).trim();
    const value = line.slice(dividerIndex + 1);
    frontmatterRecord[key] = parseValue(value);
  }

  const frontmatter: BlogPostFrontmatter = {
    title: String(frontmatterRecord.title ?? ""),
    date: String(frontmatterRecord.date ?? ""),
    excerpt: String(frontmatterRecord.excerpt ?? ""),
    tags: Array.isArray(frontmatterRecord.tags) ? frontmatterRecord.tags : [],
    categories: Array.isArray(frontmatterRecord.categories)
      ? frontmatterRecord.categories
      : [],
    cover: String(frontmatterRecord.cover ?? ""),
    draft: Boolean(frontmatterRecord.draft ?? false),
  };

  return { frontmatter, markdown };
}

async function readPost(locale: LocaleKey, slug: string): Promise<BlogPost> {
  const filePath = path.join(CONTENT_ROOT, locale, slug, "README.md");
  const fileContent = await fs.readFile(filePath, "utf-8");
  const { frontmatter, markdown } = parseFrontmatter(fileContent);

  return {
    locale,
    slug,
    ...frontmatter,
    contentMarkdown: markdown,
    contentHtml: markdownToHtml(markdown),
  };
}

export async function getPostsByLocale(locale: LocaleKey): Promise<BlogPost[]> {
  const localeDir = path.join(CONTENT_ROOT, locale);

  let slugDirs: string[] = [];
  try {
    const entries = await fs.readdir(localeDir, { withFileTypes: true });
    slugDirs = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  } catch {
    return [];
  }

  const posts = await Promise.all(slugDirs.map((slug) => readPost(locale, slug)));

  return posts
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(
  locale: LocaleKey,
  slug: string,
): Promise<BlogPost | null> {
  try {
    const post = await readPost(locale, slug);
    if (post.draft) return null;
    return post;
  } catch {
    return null;
  }
}

export async function getAllPostParams(): Promise<
  Array<{ locale: LocaleKey; id: string }>
> {
  const locales = [LOCALES.ru, LOCALES.en, LOCALES.de] as const;
  const params = await Promise.all(
    locales.map(async (locale) => {
      const posts = await getPostsByLocale(locale);
      return posts.map((post) => ({ locale, id: post.slug }));
    }),
  );

  return params.flat();
}
