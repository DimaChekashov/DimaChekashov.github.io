import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { isLocale, routing } from "../i18n/routing";
import { getPostSlugs } from "@/shared/content/posts";
import Header from "@/widgets/header";
import Footer from "@/widgets/footer";

export async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const { Header: header, Blog: blog } = await getMessages({ locale });
  const otherLocale = routing.locales.find((language) => language !== locale)!;
  const translatedSlugs = await getPostSlugs(otherLocale);

  return (
    <NextIntlClientProvider locale={locale} messages={{ Header: header, Blog: blog }}>
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col">
        <Header />
        <main id="main" className="min-w-0 grow">{children}</main>
        <Footer locale={locale} translatedSlugs={translatedSlugs} />
      </div>
    </NextIntlClientProvider>
  );
}
