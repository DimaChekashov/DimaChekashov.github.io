import { Link } from "@/app/i18n/navigation";
import { Button } from "@/shared/ui/Button/Button";
import { useTranslations } from "next-intl";
import portrait from "@/shared/assets/images/dmitry.png";
import Image from "next/image";
import { ROUTES } from "@/shared/lib/contsts";

export default function HomePage() {
  const t = useTranslations("HomePage");

  return (
    <div className="page-shell">
      <section className="surface grid overflow-hidden md:min-h-[32rem] md:grid-cols-[1.14fr_1fr]">
        <div className="flex flex-col justify-center p-6 sm:p-10 lg:px-14 lg:py-16">
          <p className="mb-3 text-base font-semibold text-link sm:text-lg">{t("subtitle")}</p>
          <h1 className="max-w-[12ch] text-[clamp(2.15rem,5.7vw,5.25rem)] leading-[1.02] font-bold tracking-[-0.055em]">
            {t("title")}
          </h1>
          <p className="mt-5 max-w-[37ch] text-lg leading-relaxed text-muted sm:mt-6 sm:text-xl">{t("description")}</p>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
            <Button href={ROUTES.PROJECTS}>{t("projectsButton")}</Button>
            <Link className="inline-flex min-h-11 items-center font-semibold text-link underline underline-offset-4" href={ROUTES.BLOG}>{t("blogButton")}</Link>
            <Link className="inline-flex min-h-11 items-center font-semibold text-link underline underline-offset-4" href={ROUTES.CONTACT}>{t("contactButton")}</Link>
          </div>
        </div>
        <div className="portrait-panel grid min-h-64 place-items-center p-8 sm:p-12">
          <div className="relative w-full max-w-[19rem] rounded-full border border-white/50 p-2 lg:max-w-[22rem]">
            <Image
              src={portrait}
              alt={t("portrait")}
              sizes="(min-width: 1024px) 336px, (min-width: 768px) 288px, 240px"
              className="aspect-square w-full rounded-full bg-secondary object-cover"
              loading="eager"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
