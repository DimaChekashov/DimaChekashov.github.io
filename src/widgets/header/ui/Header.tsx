"use client";

import { Link, usePathname } from "@/app/i18n/navigation";
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
      className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-primary bg-bg-card px-4 py-3 md:px-6"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          menuButton.current?.focus();
        }
      }}
    >
      <a href="#main" className="sr-only focus:not-sr-only">{t("skip")}</a>
      <Link href="/" className="text-xl font-bold text-link" onClick={() => setOpen(false)}>
        FoxSay
      </Link>
      <button
        ref={menuButton}
        type="button"
        className="rounded-md border border-primary px-3 py-2 text-link md:hidden"
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
                  className="block rounded-md px-2 py-2 hover:bg-secondary hover:text-link aria-[current=page]:bg-secondary aria-[current=page]:font-semibold aria-[current=page]:text-link"
                  onClick={() => setOpen(false)}
                >
                  {t(`Navbar.${label}`)}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};
