import Image from "next/image";
import { useTranslations } from "next-intl";
import { Heading } from "@/shared/ui/Heading";
import { gallery } from "../model/gallery";
import type { Project } from "../model/types";
import { ScreenshotViewer } from "./ScreenshotViewer";

export default function ProjectsPage() {
  const t = useTranslations("ProjectsPage");
  const projects = t.raw("projects") as Project[];

  function preview(src: string, title: string, featured = false) {
    return (
      <a
        href={src}
        data-screenshot-title={title}
        aria-haspopup="dialog"
        aria-label={t("viewScreenshot", { title })}
        className={`project-preview group relative block overflow-hidden bg-blue-wash ${featured ? "aspect-[16/10]" : "aspect-[8/5]"}`}
      >
        <Image
          src={src}
          alt={t("screenshotAlt", { title })}
          fill
          sizes={featured ? "(min-width: 1024px) 720px, 100vw" : "(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"}
          className="object-cover object-top"
        />
        <span aria-hidden="true" className="project-expand group-hover:bg-link group-hover:text-white" />
      </a>
    );
  }

  return (
    <div className="page-shell">
      <Heading as="h1" className="page-title">{t("title")}</Heading>
      <ScreenshotViewer closeLabel={t("closeScreenshot")}>
        {projects.map(({ title, date, description, techs, repoUrl, demoUrl, screenshot }) => (
          <article key={title} className="surface overflow-hidden lg:grid lg:grid-cols-[minmax(17rem,0.76fr)_1.5fr] lg:items-center">
            <div className="flex flex-col items-start gap-3 p-6 sm:p-8 lg:p-10">
              <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">{title}</h2>
              {date && <p className="text-sm font-semibold text-link">{date}</p>}
              {description && <p className="max-w-prose text-lg leading-relaxed text-muted">{description}</p>}
              {!!techs?.length && (
                <ul aria-label={t("techHeading")} className="flex flex-wrap gap-2">
                  {techs.map((tech) => <li className="rounded-full bg-blue-wash px-3 py-1 text-sm font-medium text-link" key={tech}>{tech}</li>)}
                </ul>
              )}
              <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2">
                {demoUrl && <a href={demoUrl} className="button-primary">{t("demoButton")}</a>}
                {repoUrl && <a href={repoUrl} className="text-link underline decoration-1 underline-offset-4">{t("codeButton")}</a>}
              </div>
            </div>
            {screenshot && <div className="min-w-0 border-t border-primary lg:border-t-0 lg:border-l">{preview(screenshot, title, true)}</div>}
          </article>
        ))}

        <section aria-labelledby="gallery-heading">
          <h2 id="gallery-heading" className="mb-2 text-2xl font-bold tracking-tight sm:text-3xl">{t("galleryTitle")}</h2>
          <p className="mb-6 max-w-prose leading-relaxed text-muted">{t("galleryContribution")}</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map(([slug, title]) => (
              <article key={slug} className="surface overflow-hidden">
                {preview(`/images/projects/${slug}.jpg`, title)}
                <h3 className="border-t border-primary px-5 py-4 text-lg font-semibold">{title}</h3>
              </article>
            ))}
          </div>
        </section>
      </ScreenshotViewer>
    </div>
  );
}
