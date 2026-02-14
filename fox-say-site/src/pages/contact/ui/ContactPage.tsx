import { Heading } from "@/shared/ui/Heading";
import { Text } from "@/shared/ui/Text";
import Image from "next/image";

import habr from "@/shared/assets/images/social/habr.svg";
import linkedin from "@/shared/assets/images/social/linkedin.svg";
import telegram from "@/shared/assets/images/social/telegram.svg";
import { EMAIL, SOCIAL_LINKS } from "@/shared/lib/contsts";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("ContactPage");

  return (
    <div className="px-4 mt-auto md:px-0">
      <div className="bg-bg-card rounded-2xl p-6 py-8 max-w-3xl mx-auto mb-10 md:p-10">
        <Heading as="h1" className="mb-6">
          {t("title")}
        </Heading>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <a
            href={SOCIAL_LINKS.habr}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center gap-3 p-4 bg-card rounded-lg text-center hover:scale-110 transition-transform"
          >
            <div className="w-16 h-16">
              <Image src={habr} alt="Habr Career" />
            </div>
            <Text className="font-semibold">Habr Career</Text>
          </a>

          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center gap-3 p-4 bg-card rounded-lg text-center hover:scale-110 transition-transform"
          >
            <div className="w-16 h-16">
              <Image src={linkedin} alt="LinkedIn" />
            </div>
            <Text className="font-semibold">LinkedIn</Text>
          </a>

          <a
            href={SOCIAL_LINKS.telegram}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center gap-3 p-4 bg-card rounded-lg text-center hover:scale-110 transition-transform"
          >
            <div className="w-16 h-16">
              <Image src={telegram} alt="Telegram" />
            </div>
            <Text className="font-semibold">Telegram</Text>
          </a>
        </div>

        <div className="p-4 bg-card rounded-lg text-center">
          <Text className="mb-1">{t("emailLabel")}:</Text>
          <a
            className="text-blue-500 underline underline-offset-[0.2em] hover:no-underline"
            href={`mailto:${EMAIL}`}
          >
            {EMAIL}
          </a>
        </div>
      </div>
    </div>
  );
}
