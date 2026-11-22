import { stat } from "node:fs/promises";
import path from "node:path";
import MarkdownIt from "markdown-it";

const parser = new MarkdownIt({ html: false });

export function parseMarkdown(source: string) {
  return parser.parse(source, {});
}

export function renderMarkdown(tokens: ReturnType<typeof parseMarkdown>) {
  return parser.renderer.render(tokens, parser.options, {});
}

export async function validateImage(source: string) {
  if (!source || /[\u0000-\u0020\\]/.test(source)) {
    throw new Error(`Invalid image URL: ${source}`);
  }
  if (/^https?:\/\//i.test(source)) {
    const url = new URL(source);
    if (url.hostname !== "fox-say.ru") return;
    source = url.pathname;
  }

  if (!source.startsWith("/") || source.startsWith("//")) {
    throw new Error(`Use a path from public/ such as /images/example.png: ${source}`);
  }

  const decoded = decodeURIComponent(source.split(/[?#]/, 1)[0]);
  const publicDir = path.resolve("public");
  const file = path.resolve(publicDir, `.${decoded}`);
  if (
    /[\\:\u0000-\u001f]/.test(decoded) ||
    !file.startsWith(publicDir + path.sep) ||
    !(await stat(file).catch(() => null))?.isFile()
  ) {
    throw new Error(`Image not found in public/: ${source}`);
  }
}

export async function validateMarkdownImages(tokens: ReturnType<typeof parseMarkdown>) {
  const images = tokens.flatMap((token) => token.children ?? []).filter((token) => token.type === "image");
  await Promise.all(images.map((token) => validateImage(token.attrGet("src") ?? "")));
}
