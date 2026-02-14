import { Heading } from "@/shared/ui/Heading";
import { Text } from "@/shared/ui/Text";
import type { Project } from "../model/types";
import { useTranslations } from "next-intl";

export default function ProjectsPage() {
  const t = useTranslations("ProjectsPage");

  const projects = t.raw("projects") as Project[];

  return (
    <div className="px-4 mt-auto md:px-0">
      <div className="bg-bg-card rounded-2xl p-6 py-8 max-w-4xl mx-auto mb-10 md:p-10">
        <Heading as="h1" className="mb-6">
          {t("title")}
        </Heading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map(
            ({ title, date, description, techs, repoUrl, demoUrl }) => (
              <article key={title} className="p-4 bg-card rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <Heading as="h3" className="mb-1 text-lg">
                    {title}
                  </Heading>
                  {date && (
                    <Text as="div" className="text-sm text-muted">
                      {date}
                    </Text>
                  )}
                </div>

                {description && <Text className="mb-2">{description}</Text>}

                {techs && techs.length > 0 && (
                  <Text as="div" className="mb-3 text-sm text-muted">
                    {t("techHeading")}: {techs.join(", ")}
                  </Text>
                )}

                <div className="flex gap-3">
                  {repoUrl && (
                    <a
                      href={repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 underline underline-offset-[0.2em] hover:no-underline"
                    >
                      {t("codeButton")}
                    </a>
                  )}

                  {demoUrl && (
                    <a
                      href={demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 underline underline-offset-[0.2em] hover:no-underline"
                    >
                      {t("demoButton")}
                    </a>
                  )}
                </div>
              </article>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
