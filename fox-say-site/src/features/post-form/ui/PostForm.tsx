"use client";

import { Button } from "@/shared/ui/Button/Button";
import { InputField } from "@/shared/ui/InputField";
import { useForm, SubmitHandler } from "react-hook-form";
import { POST_FIELDS } from "../model/consts";
import { useState } from "react";

type Fields = {
  title: string;
  excerpt: string;
  email: string;
  password: string;
};

export const PostForm = () => {
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

    console.log(data);
  };

  return (
    <form
      className="flex flex-col gap-4 border border-gray-300 rounded-md p-8 pb-12 max-w-[500px] w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputField
        {...register(POST_FIELDS.TITLE, { required: true })}
        error={errors[POST_FIELDS.TITLE]?.message}
        id="title"
        label="Title"
        type="text"
        placeholder="Post title..."
        required
      />
      <InputField
        {...register(POST_FIELDS.EXCERPT, { required: true })}
        error={errors[POST_FIELDS.EXCERPT]?.message}
        id="excerpt"
        label="Excerpt"
        type="text"
        placeholder="The post excerpt..."
        required
      />
      <Button htmlType="submit" disabled={loading}>
        Create Post
      </Button>
      {error && <span className="text-red-500">{error}</span>}
    </form>
  );
};
