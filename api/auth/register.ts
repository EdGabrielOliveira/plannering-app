import { fetchWithAuth } from "../secure/fetch";

export const register = async () => {
  try {
    const data = await fetchWithAuth("/auth/register", {
      method: "POST",
    });
    return data;
  } catch {
    return null;
  }
};
