import { getPosts } from "@/shared/api/getPosts";
import { IPost } from "@/shared/lib/types";
import { Heading } from "@/shared/ui/Heading";
import { Text } from "@/shared/ui/Text";
import Link from "next/link";
import { formatDate } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/Button/Button";

export default async function AdminPostsPage() {
  const posts = await getPosts();

  return (
    <div className="px-4 md:px-0">
      <div className="bg-bg-card rounded-2xl p-6 py-8 max-w-6xl mx-auto md:p-10">
        <Heading as="h1" className="mb-6">
          Posts
        </Heading>

        <div className="space-y-4">
          {posts?.data?.length ? (
            posts.data.map((post: IPost) => (
              <div
                key={post.id}
                className="p-4 bg-card rounded-lg flex flex-col md:flex-row md:items-center md:justify-between gap-3"
              >
                <div>
                  <Link
                    href={`/admin/posts/${post.slug || post.id}`}
                    className="hover:underline"
                  >
                    <Heading as="h3" className="mb-1 text-lg">
                      {post.title}
                    </Heading>
                  </Link>
                  <Text className="text-sm text-muted">
                    {formatDate(post.createdAt)} • {post.status}
                  </Text>
                </div>

                <div className="flex gap-3 mt-3 md:mt-0">
                  <Button
                    htmlType="button"
                    href={`/admin/posts/${post.slug || post.id}`}
                  >
                    View
                  </Button>
                  <Button
                    htmlType="button"
                    type="success"
                    href={`/admin/posts/${post.id}/edit`}
                  >
                    Edit
                  </Button>
                  <Button htmlType="button" type="danger">
                    Delete
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <Text>Посты не найдены.</Text>
          )}
        </div>
      </div>
    </div>
  );
}
