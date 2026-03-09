"use client";

import { useMemo, useState } from "react";
import type { BlogPost } from "@/shared/content/posts";
import { PostItem } from "./PostItem";

interface BlogListClientProps {
  posts: BlogPost[];
}

export function BlogListClient({ posts }: BlogListClientProps) {
  const [selectedTag, setSelectedTag] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const tags = useMemo(
    () => ["all", ...new Set(posts.flatMap((post) => post.tags))],
    [posts],
  );
  const categories = useMemo(
    () => ["all", ...new Set(posts.flatMap((post) => post.categories))],
    [posts],
  );

  const filteredPosts = useMemo(
    () =>
      posts.filter((post) => {
        const byTag = selectedTag === "all" || post.tags.includes(selectedTag);
        const byCategory =
          selectedCategory === "all" || post.categories.includes(selectedCategory);

        return byTag && byCategory;
      }),
    [posts, selectedCategory, selectedTag],
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-sm text-muted">Tag</span>
          <select
            className="rounded border border-gray-600 bg-transparent p-2"
            value={selectedTag}
            onChange={(event) => setSelectedTag(event.target.value)}
          >
            {tags.map((tag) => (
              <option key={tag} value={tag} className="text-black">
                {tag}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm text-muted">Category</span>
          <select
            className="rounded border border-gray-600 bg-transparent p-2"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category} className="text-black">
                {category}
              </option>
            ))}
          </select>
        </label>
      </div>

      {filteredPosts.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <PostItem key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-muted">No posts match your filters.</p>
      )}
    </div>
  );
}
