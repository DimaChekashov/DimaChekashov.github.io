import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { isLocale } from "@/app/i18n/routing";
import { getPostsByLocale } from "@/shared/content/posts";
import { BlogListClient } from "@/pages/blog/ui/BlogListClient";
import { Heading } from "@/shared/ui/Heading";

type BlogRouteProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: BlogRouteProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getTranslations({ locale, namespace: "Blog" });
  return { title: t("title") };
}

export default async function BlogRoute({ params }: BlogRouteProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getTranslations({ locale, namespace: "Blog" });
  const posts = await getPostsByLocale(locale);

  return (
    <div className="px-4 md:px-6">
      <div className="mx-auto mb-10 max-w-6xl space-y-6 rounded-2xl bg-bg-card p-6 md:p-10">
        <Heading as="h1">{t("title")}</Heading>
        <BlogListClient posts={posts} />
      </div>
    </div>
  );
}
