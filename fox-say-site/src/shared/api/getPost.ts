import { getCurrentDomain } from "../lib/utils";

export const getPost = async (id: string) => {
  try {
    const currentDomain = await getCurrentDomain();

    const response = await fetch(`${currentDomain}/api/posts/${id}`, {
      method: "GET",
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};
