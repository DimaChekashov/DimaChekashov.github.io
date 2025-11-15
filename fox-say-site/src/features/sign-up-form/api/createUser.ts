import { IUser } from "@/shared/lib/types";

export const createUser = async ({
  username,
  email,
  password,
  displayName,
}: Pick<IUser, "username" | "email" | "password" | "displayName">) => {
  try {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        displayName,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || data.message || `HTTP error! status: ${response.status}`
      );
    }

    return data;
  } catch (error) {
    console.error(error);

    throw error;
  }
};
