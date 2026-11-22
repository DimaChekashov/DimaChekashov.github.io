import { Button } from "@/shared/ui/Button/Button";
import { useTranslations } from "next-intl";
import portrait from "@/shared/assets/images/dmitry.png";
import Image from "next/image";
import { ROUTES } from "@/shared/lib/contsts";

export default function HomePage() {
  const t = useTranslations("HomePage");

  return (
    <section className="mx-4 mb-10 grid items-center gap-8 rounded-2xl bg-bg-card px-6 py-10 text-center md:mx-6 md:grid-cols-[1fr_2fr] md:px-10 md:py-16 md:text-left lg:gap-14">
      <Image
        src={portrait}
        alt={t("portrait")}
        className="mx-auto aspect-square w-44 rounded-full bg-secondary object-cover object-center md:w-full md:max-w-xs"
        loading="eager"
      />
      <div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{t("title")}</h1>
        <p className="mb-3 text-xl font-semibold text-link lg:text-2xl">
          Frontend + Backend {t("subtitle")}
        </p>
        <p className="mb-6 text-lg text-muted">{t("description")}</p>
        <div className="flex flex-wrap justify-center gap-3 md:justify-start">
          <Button href={ROUTES.PROJECTS}>{t("projectsButton")}</Button>
          <Button href={ROUTES.BLOG}>{t("blogButton")}</Button>
          <Button href={ROUTES.CONTACT}>{t("contactButton")}</Button>
        </div>
      </div>
    </section>
  );
}
