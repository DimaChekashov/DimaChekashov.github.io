import { Link } from "@/app/i18n/navigation";
import { ROUTES } from "@/shared/lib/contsts";
import { formatDate } from "@/shared/lib/utils";
import type { BlogPost } from "@/shared/content/posts";
import type { IPost } from "@/shared/lib/types";

interface PostItemProps {
  post:
    | Pick<BlogPost, "slug" | "title" | "excerpt" | "date">
    | Pick<IPost, "id" | "slug" | "title" | "excerpt" | "createdAt">;
}

export const PostItem = ({ post }: PostItemProps) => {
  const { slug, title, excerpt } = post;
  const fallbackSlug =
    slug ||
    ("id" in post && typeof post.id !== "undefined" ? String(post.id) : "");
  const dateValue = "date" in post ? post.date : post.createdAt;

  return (
    <div className="flex flex-col items-start gap-2 bg-secondary rounded px-6 py-4">
      <div className="text-sm">{formatDate(dateValue)}</div>
      <Link
        href={`${ROUTES.BLOG}/${fallbackSlug}`}
        className="text-2xl text-heading hover:text-primary-blue transition-colors"
      >
        {title}
      </Link>
      <p className="text-md text-body">{excerpt}</p>
    </div>
  );
};
