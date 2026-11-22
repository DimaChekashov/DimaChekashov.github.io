import Image from "next/image";
import { useTranslations } from "next-intl";
import { Heading } from "@/shared/ui/Heading";
import { gallery } from "../model/gallery";
import type { Project } from "../model/types";

export default function ProjectsPage() {
  const t = useTranslations("ProjectsPage");
  const projects = t.raw("projects") as Project[];

  return (
    <div className="px-4 md:px-6">
      <div className="mx-auto mb-10 max-w-6xl space-y-8 rounded-2xl bg-bg-card p-6 md:p-10">
        <Heading as="h1">{t("title")}</Heading>

        {projects.map(({ title, date, description, techs, repoUrl, demoUrl, screenshot }) => (
          <article key={title} className="space-y-3 rounded-xl bg-secondary p-5 md:p-6">
            <h2 className="text-xl font-semibold">{title}</h2>
            {screenshot && (
              <a href={screenshot} className="block" aria-label={t("viewScreenshot", { title })}>
                <Image src={screenshot} width={1100} height={730} alt={t("screenshotAlt", { title })}
                  className="h-auto max-h-80 w-full rounded-lg object-cover object-top" />
              </a>
            )}
            {date && <p className="text-sm text-muted">{date}</p>}
            {description && <p>{description}</p>}
            {!!techs?.length && (
              <p className="text-sm text-muted">{t("techHeading")}: {techs.join(", ")}</p>
            )}
            <div className="flex flex-wrap gap-4">
              {repoUrl && <a href={repoUrl} className="text-link underline">{t("codeButton")}</a>}
              {demoUrl && <a href={demoUrl} className="text-link underline">{t("demoButton")}</a>}
            </div>
          </article>
        ))}

        <section aria-labelledby="gallery-heading">
          <h2 id="gallery-heading" className="mb-2 text-xl font-semibold">{t("galleryTitle")}</h2>
          <p className="mb-5 text-muted">{t("galleryContribution")}</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map(([slug, title]) => (
              <article key={slug} className="overflow-hidden rounded-xl bg-secondary">
                <a href={`/images/projects/${slug}.jpg`} aria-label={t("viewScreenshot", { title })}
                  className="block focus-visible:outline-offset-[-3px]">
                  <Image
                    src={`/images/projects/${slug}.jpg`}
                    alt={t("screenshotAlt", { title })}
                    width={640}
                    height={400}
                    className="aspect-[8/5] w-full object-cover object-top"
                  />
                </a>
                <h3 className="px-4 py-3 font-semibold">{title}</h3>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
