import { IPost } from "@/shared/lib/types";

export const createPost = async ({
  title,
  excerpt,
  slug,
  featuredImage,
  content,
  status,
  commentStatus,
  publishedAt,
}: Pick<
  IPost,
  "title" | "excerpt" | "slug" | "featuredImage" | "content" | "status"
> & { commentStatus: boolean; publishedAt?: string | null }) => {
  try {
    const token = localStorage.getItem("admin_token");

    if (!token) {
      throw new Error("Admin token not found");
    }

    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        excerpt,
        slug,
        featuredImage,
        content,
        status,
        commentStatus,
        publishedAt,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || data.message || `HTTP error! status: ${response.status}`,
      );
    }

    return data;
  } catch (error) {
    console.error("Error creating post:", error);

    throw error;
  }
};

export const updatePost = async ({
  id,
  title,
  excerpt,
  slug,
  featuredImage,
  content,
  status,
  commentStatus,
  publishedAt,
}: Pick<IPost, "id" | "title" | "excerpt" | "slug" | "featuredImage" | "content" | "status"> & {
  commentStatus: boolean;
  publishedAt?: string | null;
}) => {
  try {
    const token = localStorage.getItem("admin_token");

    if (!token) {
      throw new Error("Admin token not found");
    }

    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        excerpt,
        slug,
        featuredImage,
        content,
        status,
        commentStatus,
        publishedAt,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || data.message || `HTTP error! status: ${response.status}`,
      );
    }

    return data;
  } catch (error) {
    console.error("Error updating post:", error);

    throw error;
  }
};
