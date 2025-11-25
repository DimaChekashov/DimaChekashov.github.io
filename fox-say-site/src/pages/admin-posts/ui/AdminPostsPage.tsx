import { getPosts } from "@/shared/api/getPosts";
import { IPost } from "@/shared/lib/types";

export default async function AdminPostsPage() {
  const posts = await getPosts();

  return (
    <div>
      <h1>Posts Page</h1>
      {posts.data.map((post: IPost) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
