import { routing } from "@/app/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
