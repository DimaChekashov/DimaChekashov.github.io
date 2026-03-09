import Header from "@/widgets/header";
import Footer from "@/widgets/footer";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "../i18n/routing";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import "../styles/globals.css";

interface MetadataProps {
  params: Promise<{ locale: string }>;
}

async function getLocaleMessages(locale: string) {
  switch (locale) {
    case "ru":
      return (await import("../../../messages/ru.json")).default;
    case "en":
      return (await import("../../../messages/en.json")).default;
    case "de":
      return (await import("../../../messages/de.json")).default;
    default:
      return (await import("../../../messages/ru.json")).default;
  }
}

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getLocaleMessages(locale);

  return {
    title: messages.Metadata.defaultTitle,
    description: messages.Metadata.defaultDescription,
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function RootLayout({ children, params }: Readonly<Props>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getLocaleMessages(locale);

  return (
    <html lang={locale}>
      <body className="antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="container mx-auto min-h-screen flex flex-col">
            <Header />
            {children}
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
