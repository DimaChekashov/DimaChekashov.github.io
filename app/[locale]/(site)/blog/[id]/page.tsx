import { notFound } from "next/navigation";
import Image from "next/image";
import { isLocale } from "@/app/i18n/routing";
import { getPostSlugs, getPostBySlug } from "@/shared/content/posts";
import { formatDate } from "@/shared/lib/utils";
import { Heading } from "@/shared/ui/Heading";

interface BlogPostRouteProps {
  params: Promise<{ locale: string; id: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams({ params: { locale } }: { params: { locale: string } }) {
  if (!isLocale(locale)) return [];
  return (await getPostSlugs(locale)).map((id) => ({ id }));
}

async function loadPost({ params }: BlogPostRouteProps) {
  const { locale, id } = await params;
  if (!isLocale(locale)) notFound();
  const post = await getPostBySlug(locale, id);
  if (!post) notFound();
  return { post, locale };
}

export async function generateMetadata(props: BlogPostRouteProps) {
  const { post } = await loadPost(props);
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostRoute(props: BlogPostRouteProps) {
  const { post, locale } = await loadPost(props);

  return (
    <div className="page-shell">
      <article className="surface mx-auto max-w-4xl px-6 py-9 sm:px-10 sm:py-12">
        <div className="mx-auto max-w-[70ch]">
          <time dateTime={post.date} className="mb-2 block text-sm text-muted">
            {formatDate(post.date, locale)}
          </time>
          <Heading as="h1" className="mb-5 wrap-anywhere leading-tight tracking-tight">{post.title}</Heading>
          {post.tags.length > 0 && (
            <ul className="mb-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li key={tag} className="rounded-full bg-secondary px-3 py-1 text-sm">#{tag}</li>
              ))}
            </ul>
          )}
          {post.cover && (
            <Image
              src={post.cover}
              alt=""
              width={1200}
              height={600}
              className="mb-6 h-auto max-h-[400px] w-full rounded-lg object-cover"
            />
          )}
          <div className="rich-text" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        </div>
      </article>
    </div>
  );
}
