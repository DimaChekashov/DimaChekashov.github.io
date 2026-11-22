import { Heading } from "@/shared/ui/Heading";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("AboutPage");

  return (
    <div className="page-shell">
      <div className="mx-auto max-w-4xl">
        <Heading as="h1" className="page-title">{t("title")}</Heading>
        <div className="surface px-6 py-8 sm:px-10 sm:py-12">
          <div className="mx-auto max-w-[68ch] space-y-8 leading-relaxed">
            <p className="text-lg text-muted sm:text-xl">{t("description")}</p>
            <section className="space-y-4 border-t border-primary pt-7">
              <h2 className="text-2xl font-bold tracking-tight">{t("careerTitle")}</h2>
              <p>{t("careerDescriptionOne")}</p>
              <p>{t("careerDescriptionTwo")}</p>
              <p>{t("careerDescriptionThree")}</p>
            </section>
            <section className="space-y-4 border-t border-primary pt-7">
              <h2 className="text-2xl font-bold tracking-tight">{t("hobbiesTitle")}</h2>
              <p>{t("hobbiesDescriptionOne")}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
