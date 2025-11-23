"use client";

import { useAuth } from "@/app/providers/Auth/provider";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [user, isLoading, router, pathname]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white-900"></div>
      </div>
    );
  }

  if (!user && pathname !== "/admin/login") {
    return null;
  }

  return <>{children}</>;
};
