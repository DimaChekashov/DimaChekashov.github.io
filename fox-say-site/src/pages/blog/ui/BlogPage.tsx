import { getPosts } from "@/shared/api/getPosts";
import { IPost } from "@/shared/lib/types";
import { notFound } from "next/navigation";
import { PostItem } from "./PostItem";

export default async function Blog() {
  const posts = await getPosts();

  if (!posts) {
    return notFound();
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      {posts.data.map((post: IPost) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}
