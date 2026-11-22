"use client";

import { Link, usePathname } from "@/app/i18n/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { links } from "../model/consts";

export const Header = () => {
  const pathname = usePathname().replace(/\/$/, "") || "/";
  const t = useTranslations("Header");
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  return (
    <header
      className="border-b border-primary bg-bg-card"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          menuButton.current?.focus();
        }
      }}
    >
      <div className="site-container flex min-h-20 flex-wrap items-center justify-between gap-x-6 gap-y-3 py-3">
        <a href="#main" className="sr-only focus:not-sr-only">{t("skip")}</a>
        <Link href="/" className="inline-flex items-center gap-3 rounded-lg text-[1.35rem] font-bold tracking-tight" onClick={() => setOpen(false)}>
          <span className="grid size-11 place-items-center rounded-[0.85rem] bg-link">
            <Image src="/brand/foxsay-logo.svg" alt="" width={32} height={32} />
          </span>
          FoxSay
        </Link>
        <button
          ref={menuButton}
          type="button"
          className="min-h-11 rounded-xl border border-primary px-4 font-semibold text-link md:hidden"
          aria-expanded={open}
          aria-controls="site-navigation"
          onClick={() => setOpen(!open)}
        >
          {t(open ? "closeMenu" : "openMenu")}
        </button>
        <nav
          id="site-navigation"
          aria-label={t("navigation")}
          className={`${open ? "block" : "hidden"} w-full md:block md:w-auto`}
        >
          <ul className="flex flex-col gap-1 md:flex-row">
            {links.map(({ href, label }) => {
              const current = href === pathname || (href !== "/" && pathname.startsWith(href + "/"));
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={current ? "page" : undefined}
                    className="block rounded-lg px-3 py-2.5 text-sm font-semibold hover:bg-blue-wash hover:text-link aria-[current=page]:bg-blue-wash aria-[current=page]:text-link"
                    onClick={() => setOpen(false)}
                  >
                    {t(`Navbar.${label}`)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};
