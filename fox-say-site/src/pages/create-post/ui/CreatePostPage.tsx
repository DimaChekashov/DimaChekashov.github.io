"use client";
import { useState } from "react";

import { ArticleEditor } from "@/widgets/article-editor/ui/ArticleEditor";

export default function CreatePostPage() {
  const [content, setContent] = useState("");

  const handleCreatePost = () => {
    console.log("Создаем пост с контентом:", content);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Post Page</h1>

      <ArticleEditor onChange={setContent} />

      <button
        onClick={handleCreatePost}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Создать пост
      </button>
    </div>
  );
}
