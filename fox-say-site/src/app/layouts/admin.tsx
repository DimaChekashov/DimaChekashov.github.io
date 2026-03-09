import type { Metadata } from "next";
import { AuthGuard } from "@/shared/ui/AuthGuard/AuthGuard";
import { AuthProvider } from "../providers/Auth/provider";
import AdminHeader from "@/widgets/admin-header";

import "../styles/globals.css";

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
      <body className="antialiased">
        <AuthProvider>
          <div className="container mx-auto min-h-screen flex flex-col">
            <AdminHeader />
            <AuthGuard>{children}</AuthGuard>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
