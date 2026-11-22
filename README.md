# FoxSay Portfolio and Blog

Dmitry Chekashov's website is available in Russian and English. Next.js, TypeScript, Tailwind CSS, and next-intl generate the static site in `out/`. GitHub Pages serves the exported HTML, CSS, and JavaScript. [Visit fox-say.ru](https://fox-say.ru/)

## Run locally

Use the Node.js version specified in [`.nvmrc`](.nvmrc) and run these commands from the repository root.

```sh
npm ci
npm run dev
```

Open `http://localhost:3000/ru/` or `http://localhost:3000/en/`. Run the following commands to verify a production build.

```sh
npm run typecheck
npm run lint
npm run build
npm run check:export
```

The last command starts a temporary static HTTP server, checks pages, links, and assets, then shuts down the server. To inspect the export manually, run `python -m http.server 8000 --directory out`.

## Publish a post

1. Create `content/posts/en/image-optimization/README.md` using the template below. Use lowercase ASCII letters, digits, and hyphens in the slug.
2. For a Russian translation, add `content/posts/ru/image-optimization/README.md` with the same slug. Start sections with `##`. The page heading comes from `title`.
3. Save images in `public/images/posts/<slug>/` and reference them as `/images/posts/<slug>/image.png`. Match the file path and letter case exactly. Embedded HTML is displayed as text.
4. When the post is ready, set `draft: false`. Run `npm run build` and `npm run check:export`. Errors involving dates, metadata, or image paths include the path to the Markdown file.
5. Push the change to `main` or open a pull request. GitHub Actions publishes the new export once the commit reaches `main`. The example post will be available at `https://fox-say.ru/en/blog/image-optimization/`.

```md
---
title: "Image Optimization"
excerpt: "How to choose the right formats and dimensions for website images."
date: "2026-11-22"
draft: true
tags: ["images", "performance"]
categories: ["Development"]
cover: ""
---

## Choosing a format

Write your post here.
```

The date displays the same calendar day in both locales. The `tags`, `categories`, and `cover` fields are optional. When `draft` is omitted, it defaults to `false`. Drafts are excluded from post listings, the static export, and the language switcher.

## URLs and deployment

| Legacy URL | New URL |
| --- | --- |
| `/` | `/ru/` |
| `/works` | `/ru/projects/` |
| `/about` | `/ru/about/` |
| `/contact` | `/ru/contact/` |
| `/skills` | `/ru/experience/#technologies` |

On pull requests, the workflow builds and verifies the artifact. On `main`, it publishes `out/` through the `github-pages` environment. To redeploy manually, select **Run workflow** and choose `main`. [GitHub Actions](https://github.com/DimaChekashov/DimaChekashov.github.io/actions/workflows/pages.yml)

The custom domain and HTTPS enforcement are configured in the repository. [Pages settings](https://github.com/DimaChekashov/DimaChekashov.github.io/settings/pages)

Before the migration, GitHub Pages published the root of `main`. The last successful deployment from that source used commit `01bf99bd46a82cf42ac2ab79c30d7be9d9ec1ddb`. To restore the original site, create a branch at that commit and publish its root using **Deploy from a branch**. Verify the homepage, the projects page, and the domain settings. To roll back a deployment under the current workflow, revert the problematic commit and verify the SHA of the successful deployment. [Pre-migration deployment](https://github.com/DimaChekashov/DimaChekashov.github.io/actions/runs/22865337779)
