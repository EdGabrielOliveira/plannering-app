import { router } from "expo-router";
import { AuthStorage } from "./storage";

export const logout = async () => {
  try {
    await AuthStorage.clear();
    router.replace("/auth/login");
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
  }
};
