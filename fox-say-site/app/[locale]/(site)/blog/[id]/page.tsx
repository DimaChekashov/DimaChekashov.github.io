import { notFound } from "next/navigation";
import { LOCALES, type LocaleKey } from "@/shared/lib/contsts";
import { getAllPostParams, getPostBySlug } from "@/shared/content/posts";
import { Heading } from "@/shared/ui/Heading";
import { Text } from "@/shared/ui/Text";
import { formatDate } from "@/shared/lib/utils";
import Image from "next/image";

interface BlogPostRouteProps {
  params: Promise<{ locale: string; id: string }>;
}

export async function generateStaticParams() {
  return getAllPostParams();
}

export default async function BlogPostRoute({ params }: BlogPostRouteProps) {
  const { locale, id } = await params;

  if (![LOCALES.ru, LOCALES.en, LOCALES.de].includes(locale as LocaleKey)) {
    return notFound();
  }

  const post = await getPostBySlug(locale as LocaleKey, id);
  if (!post) return notFound();

  return (
    <div className="px-4 md:px-0">
      <div className="bg-bg-card rounded-2xl p-6 py-8 max-w-4xl mx-auto mb-10 md:p-10">
        {post.cover ? (
          <div className="mb-6 overflow-hidden rounded-lg">
            <Image
              src={post.cover}
              alt={post.title}
              width={1200}
              height={600}
              className="w-full h-auto max-h-[400px] object-center object-cover"
              unoptimized
            />
          </div>
        ) : null}

        <div className="mb-2 text-sm text-muted">
          <Text as="div">{formatDate(post.date)}</Text>
        </div>
        <Heading as="h1" className="mb-3">
          {post.title}
        </Heading>
        <div className="mb-6 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs">
              #{tag}
            </span>
          ))}
        </div>
        <article
          className="rich-text max-w-none"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </div>
    </div>
  );
}
