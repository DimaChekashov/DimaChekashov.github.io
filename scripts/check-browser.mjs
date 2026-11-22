import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";

export async function checkBrowser(origin, articleRoutes) {
  const screenshotDir = path.resolve("out", "..", ".next", "qa");
  await mkdir(screenshotDir, { recursive: true });
  const browser = await chromium.launch({
    executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
  });

  try {
    for (const locale of ["ru", "en"]) {
      const other = locale === "ru" ? "en" : "ru";
      const articles = articleRoutes.filter((route) => route.startsWith(`/${locale}/`));
      const translated = articles.find((route) => articleRoutes.includes(route.replace(`/${locale}/`, `/${other}/`)));
      const article = translated ?? articles[0];
      const title = locale === "ru" ? "Меню" : "Menu";
      for (const width of [360, 768, 1440]) {
        const page = await browser.newPage({ viewport: { width, height: 900 } });
        const failures = [];
        page.on("pageerror", (error) => failures.push(error.message));
        page.on("response", (response) => {
          if (response.url().startsWith(origin) && response.status() >= 400) {
            failures.push(`${response.status()} ${response.url()}`);
          }
        });
        try {
          for (const [label, route] of [
            ["home", `/${locale}/`],
            ...(article ? [["article", article]] : []),
            ["projects", `/${locale}/projects/`],
          ]) {
            await page.goto(origin + route, { waitUntil: "networkidle" });
            assert.equal(await page.locator("html").getAttribute("lang"), locale);
            assert.equal(await page.locator("main h1").count(), 1);
            assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${route} overflows at ${width}px`);
            assert.equal(await page.locator("body").evaluate((body) => getComputedStyle(body).backgroundColor), "rgb(240, 242, 245)");
            assert.equal(await page.locator(`footer a[hreflang="${other}"]`).getAttribute("href"),
              label === "article" && !translated ? `/${other}/blog/` : route.replace(`/${locale}/`, `/${other}/`));

            if (width === 360 || width === 1440) {
              if (label !== "projects") {
                await page.screenshot({ path: path.join(screenshotDir, `${locale}-${label}-${width}.png`), fullPage: true });
              }
            }
            if (label === "home" && width === 360) {
              const menu = page.getByRole("button", { name: title, exact: true });
              await menu.focus();
              await page.keyboard.press("Enter");
              const close = page.locator("button[aria-controls=site-navigation]");
              assert.equal(await close.getAttribute("aria-expanded"), "true");
              await page.keyboard.press("Tab");
              assert(await page.evaluate(() => document.activeElement.closest("#site-navigation") !== null));
              await page.keyboard.press("Escape");
              assert.equal(await close.getAttribute("aria-expanded"), "false");
              assert(await close.evaluate((button) => document.activeElement === button && getComputedStyle(button).outlineStyle === "solid"));
            }
          }
          await page.goto(origin + `/${locale}/blog/`, { waitUntil: "networkidle" });
          const cards = page.locator("main article");
          const filters = page.locator("main select");
          const blogTitle = locale === "ru" ? "Блог" : "Blog";
          assert.equal(await page.locator("main h1").innerText(), blogTitle);
          const count = await cards.count();
          for (const filter of await filters.all()) {
            if ((await filter.locator("option").count()) <= 1) continue;
            await filter.selectOption({ index: 1 });
            const filtered = await cards.count();
            assert(filtered > 0 && filtered <= count, "Filter should retain matching cards");
            await filter.selectOption("");
            assert.equal(await cards.count(), count);
          }
          assert.deepEqual(failures, []);
        } finally {
          await page.close();
        }
      }
    }
    console.log(`Verified RU and EN at 360, 768, and 1440 px. Screenshots in ${screenshotDir}.`);
  } finally {
    await browser.close();
  }
}
