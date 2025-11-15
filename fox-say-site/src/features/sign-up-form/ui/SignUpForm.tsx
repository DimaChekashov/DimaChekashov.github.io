"use client";

import { Button } from "@/shared/ui/Button/Button";
import { InputField } from "@/shared/ui/InputField";
import { createUser } from "../api/createUser";
import { useForm, SubmitHandler } from "react-hook-form";
import { SIGN_UP_FIELDS } from "../model/consts";
import { useState } from "react";

type Fields = {
  username: string;
  displayName: string;
  email: string;
  password: string;
};

export const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Fields>();

  const onSubmit: SubmitHandler<Fields> = (data) => {
    setLoading(true);
    setError(null);

    createUser(data)
      .then((response) => {
        console.log("User created successfully:", response);
      })
      .catch((error) => {
        setError(error.message || "An error occurred");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form
      className="flex flex-col gap-4 border border-gray-300 rounded-md p-8 pb-12 max-w-[500px] w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputField
        {...register(SIGN_UP_FIELDS.USERNAME, { required: true })}
        error={errors[SIGN_UP_FIELDS.USERNAME]?.message}
        id="username"
        label="Username"
        type="text"
        placeholder="FoxSay"
        required
      />
      <InputField
        {...register(SIGN_UP_FIELDS.DISPLAY_NAME)}
        id="displayName"
        label="DisplayName"
        type="text"
        placeholder="Fox Say"
      />
      <InputField
        {...register(SIGN_UP_FIELDS.EMAIL, { required: true })}
        error={errors[SIGN_UP_FIELDS.EMAIL]?.message}
        id="email"
        label="Email"
        type="email"
        placeholder="foxsay@example.com"
        required
      />
      <InputField
        {...register(SIGN_UP_FIELDS.PASSWORD, { required: true })}
        error={errors[SIGN_UP_FIELDS.PASSWORD]?.message}
        id="password"
        label="Password"
        type="password"
        placeholder="********"
        required
      />
      <Button type="submit" disabled={loading}>
        Sign Up
      </Button>
      {error && <span className="text-red-500">{error}</span>}
    </form>
  );
};
