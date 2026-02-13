import { LOCALES } from "@/shared/lib/contsts";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: [LOCALES.en, LOCALES.ru, LOCALES.de],
  defaultLocale: LOCALES.ru,
});
