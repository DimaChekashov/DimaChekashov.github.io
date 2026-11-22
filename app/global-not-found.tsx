import { routing } from "@/app/i18n/routing";
import "@/app/styles/globals.css";

export default function GlobalNotFound() {
  return (
    <html lang={routing.defaultLocale}>
      <body className="grid min-h-screen place-items-center p-4">
        <main className="space-y-4 rounded-2xl bg-bg-card p-8 text-center">
          <h1 className="text-2xl font-bold">404 · Страница не найдена</h1>
          <p lang="en">This page could not be found.</p>
          <div className="flex justify-center gap-4">
            {routing.locales.map((locale) => (
              <a className="underline text-link" href={`/${locale}/`} key={locale} hrefLang={locale}>
                {locale.toUpperCase()}
              </a>
            ))}
          </div>
        </main>
      </body>
    </html>
  );
}
