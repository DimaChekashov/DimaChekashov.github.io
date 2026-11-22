import { ROUTES } from "@/shared/lib/contsts";

export const links = [
  { href: ROUTES.HOME, label: "home" },
  { href: ROUTES.ABOUT, label: "about" },
  { href: ROUTES.EXPERIENCE, label: "experience" },
  { href: ROUTES.PROJECTS, label: "projects" },
  { href: ROUTES.BLOG, label: "blog" },
  { href: ROUTES.CONTACT, label: "contact" },
] as const;
