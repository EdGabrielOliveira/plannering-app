import { fetchWithAuth } from "../secure/fetch";

export const cadastrarProva = async () => {
  try {
    const data = await fetchWithAuth("/usuarios/provas", {
      method: "POST",
    });
    return data;
  } catch {
    return null;
  }
};

export const atualizarProva = async (id: string, dados: any) => {
  try {
    const data = await fetchWithAuth(`/usuarios/provas/${id}`, {
      method: "PATCH",
    });
    return data;
  } catch {
    return null;
  }
};

export const listarTodasProvas = async () => {
  try {
    const data = await fetchWithAuth("/usuarios/provas", {
      method: "GET",
    });
    return data;
  } catch {
    return null;
  }
};

export const buscarProvaPorId = async (id: string) => {
  try {
    const data = await fetchWithAuth(`/usuarios/provas/${id}`, {
      method: "GET",
    });
    return data;
  } catch {
    return null;
  }
};

export const deletarProva = async (id: string) => {
  try {
    const data = await fetchWithAuth(`/usuarios/provas/${id}`, {
      method: "DELETE",
    });
    return data;
  } catch {
    return null;
  }
};
