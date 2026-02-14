import { Heading } from "@/shared/ui/Heading";
import { Text } from "@/shared/ui/Text";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("AboutPage");

  return (
    <div className="px-4 mt-auto md:px-0">
      <div className="bg-bg-card rounded-2xl p-4 py-6 max-w-200 mx-auto mb-10 md:p-10">
        <Heading as="h1" className="mb-4">
          {t("title")}
        </Heading>
        <Text className="mb-10">{t("description")}</Text>

        <Heading as="h2" className="mb-4">
          {t("careerTitle")}
        </Heading>
        <Text className="mb-4">{t("careerDescriptionOne")}</Text>
        <Text className="mb-4">{t("careerDescriptionTwo")}</Text>
        <Text className="mb-10">{t("careerDescriptionThree")}</Text>

        <Heading as="h2" className="mb-4">
          {t("hobbiesTitle")}
        </Heading>
        <Text>{t("hobbiesDescriptionOne")}</Text>
      </div>
    </div>
  );
}
