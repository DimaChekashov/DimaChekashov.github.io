import { ROUTES } from "@/shared/lib/contsts";
import { ILink } from "@/shared/lib/types";

export const links: ILink[] = [
  { href: ROUTES.HOME, label: "Home" },
  { href: ROUTES.ABOUT, label: "About" },
  { href: ROUTES.EXPERIENCE, label: "Experience" },
  { href: ROUTES.PROJECTS, label: "Projects" },
  { href: ROUTES.CONTACT, label: "Contact" },
  { href: ROUTES.BLOG, label: "Blog" },
];
