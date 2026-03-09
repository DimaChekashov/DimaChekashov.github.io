import CreatePostForm from "@/features/create-post";
import { Heading } from "@/shared/ui/Heading";

export default function CreatePostPage() {
  return (
    <div className="px-4 md:px-0">
      <div className="bg-bg-card rounded-2xl p-6 py-8 max-w-5xl mx-auto mb-10 md:p-10">
        <Heading as="h1" className="mb-6">
          Create Post
        </Heading>
      <CreatePostForm />
      </div>
    </div>
  );
}
