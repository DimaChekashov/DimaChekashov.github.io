import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";

async function checkProjectViewer(page, locale, width, screenshotDir) {
  const url = page.url();
  const featured = page.locator('a[href="/images/projects/css-generator.png"]');
  const long = page.locator('a[href="/images/projects/artsvarka.jpg"]');
  const dialog = page.getByRole("dialog");
  const close = dialog.getByRole("button", { name: locale === "ru" ? "Закрыть" : "Close", exact: true });
  const scroll = dialog.locator(".project-dialog-scroll");
  const focusInside = () => page.evaluate(() => document.activeElement.closest("dialog") !== null);
  const isFocused = (element) => element.evaluate((node) => node === document.activeElement);

  assert.equal(await page.locator("a[data-screenshot-title]").count(), 16);
  await featured.focus();
  await page.keyboard.press("Enter");
  await dialog.waitFor({ state: "visible" });
  assert.equal(await dialog.getByRole("heading").innerText(), await featured.getAttribute("data-screenshot-title"));
  assert(await dialog.getByRole("img").evaluate((img) => img.src.endsWith("/images/projects/css-generator.png")));
  assert(await isFocused(close));
  const closeSize = await close.boundingBox();
  assert(closeSize && closeSize.width >= 44 && closeSize.height >= 44);
  assert.equal(page.url(), url);
  assert.equal(await page.locator("html").evaluate((node) => getComputedStyle(node).overflowY), "hidden");

  if (width !== 768) {
    await dialog.getByRole("img").evaluate((img) => img.decode());
    await page.screenshot({ path: path.join(screenshotDir, `${locale}-viewer-${width}.png`) });
  }

  for (const key of ["Tab", "Tab", "Shift+Tab", "Shift+Tab"]) {
    await page.keyboard.press(key);
    assert(await focusInside(), `Modal focus escaped on ${key}`);
  }
  await page.keyboard.press("Escape");
  await dialog.waitFor({ state: "hidden" });
  await featured.evaluate((node) => {
    if (document.activeElement !== node) throw Error("Escape did not restore focus to the preview");
  });

  await long.evaluate((link) => link.scrollIntoView({ block: "center", behavior: "instant" }));
  const pageScroll = await page.evaluate(() => window.scrollY);
  if (width === 360) await long.tap();
  else await long.click();
  assert.equal(await dialog.getByRole("heading").innerText(), "Artsvarka");
  const image = dialog.getByRole("img");
  const aspect = await image.evaluate(async (img) => {
    await img.decode();
    return [img.naturalWidth, img.naturalHeight, img.clientWidth, img.clientHeight];
  });
  assert.deepEqual(aspect.slice(0, 2), [1170, 5475]);
  assert(Math.abs(aspect[2] * 5475 / 1170 - aspect[3]) < 1);
  const closeTop = (await close.boundingBox()).y;
  await scroll.focus();
  await page.keyboard.press("End");
  await page.waitForFunction(() => {
    const panel = document.querySelector(".project-dialog-scroll");
    return panel && panel.scrollHeight > panel.clientHeight &&
      Math.abs(panel.scrollHeight - panel.clientHeight - panel.scrollTop) <= 1;
  });
  assert.equal((await close.boundingBox()).y, closeTop);
  await image.click({ position: { x: 5, y: aspect[3] - 8 } });
  assert(await dialog.isVisible());
  await close.click();
  await dialog.waitFor({ state: "hidden" });
  await page.waitForFunction((top) => window.scrollY === top, pageScroll);
  assert(await isFocused(long));

  await featured.click();
  await dialog.waitFor({ state: "visible" });
  assert.equal(await scroll.evaluate((node) => node.scrollTop), 0);
  await page.mouse.click(2, 2);
  await dialog.waitFor({ state: "hidden" });
  assert(await isFocused(featured));
  assert.equal(page.url(), url);

  for (const destination of [
    "https://github.com/DimaChekashov/foxsay-css-generator",
    "https://fox-say.ru/foxsay-css-generator",
  ]) {
    const link = page.locator(`main a[href="${destination}"]`);
    await page.route(destination, (route) => route.fulfill({ status: 200, body: "Project destination" }));
    await link.click();
    await page.waitForURL(destination);
    assert.equal(await page.locator("body").innerText(), "Project destination");
    await page.unroute(destination);
    await page.goto(url, { waitUntil: "networkidle" });
  }
}

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
        const page = await browser.newPage({ viewport: { width, height: 900 }, hasTouch: width === 360 });
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
            ...["about", "experience", "contact"].map((section) => [section, `/${locale}/${section}/`]),
          ]) {
            await page.goto(origin + route, { waitUntil: "networkidle" });
            assert.equal(await page.locator("html").getAttribute("lang"), locale);
            assert.equal(await page.locator("main h1").count(), 1);
            assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${route} overflows at ${width}px`);
            assert.equal(await page.locator("body").evaluate((body) => getComputedStyle(body).backgroundColor), "rgb(240, 242, 245)");
            assert.equal(await page.locator(`footer a[hreflang="${other}"]`).getAttribute("href"),
              label === "article" && !translated ? `/${other}/blog/` : route.replace(`/${locale}/`, `/${other}/`));

            if ((width === 360 || width === 1440) && ["home", "article", "projects"].includes(label)) {
              await page.screenshot({ path: path.join(screenshotDir, `${locale}-${label}-${width}.png`), fullPage: true });
            }
            if (label === "projects") {
              await checkProjectViewer(page, locale, width, screenshotDir);
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
      const withoutJavaScript = await browser.newPage({ javaScriptEnabled: false });
      try {
        await withoutJavaScript.goto(origin + `/${locale}/projects/`);
        await withoutJavaScript.locator('a[href="/images/projects/css-generator.png"]').click();
        await withoutJavaScript.waitForURL(origin + "/images/projects/css-generator.png");
      } finally {
        await withoutJavaScript.close();
      }
    }
    console.log(`Verified RU and EN at 360, 768, and 1440 px. Screenshots in ${screenshotDir}.`);
  } finally {
    await browser.close();
  }
}
