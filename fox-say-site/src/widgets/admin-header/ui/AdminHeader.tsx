import Link from "next/link";
import React from "react";
import { links } from "../model/consts";

export const AdminHeader: React.FC = () => {
  return (
    <header className="mb-10 flex justify-between p-4 border-b border-gray-200">
      <div>Fox Say Admin Panel</div>
      <nav>
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
    </header>
  );
};
