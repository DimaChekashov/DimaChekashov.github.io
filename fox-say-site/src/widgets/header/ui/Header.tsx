"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { links } from "../model/consts";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { useTranslations } from "next-intl";
import Image from "next/image";

import logo from "@/shared/assets/images/logo.png";
import { useIsClient, useMediaQuery, useScrollLock } from "usehooks-ts";

export const Header: React.FC = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("Header");
  const { lock, unlock } = useScrollLock();
  const isClient = useIsClient();
  const isMobile = useMediaQuery("(max-width: 767px)");

  const segments = pathname
    ? pathname.split("/").filter((segment) => segment !== "")
    : [];
  const firstSegment = segments[1] || "";

  const handleToggleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  useEffect(() => {
    if (isClient && isMobile && isOpenMenu) {
      lock();
    }

    return () => {
      unlock();
    };
  }, [isClient, isMobile, isOpenMenu, lock, unlock]);

  const handleNavClick = () => {
    if (isClient && !isMobile) return;
    setIsOpenMenu(false);
  };

  return (
    <header className="mb-10 flex justify-between p-4 border-b border-gray-200">
      <Image
        src={logo}
        alt="Logo"
        className="relative z-10 brightness-0 invert max-w-40"
      />
      <nav
        className={classNames(
          "bg-background fixed top-0 left-0 w-screen h-screen px-6 py-20 flex transition-all md:static md:p-0 md:w-auto md:h-auto md:items-center",
          isOpenMenu ? "max-md:translate-x-0" : "max-md:translate-x-full",
        )}
      >
        <ul className="flex flex-col gap-4 md:flex-row">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={classNames(
                  "hover:text-blue-500",
                  `/${firstSegment}` === href && "text-blue-500",
                )}
                onClick={handleNavClick}
              >
                {t(`Navbar.${label}`)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <button
        className="relative z-10 inline-flex flex-col gap-2 items-center justify-center w-10 h-10 md:hidden"
        onClick={handleToggleMenu}
      >
        <span className="bg-white h-0.5 w-8" />
        <span className="bg-white h-0.5 w-8" />
        <span className="bg-white h-0.5 w-8" />
      </button>
    </header>
  );
};
