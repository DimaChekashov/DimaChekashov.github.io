import { getPosts } from "@/shared/api/getPosts";
import { ROUTES } from "@/shared/lib/contsts";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Blog() {
  const posts = await getPosts();

  if (!posts) {
    return notFound();
  }

  return (
    <div>
      {posts.data.map((post) => (
        <Link key={post.id} href={`${ROUTES.BLOG}/${post.id}`}>
          {post.title}
        </Link>
      ))}
    </div>
  );
}
