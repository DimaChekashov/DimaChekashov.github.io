import { getPost } from "@/shared/api/getPost";
import { formatDate } from "@/shared/lib/utils";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: {
    id: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;

  const post = await getPost(id);

  if (!post) {
    return notFound();
  }

  const { title, content, featuredImage, createdAt } = post.data;

  return (
    <div>
      {featuredImage && (
        <img
          src={featuredImage}
          alt={title}
          className="w-full max-h-[400px] object-center object-fill"
        />
      )}
      {formatDate(createdAt)}
      <h1 className="mb-4">{title}</h1>
      <p>{content}</p>
    </div>
  );
}
