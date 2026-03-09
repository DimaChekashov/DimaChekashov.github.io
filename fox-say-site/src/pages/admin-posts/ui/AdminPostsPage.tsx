"use client";

import { useEffect, useState } from "react";
import { IPost } from "@/shared/lib/types";
import { Heading } from "@/shared/ui/Heading";
import { Text } from "@/shared/ui/Text";
import Link from "next/link";
import { formatDate } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/Button/Button";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/shared/lib/contsts";

export default function AdminPostsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem("admin_token");

      if (!token) {
        router.push(ROUTES.LOGIN);
        return;
      }

      try {
        const response = await fetch("/api/posts", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch posts");
        }

        setPosts(Array.isArray(data?.data) ? data.data : []);
      } catch (requestError) {
        setError(
          requestError instanceof Error
            ? requestError.message
            : String(requestError),
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [router]);

  return (
    <div className="px-4 md:px-0">
      <div className="bg-bg-card rounded-2xl p-6 py-8 max-w-6xl mx-auto md:p-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Heading as="h1">Posts</Heading>
          <Button htmlType="button" href="/admin/posts/create">
            Create Post
          </Button>
        </div>

        {isLoading && <Text>Loading...</Text>}
        {error && <Text className="text-red-500">{error}</Text>}

        <div className="space-y-4">
          {!isLoading && !error && posts.length ? (
            posts.map((post: IPost) => (
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
                    {formatDate(post.createdAt)} • {post.status} •{" "}
                    {post.commentStatus ? "Comments ON" : "Comments OFF"}
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
          ) : !isLoading && !error ? (
            <Text>Посты не найдены.</Text>
          ) : null}
        </div>

        <div className="mt-6">
          {!isLoading && !error && posts.length ? (
            <Text className="text-sm text-muted">
              Total: {posts.length} post(s)
            </Text>
          ) : null}
        </div>
      </div>
    </div>
  );
}
