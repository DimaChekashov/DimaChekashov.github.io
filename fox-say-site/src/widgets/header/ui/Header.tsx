"use client";

import Link from "next/link";
import React from "react";
import { links } from "../model/consts";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { useTranslations } from "next-intl";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const t = useTranslations("Header");

  const segments = pathname
    ? pathname.split("/").filter((segment) => segment !== "")
    : [];
  const firstSegment = segments[1] || "";

  return (
    <header className="mb-10 flex justify-between p-4 border-b border-gray-200">
      <div>Fox Say Logo</div>
      <nav>
        <ul className="flex gap-4">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={classNames(
                  "hover:text-blue-500",
                  `/${firstSegment}` === href && "text-blue-500"
                )}
              >
                {t(`Navbar.${label}`)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
