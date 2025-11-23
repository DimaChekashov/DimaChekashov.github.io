"use client";

import { useAuth } from "@/app/providers/Auth/provider";
import LoginForm from "@/features/login-form";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (user && pathname === "/admin/login") {
      router.push("/admin");
    }
  }, [user, router, pathname]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white-900"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <h1 className="text-5xl font-bold mb-12">Admin Login</h1>
      <LoginForm />
    </div>
  );
}
