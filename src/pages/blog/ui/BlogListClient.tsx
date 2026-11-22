"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import type { PostCard } from "@/shared/content/posts";
import { PostItem } from "./PostItem";

export function BlogListClient({ posts }: { posts: PostCard[] }) {
  const t = useTranslations("Blog");
  const [tag, setTag] = useState("");
  const [category, setCategory] = useState("");
  const filtered = posts.filter((post) =>
    (!tag || post.tags.includes(tag)) && (!category || post.categories.includes(category)),
  );

  if (!posts.length) return <p className="text-muted">{t("noPosts")}</p>;

  return (
    <div className="space-y-6">
      <div className="surface grid gap-4 p-4 sm:grid-cols-2 sm:p-5">
        {([
          { field: "tags", label: "tag", all: "allTags", value: tag, update: setTag },
          { field: "categories", label: "category", all: "allCategories", value: category, update: setCategory },
        ] as const).map(({ field, label, all, value, update }) => (
          <label key={field} className="flex min-w-0 flex-col gap-2">
            <span className="text-sm text-muted">{t(label)}</span>
            <span className="select-control">
              <select
                className="min-h-11 w-full appearance-none rounded-xl border border-control bg-bg-card ps-3 pe-9"
                value={value}
                onChange={(event) => update(event.target.value)}
              >
                <option value="">{t(all)}</option>
                {[...new Set(posts.flatMap((post) => post[field]))].map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </span>
          </label>
        ))}
      </div>
      <div aria-live="polite">
        {filtered.length ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((post) => <PostItem key={post.slug} post={post} />)}
          </div>
        ) : <p className="text-muted">{t("noMatches")}</p>}
      </div>
    </div>
  );
}
