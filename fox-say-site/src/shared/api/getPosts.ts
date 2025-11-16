import { getCurrentDomain } from "../lib/utils";

export const getPosts = async () => {
  try {
    const currentDomain = await getCurrentDomain();

    const response = await fetch(`${currentDomain}/api/posts`, {
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
