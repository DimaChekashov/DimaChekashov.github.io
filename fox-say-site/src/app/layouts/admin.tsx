import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "../styles/globals.css";
import { AuthGuard } from "@/shared/ui/AuthGuard/AuthGuard";
import { AuthProvider } from "../providers/Auth/provider";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Foxsay Website - Admin Panel",
};

export function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        <AuthProvider>
          <div className="container mx-auto min-h-screen flex flex-col">
            <AuthGuard>{children}</AuthGuard>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
