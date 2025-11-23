import { ROUTES } from "@/shared/lib/contsts";
import { ILink } from "@/shared/lib/types";

export const links: ILink[] = [
  { href: ROUTES.HOME, label: "home" },
  { href: ROUTES.ABOUT, label: "about" },
  { href: ROUTES.EXPERIENCE, label: "experience" },
  { href: ROUTES.PROJECTS, label: "projects" },
  { href: ROUTES.CONTACT, label: "contact" },
  { href: ROUTES.BLOG, label: "blog" },
];
