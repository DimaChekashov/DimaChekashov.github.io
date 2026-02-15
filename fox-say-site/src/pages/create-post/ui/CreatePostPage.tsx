import CreatePostForm from "@/features/create-post";

export default function CreatePostPage() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Create Post Page</h1>

      <CreatePostForm />
    </div>
  );
}
