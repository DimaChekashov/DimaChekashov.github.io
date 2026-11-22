import { Link } from "@/app/i18n/navigation";
import { useLocale } from "next-intl";
import { isLocale, routing } from "@/app/i18n/routing";
import { ROUTES } from "@/shared/lib/contsts";
import { formatDate } from "@/shared/lib/utils";
import type { PostCard } from "@/shared/content/posts";
import Image from "next/image";

export const PostItem = ({ post }: { post: PostCard }) => {
  const current = useLocale();
  const locale = isLocale(current) ? current : routing.defaultLocale;

  return (
    <article className="flex min-w-0 flex-col items-start gap-2 rounded-lg bg-secondary px-5 py-4">
      {post.cover && (
        <Image src={post.cover} alt="" width={600} height={300} className="h-auto w-full rounded-md" />
      )}
      <time dateTime={post.date} className="text-sm text-muted">{formatDate(post.date, locale)}</time>
      <h2 className="break-words text-xl font-semibold">
        <Link href={`${ROUTES.BLOG}/${post.slug}`} className="text-link underline decoration-transparent hover:decoration-current">
          {post.title}
        </Link>
      </h2>
      <p className="break-words">{post.excerpt}</p>
    </article>
  );
};
