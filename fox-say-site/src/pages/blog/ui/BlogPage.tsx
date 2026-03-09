import { getPosts } from "@/shared/api/getPosts";
import { IPost } from "@/shared/lib/types";
import { Text } from "@/shared/ui/Text";
import { PostItem } from "./PostItem";

export default async function Blog() {
  const posts = await getPosts();

  if (!posts?.data) {
    return <Text>Не удалось загрузить посты.</Text>;
  }

  if (!posts.data.length) {
    return <Text>Пока нет опубликованных постов.</Text>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {posts.data.map((post: IPost) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}
