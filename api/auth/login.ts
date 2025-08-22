import { fetchWithoutAuth } from "../secure/fetch";
import { AuthStorage } from "./storage";

export const login = async ({ email, senha }: { email: string; senha: string }) => {
  try {
    const response = await fetchWithoutAuth("/auth/login", {
      method: "POST",
      data: { email, senha },
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.data ?? response;

    if (data && data.access_token) {
      if (data.refresh_token) {
        await AuthStorage.setTokens(data.access_token, data.refresh_token);
      } else {
        await AuthStorage.setToken(data.access_token);
      }
      await AuthStorage.setUser(data.user);

      return {
        success: true,
        user: data.user,
        token: data.access_token,
        refreshToken: data.refresh_token,
        message: "Login realizado com sucesso",
      };
    } else if (data) {
      return {
        success: true,
        user: data,
        message: "Login realizado com sucesso",
      };
    } else {
      throw new Error("Credenciais inválidas");
    }
  } catch (error: any) {
    if (error.response?.status === 400) {
      throw new Error("Dados inválidos. Verifique email e senha");
    } else if (error.response?.status === 401) {
      throw new Error("Email ou senha incorretos");
    } else if (error.response?.status === 404) {
      throw new Error("Usuário não encontrado");
    } else if (error.response?.status >= 500) {
      throw new Error("Erro no servidor. Tente novamente mais tarde");
    } else if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Erro de conexão. Verifique sua internet");
    }
  }
};
