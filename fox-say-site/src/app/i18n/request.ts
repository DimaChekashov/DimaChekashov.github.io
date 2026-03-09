import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale }) => {
  const requestedLocale = locale;
  const resolvedLocale = hasLocale(routing.locales, requestedLocale)
    ? requestedLocale
    : routing.defaultLocale;

  return {
    locale: resolvedLocale,
    messages: (await import(`../../../messages/${resolvedLocale}.json`)).default,
  };
});
