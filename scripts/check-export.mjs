import { createServer } from "node:http";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";
import { parse } from "parse5";

const exportDir = path.resolve("out");
const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

function outputFile(pathname) {
  const file = path.resolve(exportDir, "." + decodeURIComponent(pathname));
  if (file !== exportDir && !file.startsWith(exportDir + path.sep)) throw new Error("Invalid path");
  return pathname.endsWith("/") ? path.join(file, "index.html") : file;
}

// Serve exported files only. An unknown URL must reach the exported 404.
const server = createServer(async (request, response) => {
  try {
    const pathname = new URL(request.url, "http://127.0.0.1").pathname;
    let file = outputFile(pathname);
    if (!path.extname(pathname) && !pathname.endsWith("/")) {
      await readFile(path.join(file, "index.html"));
      response.writeHead(301, { Location: pathname + "/" }).end();
      return;
    }
    const body = await readFile(file);
    response.writeHead(200, { "Content-Type": contentTypes[path.extname(file)] ?? "application/octet-stream" }).end(body);
  } catch {
    response.writeHead(404, { "Content-Type": contentTypes[".html"] }).end(await readFile(path.join(exportDir, "404.html")));
  }
});

function collect(node, predicate) {
  return [
    ...(predicate(node) ? [node] : []),
    ...(node.childNodes ?? []).flatMap((child) => collect(child, predicate)),
  ];
}

function attr(node, name) {
  return node.attrs?.find((attribute) => attribute.name === name)?.value;
}

function refreshTarget(doc) {
  const refresh = collect(doc, (node) => node.tagName === "meta" && attr(node, "http-equiv") === "refresh")[0];
  return refresh && attr(refresh, "content")?.match(/;\s*url=(\S+)/i)?.[1];
}

const routes = new Map([
  ["/", "/ru/"],
  ["/works/", "/ru/projects/"],
  ["/about/", "/ru/about/"],
  ["/contact/", "/ru/contact/"],
  ["/skills/", "/ru/experience/#technologies"],
]);
const locales = ["ru", "en"];

await readFile(path.join(exportDir, "404.html"));
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const responses = new Map();
const documents = new Map();

function get(url) {
  const requestURL = url.origin + url.pathname + url.search;
  if (!responses.has(requestURL)) responses.set(requestURL, fetch(requestURL));
  return responses.get(requestURL);
}

try {
  const files = await readdir(exportDir, { recursive: true });
  assert(files.some((file) => /^_next[\\/].*\.css$/.test(file)), "Missing CSS in _next/");
  assert(files.some((file) => /^_next[\\/].*\.js$/.test(file)), "Missing JS in _next/");

  for (const file of files.filter((name) => name.endsWith(".html"))) {
    const url = new URL("/" + file.replaceAll("\\", "/").replace(/(^|\/)index\.html$/, "$1"), origin);
    const response = await get(url);
    assert.equal(response.status, 200, url.pathname);
    documents.set(url.pathname, parse(await response.text()));
  }

  for (const locale of locales) {
    for (const name of ["", "about/", "experience/", "projects/", "contact/", "blog/"]) {
      const route = `/${locale}/${name}`;
      const doc = documents.get(route);
      assert(doc && collect(doc, (node) => node.tagName === "h1").length === 1, `Expected heading in ${route}`);
      assert.equal(attr(collect(doc, (node) => node.tagName === "html")[0], "lang"), locale, route);
    }
  }

  for (const [route, doc] of documents) {
    if (!/^\/(ru|en)\/blog\/[^/]+\/$/.test(route)) continue;
    assert(doc && collect(doc, (node) => node.tagName === "article").length, `Missing article markup in ${route}`);
    assert.equal(collect(doc, (node) => node.tagName === "h1").length, 1, route);
    const locale = route.split("/")[1];
    const other = locale === "ru" ? "en" : "ru";
    const translated = route.replace(`/${locale}/`, `/${other}/`);
    const expected = documents.has(translated) ? translated : `/${other}/blog/`;
    assert(collect(doc, (node) => node.tagName === "a" && attr(node, "hreflang") === other &&
      attr(node, "href") === expected).length, `Missing language link in ${route}`);
  }

  for (const [route, target] of routes) {
    const doc = documents.get(route);
    assert(doc && refreshTarget(doc) === target, `Incorrect redirect for ${route}`);
    assert(collect(doc, (node) => node.tagName === "a" && attr(node, "href") === target).length, route);
    if (route !== "/") assert.equal((await get(new URL(route.slice(0, -1), origin))).status, 200, route);
  }

  const missing = await get(new URL("/en/blog/does-not-exist/", origin));
  assert.equal(missing.status, 404);
  const errorPage = parse(await missing.text());
  for (const locale of locales) {
    assert(collect(errorPage, (node) => node.tagName === "a" && attr(node, "href") === `/${locale}/`).length);
  }

  async function checkReference(reference, route) {
    if (!reference) return;
    const url = new URL(reference, origin + route);
    if (url.origin === "https://fox-say.ru" &&
        url.pathname.replace(/\/$/, "") !== "/foxsay-css-generator") {
      url.protocol = "http:";
      url.host = new URL(origin).host;
    }
    if (url.origin !== origin) return;
    const response = await get(url);
    const context = `${route} → ${reference}`;
    assert.equal(response.status, 200, context);
    if (url.hash) {
      const doc = documents.get(new URL(response.url).pathname);
      assert(doc && collect(doc, (node) => attr(node, "id") === decodeURIComponent(url.hash.slice(1))).length, context);
    }
  }

  for (const [route, doc] of documents) {
    const references = collect(doc, (node) => node.attrs?.some(({ name }) => name === "href" || name === "src"))
      .flatMap((node) => [attr(node, "href"), attr(node, "src")]);
    await Promise.all([...references, refreshTarget(doc)].map((reference) => checkReference(reference, route)));
  }
  if (process.argv.includes("--browser")) {
    const { checkBrowser } = await import("./check-browser.mjs");
    await checkBrowser(origin, [...documents.keys()].filter((route) => /^\/(ru|en)\/blog\/[^/]+\/$/.test(route)));
  }
  console.log(`Verified ${documents.size} HTML pages and ${responses.size} HTTP requests against out/.`);
} finally {
  await new Promise((resolve) => server.close(resolve));
}
