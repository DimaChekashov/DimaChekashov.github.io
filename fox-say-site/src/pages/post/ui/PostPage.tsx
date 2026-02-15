import { getPost } from "@/shared/api/getPost";
import { formatDate } from "@/shared/lib/utils";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Heading } from "@/shared/ui/Heading";
import { Text } from "@/shared/ui/Text";

interface PostPageProps {
  params: {
    id: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = params;

  const post = await getPost(id);

  if (!post) return notFound();

  const { title, content, featuredImage, createdAt } = post.data;

  return (
    <div className="px-4 md:px-0">
      <div className="bg-bg-card rounded-2xl p-6 py-8 max-w-4xl mx-auto mb-10 md:p-10">
        {featuredImage && (
          <div className="mb-6 overflow-hidden rounded-lg">
            <Image
              src={featuredImage}
              alt={title}
              width={1200}
              height={600}
              className="w-full h-auto max-h-[400px] object-center object-cover"
              unoptimized={true}
            />
          </div>
        )}

        <div className="mb-4 text-sm text-muted">
          <Text as="div">{formatDate(createdAt)}</Text>
        </div>

        <Heading as="h1" className="mb-4">
          {title}
        </Heading>

        <article className="prose max-w-none">
          {typeof content === "string" && /<[a-z][\s\S]*>/i.test(content) ? (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            <Text>{content}</Text>
          )}
        </article>
      </div>
    </div>
  );
}
