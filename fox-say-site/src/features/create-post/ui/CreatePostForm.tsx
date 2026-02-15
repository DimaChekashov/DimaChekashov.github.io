"use client";
import { useState } from "react";

import { ArticleEditor } from "@/widgets/article-editor/ui/ArticleEditor";
import { InputField } from "@/shared/ui/InputField";
import { Button } from "@/shared/ui/Button/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { CREATE_POST_FIELDS } from "../model/consts";
import { createPost } from "../api/create-post";
import { useAuth } from "@/app/providers/Auth/provider";
import { ROUTES } from "@/shared/lib/contsts";
import { useRouter } from "next/navigation";

type Fields = {
  title: string;
  excerpt: string;
  slug: string;
  featuredImage: string;
  content: string;
};

export const CreatePostForm = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Fields>();

  const onSubmit: SubmitHandler<Fields> = async (data) => {
    setLoading(true);
    setError(null);

    if (!user) {
      router.push(ROUTES.LOGIN);
      return;
    }

    if (!content) {
      setError("Content cannot be empty");
      setLoading(false);
      return;
    }

    try {
      const post = await createPost({
        title: data.title,
        excerpt: data.excerpt,
        slug: data.slug,
        featuredImage: data.featuredImage,
        content,
        authorId: user.id,
      });

      console.log("Пост успешно создан:", post);
    } catch (error) {
      setError("An error occurred while creating the post: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <InputField
        {...register(CREATE_POST_FIELDS.TITLE, { required: true })}
        error={errors[CREATE_POST_FIELDS.TITLE]?.message}
        id="title"
        label="Заголовок поста"
        placeholder="Введите заголовок поста"
        type="text"
        required
      />

      <InputField
        {...register(CREATE_POST_FIELDS.EXCERPT, { required: true })}
        error={errors[CREATE_POST_FIELDS.EXCERPT]?.message}
        id="excerpt"
        label="Краткое описание"
        placeholder="Введите краткое описание поста"
        type="text"
        required
      />

      <InputField
        {...register(CREATE_POST_FIELDS.SLUG, { required: true })}
        error={errors[CREATE_POST_FIELDS.SLUG]?.message}
        id="slug"
        label="Slug поста"
        placeholder="Введите slug поста (например, my-first-post)"
        type="text"
        required
      />

      <InputField
        {...register(CREATE_POST_FIELDS.FEATURED_IMAGE, { required: false })}
        error={errors[CREATE_POST_FIELDS.FEATURED_IMAGE]?.message}
        id="featuredImage"
        label="Изображение поста"
        placeholder="Введите URL изображения поста"
        type="text"
      />

      <ArticleEditor onChange={setContent} />

      <Button htmlType="submit" disabled={loading}>
        Создать пост
      </Button>

      {error && <span className="text-red-500">{error}</span>}
    </form>
  );
};
