import { Heading } from "@/shared/ui/Heading";
import Image from "next/image";

import habr from "@/shared/assets/images/social/habr.svg";
import linkedin from "@/shared/assets/images/social/linkedin.svg";
import telegram from "@/shared/assets/images/social/telegram.svg";
import { EMAIL, SOCIAL_LINKS } from "@/shared/lib/contsts";
import { useTranslations } from "next-intl";

const channels = [
  { title: "Habr Career", icon: habr, href: SOCIAL_LINKS.habr },
  { title: "LinkedIn", icon: linkedin, href: SOCIAL_LINKS.linkedin },
  { title: "Telegram", icon: telegram, href: SOCIAL_LINKS.telegram },
];

export default function ContactPage() {
  const t = useTranslations("ContactPage");

  return (
    <div className="page-shell">
      <div className="mx-auto max-w-4xl">
        <Heading as="h1" className="page-title">{t("title")}</Heading>
        <div className="grid gap-4 sm:grid-cols-3">
          {channels.map(({ title, icon, href }) => (
            <a key={title} href={href} target="_blank" rel="noreferrer"
              className="surface flex items-center gap-4 p-5 font-semibold hover:border-link hover:text-link sm:flex-col sm:items-start">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-blue-wash">
                <Image src={icon} alt="" className="size-6 object-contain" />
              </span>
              {title}
            </a>
          ))}
        </div>
        <div className="surface mt-5 px-6 py-7 sm:px-8">
          <p className="mb-2 text-sm font-semibold text-muted">{t("emailLabel")}</p>
          <a className="text-xl font-semibold text-link underline underline-offset-4 wrap-anywhere" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </div>
      </div>
    </div>
  );
}
