# FoxSay — портфолио и блог

Сайт Дмитрия Чекашова на русском и английском. Next.js, TypeScript, Tailwind CSS и next-intl собирают страницы в `out/`. GitHub Pages раздаёт готовые HTML, CSS и JavaScript. Домен — [fox-say.ru](https://fox-say.ru/).

## Запуск из корня

Используйте Node.js из [`.nvmrc`](.nvmrc) и npm.

```sh
npm ci
npm run dev
```

Откройте `http://localhost:3000/ru/` или `http://localhost:3000/en/`. Для проверки выпуска выполните:

```sh
npm run typecheck
npm run lint
npm run build
npm run check:export
```

Последняя команда поднимает временный статический HTTP-сервер, проверяет страницы, ссылки и ресурсы и останавливает сервер. Для ручной проверки можно выполнить `python -m http.server 8000 --directory out`.

## Как опубликовать статью

1. Создайте `content/posts/ru/image-optimization/README.md` по шаблону ниже. Используйте в slug строчные латинские буквы, цифры и дефисы.
2. Для перевода добавьте `content/posts/en/image-optimization/README.md` с тем же slug. Начинайте разделы статьи с `##`. Заголовок страницы берётся из `title`.
3. Сохраняйте изображения в `public/images/posts/<slug>/` и ссылайтесь на них как на `/images/posts/<slug>/image.png`. Путь и регистр имени должны совпадать с файлом. Встроенный HTML отображается как текст.
4. Когда статья готова, укажите `draft: false`. Выполните `npm run build` и `npm run check:export`. Ошибки даты, метаданных и путей к изображениям содержат путь к Markdown-файлу.
5. Отправьте изменение в `main` или откройте PR. После принятия коммита GitHub Actions опубликует новый экспорт. Статья из примера откроется по адресу `https://fox-say.ru/ru/blog/image-optimization/`.

```md
---
title: "Оптимизация изображений"
excerpt: "Как выбрать формат и размеры для изображений сайта."
date: "2026-11-22"
draft: true
tags: ["изображения", "производительность"]
categories: ["Разработка"]
cover: ""
---

## Выбор формата

Текст статьи.
```

Дата сохраняет выбранный календарный день в обеих локалях. `tags`, `categories` и `cover` можно опустить. В существующих статьях без поля `draft` применяется `false`. Черновики отсутствуют в списках, экспорте и переключателе переводов.

## Адреса и выпуск

| Прежний адрес | Новый адрес |
| --- | --- |
| `/` | `/ru/` |
| `/works` | `/ru/projects/` |
| `/about` | `/ru/about/` |
| `/contact` | `/ru/contact/` |
| `/skills` | `/ru/experience/#technologies` |

В [GitHub Actions](https://github.com/DimaChekashov/DimaChekashov.github.io/actions/workflows/pages.yml) PR только собирает и проверяет артефакт. Из `main` рабочий процесс публикует `out/` через среду `github-pages`. Для повтора доступен **Run workflow** из `main`. Домен и принудительный HTTPS задаются в [настройках Pages](https://github.com/DimaChekashov/DimaChekashov.github.io/settings/pages).

До миграции GitHub Pages публиковал корень `main`; последняя успешная публикация была собрана из `01bf99bd46a82cf42ac2ab79c30d7be9d9ec1ddb`. При проблеме с первым выпуском исходный сайт можно восстановить, опубликовав корень этого коммита из отдельной ветки через **Deploy from a branch**. Проверьте главную, каталог проектов и настройки домена. После перехода на Actions откатите проблемный коммит обычным revert, затем проверьте SHA успешной публикации. [Исходный деплой](https://github.com/DimaChekashov/DimaChekashov.github.io/actions/runs/22865337779)
