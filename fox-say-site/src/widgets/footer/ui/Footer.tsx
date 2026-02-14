import React from "react";
import { useTranslations } from "next-intl";
import { CURRENT_YEAR } from "@/shared/lib/contsts";
import LanguageSwitcher from "@/widgets/language-switcher";

export const Footer: React.FC = () => {
  const t = useTranslations("Footer");
  return (
    <footer className="flex flex-col-reverse gap-6 items-center justify-between p-4 mt-auto border-t border-gray-200 md:flex-row">
      <p>
        © {CURRENT_YEAR} FoxSay. {t("allRightsReserved")}
      </p>
      <LanguageSwitcher />
    </footer>
  );
};
