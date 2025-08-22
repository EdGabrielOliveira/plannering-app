import { fetchWithoutAuth } from "../secure/fetch";
import { AuthStorage } from "./storage";

export const register = async ({ nome, email, senha }: { nome: string; email: string; senha: string }) => {
  try {
    const response = await fetchWithoutAuth("/auth/register", {
      method: "POST",
      data: { nome, email, senha },
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
        message: "Cadastro realizado com sucesso",
      };
    } else if (data) {
      return {
        success: true,
        user: data,
        message: "Cadastro realizado com sucesso",
      };
    } else {
      throw new Error("Erro ao processar cadastro");
    }
  } catch (error: any) {
    if (error.response?.status === 400) {
      throw new Error("Dados inválidos. Verifique nome, email e senha");
    } else if (error.response?.status === 409) {
      throw new Error("Este email já está em uso");
    } else if (error.response?.status === 422) {
      throw new Error("Email inválido ou senha muito fraca");
    } else if (error.response?.status >= 500) {
      throw new Error("Erro no servidor. Tente novamente mais tarde");
    } else if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Erro de conexão. Verifique sua internet");
    }
  }
};
