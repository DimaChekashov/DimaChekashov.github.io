"use client";

import { usePathname } from "@/app/i18n/navigation";
import { routing } from "@/app/i18n/routing";
import { useLocale, useTranslations } from "next-intl";

export const LanguageSwitcher = ({ translatedSlugs }: { translatedSlugs: readonly string[] }) => {
  const currentLocale = useLocale();
  const pathname = usePathname().replace(/\/$/, "");
  const articleSlug = /^\/blog\/([^/]+)$/.exec(pathname)?.[1];
  const t = useTranslations("Header");

  return (
    <nav aria-label={t("languages")} className="flex flex-wrap items-center gap-2">
      {routing.locales.map((locale) => {
        if (locale === currentLocale) {
          return <span key={locale} aria-current="true" className="inline-flex min-h-11 items-center rounded-lg bg-blue-wash px-3 text-sm font-bold text-link">{locale.toUpperCase()}</span>;
        }
        const fallback = articleSlug && !translatedSlugs.includes(articleSlug);
        const target = fallback ? "/blog" : pathname;
        return (
          <a key={locale} href={`/${locale}${target}/`} hrefLang={locale} className="inline-flex min-h-11 items-center rounded-lg border border-primary px-3 text-sm font-semibold text-link hover:bg-blue-wash">
            {fallback ? t(locale === "en" ? "allEnglishPosts" : "allRussianPosts") : locale.toUpperCase()}
          </a>
        );
      })}
    </nav>
  );
};
