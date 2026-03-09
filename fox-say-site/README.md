# FoxSay Site (Static)

Multilingual Next.js portfolio/blog exported as static files for GitHub Pages.

## Stack
- Next.js 15 (App Router)
- next-intl (`ru`, `en`, `de`)
- Markdown posts from repository files

## Local development
1. `npm install`
2. `npm run dev`

## Build static export
1. `npm run build`
2. Static files are generated in `out/`

## Content model
Each post is a separate file:

- `content/posts/ru/<slug>/README.md`
- `content/posts/en/<slug>/README.md`
- `content/posts/de/<slug>/README.md`

Frontmatter fields:
- `title`
- `date` (`YYYY-MM-DD`)
- `excerpt`
- `tags` (`["tag1", "tag2"]`)
- `categories` (`["cat1", "cat2"]`)
- `cover` (optional image URL/path)
- `draft` (`true`/`false`)

## Deployment
GitHub Actions workflow: `.github/workflows/deploy-pages.yml`

- Builds the project
- Uploads `out/`
- Deploys to GitHub Pages
