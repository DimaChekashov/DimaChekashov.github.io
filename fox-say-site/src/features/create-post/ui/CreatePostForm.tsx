"use client";
import { useEffect, useMemo, useState } from "react";

import { ArticleEditor } from "@/widgets/article-editor/ui/ArticleEditor";
import { Button } from "@/shared/ui/Button/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { CREATE_POST_FIELDS } from "../model/consts";
import { createPost, updatePost } from "../api/create-post";
import { useAuth } from "@/app/providers/Auth/provider";
import { ROUTES } from "@/shared/lib/contsts";
import { useRouter } from "next/navigation";

type Fields = {
  title: string;
  excerpt: string;
  slug: string;
  featuredImage: string;
  status: "PUBLISHED" | "DRAFT";
  commentStatus: boolean;
  publishedAt: string;
};

interface CreatePostFormProps {
  mode?: "create" | "edit";
  postId?: string;
  initialValues?: Partial<Fields> & { content?: string };
}

export const CreatePostForm = ({
  mode = "create",
  postId,
  initialValues,
}: CreatePostFormProps) => {
  const { user } = useAuth();
  const router = useRouter();
  const initialEditorValue = initialValues?.content ?? "<p>Начните писать статью...</p>";
  const [initialEditorContent, setInitialEditorContent] =
    useState(initialEditorValue);
  const [content, setContent] = useState(initialEditorValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const defaultValues = useMemo<Fields>(
    () => ({
      title: initialValues?.title ?? "",
      excerpt: initialValues?.excerpt ?? "",
      slug: initialValues?.slug ?? "",
      featuredImage: initialValues?.featuredImage ?? "",
      status: initialValues?.status ?? "DRAFT",
      commentStatus: initialValues?.commentStatus ?? true,
      publishedAt: initialValues?.publishedAt ?? "",
    }),
    [initialValues],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Fields>({ defaultValues });

  useEffect(() => {
    reset(defaultValues);
    const nextContent = initialValues?.content ?? "<p>Начните писать статью...</p>";
    setInitialEditorContent(nextContent);
    setContent(nextContent);
  }, [defaultValues, initialValues?.content, reset]);

  const onSubmit: SubmitHandler<Fields> = async (data) => {
    setLoading(true);
    setError(null);

    if (!user) {
      setLoading(false);
      router.push(ROUTES.LOGIN);
      return;
    }

    if (!content) {
      setError("Content cannot be empty");
      setLoading(false);
      return;
    }

    try {
      if (mode === "edit") {
        if (!postId) {
          setError("Post id is required for edit mode");
          setLoading(false);
          return;
        }

        await updatePost({
          id: Number(postId),
          title: data.title.trim(),
          excerpt: data.excerpt.trim(),
          slug: data.slug.trim(),
          featuredImage: data.featuredImage.trim(),
          content,
          status: data.status,
          commentStatus: data.commentStatus,
          publishedAt: data.publishedAt || null,
        });
      } else {
        await createPost({
          title: data.title.trim(),
          excerpt: data.excerpt.trim(),
          slug: data.slug.trim(),
          featuredImage: data.featuredImage.trim(),
          content,
          status: data.status,
          commentStatus: data.commentStatus,
          publishedAt: data.publishedAt || null,
        });
      }

      router.push("/admin/posts");
    } catch (error) {
      setError(
        `An error occurred while creating the post: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <label htmlFor="title">Заголовок поста</label>
        <input
          id="title"
          type="text"
          placeholder="Введите заголовок поста"
          className="border border-gray-300 rounded-md p-2"
          {...register(CREATE_POST_FIELDS.TITLE, { required: true })}
          required
        />
        {errors[CREATE_POST_FIELDS.TITLE] && (
          <span className="text-red-500">Title is required</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="slug">Slug поста</label>
        <input
          id="slug"
          type="text"
          placeholder="my-first-post"
          className="border border-gray-300 rounded-md p-2"
          {...register(CREATE_POST_FIELDS.SLUG, { required: true })}
          required
        />
        {errors[CREATE_POST_FIELDS.SLUG] && (
          <span className="text-red-500">Slug is required</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="excerpt">Краткое описание</label>
        <textarea
          id="excerpt"
          placeholder="Введите краткое описание поста"
          className="border border-gray-300 rounded-md p-2 min-h-24"
          {...register(CREATE_POST_FIELDS.EXCERPT)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="featuredImage">Изображение поста (URL)</label>
        <input
          id="featuredImage"
          type="text"
          placeholder="https://..."
          className="border border-gray-300 rounded-md p-2"
          {...register(CREATE_POST_FIELDS.FEATURED_IMAGE)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="status">Статус</label>
          <select
            id="status"
            className="border border-gray-300 rounded-md p-2 bg-transparent"
            {...register(CREATE_POST_FIELDS.STATUS, { required: true })}
          >
            <option value="DRAFT">DRAFT</option>
            <option value="PUBLISHED">PUBLISHED</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="publishedAt">Дата публикации</label>
          <input
            id="publishedAt"
            type="datetime-local"
            className="border border-gray-300 rounded-md p-2"
            {...register(CREATE_POST_FIELDS.PUBLISHED_AT)}
          />
        </div>

        <div className="flex items-center gap-2 pt-8">
          <input
            id="commentStatus"
            type="checkbox"
            className="h-4 w-4"
            {...register(CREATE_POST_FIELDS.COMMENT_STATUS)}
          />
          <label htmlFor="commentStatus">Комментарии разрешены</label>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label>Content</label>
        <ArticleEditor onChange={setContent} initialContent={initialEditorContent} />
      </div>

      <Button htmlType="submit" disabled={loading}>
        {mode === "edit" ? "Сохранить изменения" : "Создать пост"}
      </Button>

      {error && <span className="text-red-500">{error}</span>}
    </form>
  );
};
