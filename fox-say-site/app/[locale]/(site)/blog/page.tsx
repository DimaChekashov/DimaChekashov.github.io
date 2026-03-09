import { notFound } from "next/navigation";
import { LOCALES, type LocaleKey } from "@/shared/lib/contsts";
import { getPostsByLocale } from "@/shared/content/posts";
import { BlogListClient } from "@/pages/blog/ui/BlogListClient";
import { Heading } from "@/shared/ui/Heading";

interface BlogRouteProps {
  params: Promise<{ locale: string }>;
}

export default async function BlogRoute({ params }: BlogRouteProps) {
  const { locale } = await params;

  if (![LOCALES.ru, LOCALES.en, LOCALES.de].includes(locale as LocaleKey)) {
    return notFound();
  }

  const posts = await getPostsByLocale(locale as LocaleKey);

  return (
    <div className="px-4 md:px-0">
      <div className="bg-bg-card rounded-2xl p-6 py-8 max-w-6xl mx-auto mb-10 md:p-10 space-y-6">
        <Heading as="h1">Blog</Heading>
        <BlogListClient posts={posts} />
      </div>
    </div>
  );
}
