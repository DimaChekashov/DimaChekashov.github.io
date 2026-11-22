import { useLocale } from "next-intl";
import { createNavigation } from "next-intl/navigation";
import type { ComponentProps } from "react";
import { routing } from "./routing";

export const { usePathname } = createNavigation(routing);

// Ordinary links work with the exported HTML on any static host.
export function Link({ href, ...props }: ComponentProps<"a"> & { href: string }) {
  const locale = useLocale();
  return <a {...props} href={`/${locale}${href.replace(/\/$/, "")}/`} />;
}
