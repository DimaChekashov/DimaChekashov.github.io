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
    <div className="page-shell">
      <div className="mx-auto max-w-5xl">
        <Heading as="h1" className="page-title">
          {t("title")}
        </Heading>

        <section id="technologies" className="surface mb-6 scroll-mt-4 p-6 sm:p-8">
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
                      <div className="bg-secondary w-18 h-18 p-4 rounded-xl mb-1 md:w-26 md:h-26">
                        <Image
                          src={tech.icon}
                          alt={tech.title}
                          className="max-w-full max-h-full"
                        />
                      </div>
                      <Text className="text-sm">
                        {tech.title}
                      </Text>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="surface mb-6 p-6 sm:p-8">
          <Heading as="h2" className="mb-4">
            {t("titleEducation")}
          </Heading>
          <div className="space-y-4">
            {education.map(({ place, period, details }) => (
              <div key={place} className="rounded-xl border border-primary bg-blue-wash p-4 sm:p-5">
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

        <section className="surface p-6 sm:p-8">
          <Heading as="h2" className="mb-4">
            {t("titleWork")}
          </Heading>

          <div className="space-y-4">
            {works.map(({ company, role, place, period, responsibilities }) => (
              <div key={company} className="rounded-xl border border-primary bg-blue-wash p-4 sm:p-5">
                <div className="mb-2 grid gap-1 md:grid-cols-[minmax(0,1fr)_200px] md:items-start md:gap-4">
                  <div>
                    <Heading as="h3" className="mb-1 text-lg">
                      {company}
                    </Heading>
                    <Text className="mb-1">{role}</Text>
                  </div>
                  <div>
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
