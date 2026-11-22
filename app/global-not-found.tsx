import { routing } from "@/app/i18n/routing";
import "@/app/styles/globals.css";

const homeLabels = { ru: "На главную", en: "Go to homepage" };

export default function GlobalNotFound() {
  return (
    <html lang={routing.defaultLocale}>
      <body className="grid min-h-screen place-items-center p-4">
        <main className="surface w-full max-w-xl px-6 py-10 text-center sm:p-12">
          <p className="mb-3 text-5xl font-bold tracking-tight text-link sm:text-6xl">404</p>
          <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">Страница не найдена</h1>
          <p lang="en" className="mt-3 text-muted">This page could not be found.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            {routing.locales.map((locale) => (
              <a className="button-primary" href={`/${locale}/`} key={locale} hrefLang={locale} lang={locale}>
                {homeLabels[locale]}
              </a>
            ))}
          </div>
        </main>
      </body>
    </html>
  );
}
