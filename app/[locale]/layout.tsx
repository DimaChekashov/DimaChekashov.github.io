import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { isLocale, routing } from "@/app/i18n/routing";
import "@/app/styles/globals.css";

interface LocaleLayoutProps {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Pick<LocaleLayoutProps, "params">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return { title: t("defaultTitle"), description: t("defaultDescription") };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
