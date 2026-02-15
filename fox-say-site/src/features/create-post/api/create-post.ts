import { IPost } from "@/shared/lib/types";

export const createPost = async ({
  title,
  excerpt,
  slug,
  featuredImage,
  content,
  authorId,
}: Pick<
  IPost,
  "title" | "excerpt" | "slug" | "featuredImage" | "content" | "authorId"
>) => {
  try {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        excerpt,
        slug,
        featuredImage,
        content,
        authorId,
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
