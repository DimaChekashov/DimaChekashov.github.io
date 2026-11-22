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
    <footer className="mt-auto flex flex-col-reverse items-center justify-between gap-4 border-t border-primary bg-bg-card p-4 text-center md:flex-row md:px-6">
      <p className="text-sm text-muted">© {CURRENT_YEAR} FoxSay. {t("allRightsReserved")}</p>
      <LanguageSwitcher translatedSlugs={translatedSlugs} />
    </footer>
  );
}
