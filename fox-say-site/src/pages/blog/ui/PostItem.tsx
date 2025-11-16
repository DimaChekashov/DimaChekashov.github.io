import Link from "next/link";
import { IPost } from "@/shared/lib/types";
import { ROUTES } from "@/shared/lib/contsts";
import { formatDate } from "@/shared/lib/utils";

interface PostItemProps {
  post: IPost;
}

export const PostItem = ({ post }: PostItemProps) => {
  const { id, title, excerpt, createdAt } = post;

  return (
    <div className="flex flex-col items-start gap-2 bg-secondary rounded px-6 py-4">
      <div className="text-sm">{formatDate(createdAt)}</div>
      <Link
        href={`${ROUTES.BLOG}/${id}`}
        className="text-2xl text-heading hover:text-primary-blue transition-colors"
      >
        {title}
      </Link>
      <p className="text-md text-body">{excerpt}</p>
    </div>
  );
};
