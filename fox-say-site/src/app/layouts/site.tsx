import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Header from "@/widgets/header";
import Footer from "@/widgets/footer";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "../i18n/routing";
import { notFound } from "next/navigation";

import "../styles/globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Foxsay Website",
  description: "Foxsay website description",
};

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function RootLayout({ children, params }: Readonly<Props>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={`${roboto.variable} antialiased`}>
        <NextIntlClientProvider>
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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
