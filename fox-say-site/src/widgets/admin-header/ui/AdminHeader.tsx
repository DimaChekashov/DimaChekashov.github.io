"use client";

import Link from "next/link";
import React from "react";
import { links } from "../model/consts";
import { useAuth } from "@/app/providers/Auth/provider";

export const AdminHeader: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="mb-10 flex items-center p-4 border-b border-gray-200">
      <div>Fox Say Admin Panel</div>
      <nav className="ml-auto mr-10">
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
      <button
        type="button"
        onClick={handleLogout}
        className="cursor-pointer py-1 px-4 bg-red-500 text-white"
      >
        Logout
      </button>
    </header>
  );
};
