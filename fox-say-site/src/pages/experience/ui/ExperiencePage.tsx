import { Heading } from "@/shared/ui/Heading";
import { Text } from "@/shared/ui/Text";

import { techDirections } from "../model/consts";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Education, Work } from "../model/types";

export default function ExperiencePage() {
  const t = useTranslations("ExperiencePage");

  const education = t.raw("education") as Education[];

  const works = t.raw("works") as Work[];

  return (
    <div className="px-4 mt-auto md:px-0">
      <div className="bg-bg-card rounded-2xl p-6 py-8 max-w-4xl mx-auto mb-10 md:p-10">
        <Heading as="h1" className="mb-6 xl:mb-12">
          {t("title")}
        </Heading>

        <section className="mb-8">
          <Heading as="h2" className="mb-4 xl:mb-6">
            {t("titleTech")}
          </Heading>

          <div className="flex flex-col gap-8">
            {techDirections.map(({ id, title, techs }) => (
              <div key={id}>
                <Heading as="h3" className="mb-3">
                  {title}
                </Heading>
                <div className="flex flex-wrap gap-5">
                  {techs.map((tech) => (
                    <div key={tech.id}>
                      <div className="bg-white/5 w-18 h-18 p-4 rounded-xl mb-1 md:w-26 md:h-26">
                        <Image
                          src={tech.icon}
                          alt={tech.title}
                          className="max-w-full max-h-full"
                        />
                      </div>
                      <Text className="text-[14px] md:text-lg">
                        {tech.title}
                      </Text>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <Heading as="h2" className="mb-4">
            {t("titleEducation")}
          </Heading>
          <div className="space-y-4">
            {education.map(({ place, period, details }) => (
              <div key={place} className="p-4 bg-card rounded-lg">
                <div className="grid grid-cols-1 gap-1 md:grid-cols-[1fr_200px] md:gap-4">
                  <div>
                    <Heading as="h3" className="mb-1 text-lg">
                      {place}
                    </Heading>
                    <Text className="mb-1">{details}</Text>
                  </div>
                  <Text as="div" className="text-sm text-muted">
                    {period}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <Heading as="h2" className="mb-4">
            {t("titleWork")}
          </Heading>

          <div className="space-y-4">
            {works.map(({ company, role, place, period, responsibilities }) => (
              <div key={company} className="p-4 bg-card rounded-lg">
                <div className="flex flex-col justify-between items-start mb-2 md:flex-row md:items-center">
                  <div>
                    <Heading as="h3" className="mb-1 text-lg">
                      {company}
                    </Heading>
                    <Text className="mb-1">{role}</Text>
                  </div>
                  <div className="md:text-right">
                    <Text as="div" className="text-sm">
                      {place}
                    </Text>
                    <Text as="div" className="text-sm text-muted">
                      {period}
                    </Text>
                  </div>
                </div>

                {responsibilities && (
                  <ul className="list-disc pl-5">
                    {responsibilities.map((responsibility, idx) => (
                      <li key={idx}>
                        <Text as="div" className="text-sm">
                          {responsibility}
                        </Text>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
