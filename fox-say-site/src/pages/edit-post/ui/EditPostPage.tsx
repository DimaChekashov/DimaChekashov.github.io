"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/providers/Auth/provider";
import { useParams, useRouter } from "next/navigation";
import { ROUTES } from "@/shared/lib/contsts";
import CreatePostForm from "@/features/create-post";
import { Heading } from "@/shared/ui/Heading";
import { Text } from "@/shared/ui/Text";

type EditablePost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  featuredImage: string | null;
  content: string;
  status: "PUBLISHED" | "DRAFT";
  commentStatus: boolean;
  publishedAt: string | null;
};

function toDatetimeLocal(value?: string | null) {
  if (!value) return "";
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const timezoneOffsetInMs = date.getTimezoneOffset() * 60000;
  const localDate = new Date(date.getTime() - timezoneOffsetInMs);
  return localDate.toISOString().slice(0, 16);
}

export default function EditPostPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [post, setPost] = useState<EditablePost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      const token = localStorage.getItem("admin_token");

      if (!token) {
        router.push(ROUTES.LOGIN);
        return;
      }

      try {
        const response = await fetch(`/api/posts/${params.id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to load post");
        }

        setPost(data.data as EditablePost);
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

    if (user) {
      loadPost();
    }
  }, [params.id, router, user]);

  if (isLoading) {
    return (
      <div className="px-4 md:px-0">
        <div className="bg-bg-card rounded-2xl p-6 py-8 max-w-5xl mx-auto mb-10 md:p-10">
          <Text>Loading post...</Text>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="px-4 md:px-0">
        <div className="bg-bg-card rounded-2xl p-6 py-8 max-w-5xl mx-auto mb-10 md:p-10">
          <Text className="text-red-500">{error || "Post not found"}</Text>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-0">
      <div className="bg-bg-card rounded-2xl p-6 py-8 max-w-5xl mx-auto mb-10 md:p-10">
        <Heading as="h1" className="mb-6">
          Edit Post
        </Heading>

        <CreatePostForm
          mode="edit"
          postId={String(post.id)}
          initialValues={{
            title: post.title,
            excerpt: post.excerpt ?? "",
            slug: post.slug,
            featuredImage: post.featuredImage ?? "",
            content: post.content,
            status: post.status,
            commentStatus: post.commentStatus,
            publishedAt: toDatetimeLocal(post.publishedAt),
          }}
        />
      </div>
    </div>
  );
}
