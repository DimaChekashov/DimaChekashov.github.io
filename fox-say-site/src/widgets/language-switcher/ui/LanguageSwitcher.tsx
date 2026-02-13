"use client";

import { usePathname, useRouter } from "next/navigation";
import { LanguageButton } from "./LanguageButton";
import type { LocaleKey } from "@/shared/lib/contsts";

export const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();

  if (!pathname) {
    return null;
  }

  const switchLanguage = (locale: LocaleKey) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    router.push(segments.join("/"));
  };

  const currentLocale = pathname.split("/")[1];

  return (
    <div className="flex gap-1">
      <LanguageButton
        label="RU"
        disabled={currentLocale === "ru"}
        onClick={() => switchLanguage("ru")}
      />
      <span>/</span>
      <LanguageButton
        label="EN"
        disabled={currentLocale === "en"}
        onClick={() => switchLanguage("en")}
      />
      <span>/</span>
      <LanguageButton
        label="DE"
        disabled={currentLocale === "de"}
        onClick={() => switchLanguage("de")}
      />
    </div>
  );
};
