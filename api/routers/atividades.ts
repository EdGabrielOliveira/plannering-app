import { fetchWithAuth } from "../secure/fetch";

export const cadastrarAtividade = async () => {
  try {
    const data = await fetchWithAuth("/usuarios/atividades", {
      method: "POST",
    });
    return data;
  } catch {
    return null;
  }
};

export const atualizarAtividade = async (id: string, dados: any) => {
  try {
    const data = await fetchWithAuth(`/usuarios/atividades/${id}`, {
      method: "PATCH",
    });
    return data;
  } catch {
    return null;
  }
};

export const listarTodasAtividades = async () => {
  try {
    const data = await fetchWithAuth("/usuarios/atividades", {
      method: "GET",
    });
    return data;
  } catch {
    return null;
  }
};

export const buscarAtividadePorId = async (id: string) => {
  try {
    const data = await fetchWithAuth(`/usuarios/atividades/${id}`, {
      method: "GET",
    });
    return data;
  } catch {
    return null;
  }
};

export const deletarAtividade = async (id: string) => {
  try {
    const data = await fetchWithAuth(`/usuarios/atividades/${id}`, {
      method: "DELETE",
    });
    return data;
  } catch {
    return null;
  }
};
