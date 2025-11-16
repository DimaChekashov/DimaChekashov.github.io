import { getPost } from "@/shared/api/getPost";
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

  const { title } = post.data;

  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}
