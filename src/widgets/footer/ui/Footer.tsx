import { getTranslations } from "next-intl/server";
import { CURRENT_YEAR } from "@/shared/lib/contsts";
import LanguageSwitcher from "@/widgets/language-switcher";
import type { Locale } from "@/app/i18n/routing";

export async function Footer({ locale, translatedSlugs }: {
  locale: Locale;
  translatedSlugs: readonly string[];
}) {
  const t = await getTranslations({ locale, namespace: "Footer" });
  return (
    <footer className="mt-auto border-t border-primary bg-bg-card">
      <div className="site-container flex flex-col-reverse items-start justify-between gap-4 py-6 sm:flex-row sm:items-center">
        <p className="text-sm text-muted">© {CURRENT_YEAR} FoxSay. {t("allRightsReserved")}</p>
        <LanguageSwitcher translatedSlugs={translatedSlugs} />
      </div>
    </footer>
  );
}
