import { Button } from "@/shared/ui/Button/Button";
import { useTranslations } from "next-intl";

import me from "@/shared/assets/images/dmitry.png";
import Image from "next/image";
import { ROUTES } from "@/shared/lib/contsts";

export default function HomePage() {
  const t = useTranslations("HomePage");

  return (
    <div className="px-4 pb-12 grid gap-4 mt-auto xl:grid-cols-[400px_500px] xl:items-center xl:justify-center xl:gap-15">
      <div>
        <div className="overflow-hidden w-50 h-50 bg-gray-500 rounded-full mx-auto md:w-100 md:h-100">
          <Image
            src={me}
            alt="My photo"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
      <div className="text-center xl:text-left">
        <h2 className="text-2xl mb-1 md:text-4xl">{t("title")}</h2>
        <h3 className="mb-3 md:text-2xl md:mb-6">
          <span className="text-primary-blue">Frontend</span> +{" "}
          <span className="text-secondary-purple">Backend</span> {t("subtitle")}
        </h3>
        <p className="mb-4 md:text-lg md:mb-6">{t("description")}</p>
        <div className="flex gap-4 justify-center xl:justify-start">
          <Button href={ROUTES.CONTACT}>{t("contactButton")}</Button>
          <Button href={ROUTES.PROJECTS}>{t("projectsButton")}</Button>
        </div>
      </div>
    </div>
  );
}
