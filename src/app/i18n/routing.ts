import { hasLocale } from "next-intl";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ru", "en"],
  defaultLocale: "ru",
});

export type Locale = (typeof routing.locales)[number];

export function isLocale(value: string): value is Locale {
  return hasLocale(routing.locales, value);
}
