"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui/Button/Button";
import { InputField } from "@/shared/ui/InputField";
import { useForm, SubmitHandler } from "react-hook-form";
import { LOGIN_FIELDS } from "../model/consts";
import { useState } from "react";
import { ROUTES } from "@/shared/lib/contsts";
import { useAuth } from "@/app/providers/Auth/provider";

type Fields = {
  username: string;
  password: string;
};

export const LoginForm = () => {
  const { login } = useAuth();
  const router = useRouter();
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

    const success = await login(data.username, data.password);

    if (success) {
      router.push(ROUTES.ADMIN);
    } else {
      setError("Invalid username or password");
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-4 border border-gray-300 rounded-md p-8 pb-12 max-w-[500px] w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputField
        {...register(LOGIN_FIELDS.USERNAME, { required: true })}
        error={errors[LOGIN_FIELDS.USERNAME]?.message}
        id="username"
        label="Username"
        type="text"
        placeholder="FoxSay"
        required
      />
      <InputField
        {...register(LOGIN_FIELDS.PASSWORD, { required: true })}
        error={errors[LOGIN_FIELDS.PASSWORD]?.message}
        id="password"
        label="Password"
        type="password"
        placeholder="********"
        required
      />
      <Button type="submit" disabled={loading}>
        Login
      </Button>
      {error && <span className="text-red-500">{error}</span>}
    </form>
  );
};
