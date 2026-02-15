export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  EXPERIENCE: "/experience",
  PROJECTS: "/projects",
  CONTACT: "/contact",
  BLOG: "/blog",
  ADMIN: "/admin",
  LOGIN: "/admin/login",
} as const;

export const CURRENT_YEAR = new Date().getFullYear();

export const LOCALES = {
  ru: "ru",
  en: "en",
  de: "de",
} as const;
export type LocaleKey = (typeof LOCALES)[keyof typeof LOCALES];

export const SOCIAL_LINKS = {
  habr: "https://career.habr.com/foxsayjs",
  linkedin: "https://www.linkedin.com/in/foxsayjs",
  telegram: "https://t.me/FoxSayJS",
} as const;

export const EMAIL = "foxdima99@gmail.com";
