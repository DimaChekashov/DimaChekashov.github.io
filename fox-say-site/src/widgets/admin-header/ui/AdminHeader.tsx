"use client";

import Link from "next/link";
import React from "react";
import { links } from "../model/consts";
import { useAuth } from "@/app/providers/Auth/provider";
import { Button } from "@/shared/ui/Button/Button";

export const AdminHeader: React.FC = () => {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="mb-10 flex items-center p-4 border-b border-gray-200">
      <div>Fox Say Admin Panel</div>
      {user && (
        <>
          <nav className="ml-auto">
            <ul className="flex gap-4">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-blue-500">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Button
            htmlType="button"
            type="danger"
            onClick={handleLogout}
            className="ml-10"
          >
            Logout
          </Button>
        </>
      )}
    </header>
  );
};
