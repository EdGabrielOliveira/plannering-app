import { fetchWithAuth } from "../secure/fetch";

export const cadastrarEvento = async () => {
  try {
    const data = await fetchWithAuth("/usuarios/eventos", {
      method: "POST",
    });
    return data;
  } catch {
    return null;
  }
};

export const atualizarEvento = async (id: string, dados: any) => {
  try {
    const data = await fetchWithAuth(`/usuarios/eventos/${id}`, {
      method: "PATCH",
    });
    return data;
  } catch {
    return null;
  }
};

export const listarTodosEventos = async () => {
  try {
    const data = await fetchWithAuth("/usuarios/eventos", {
      method: "GET",
    });
    return data;
  } catch {
    return null;
  }
};

export const buscarEventoPorId = async (id: string) => {
  try {
    const data = await fetchWithAuth(`/usuarios/eventos/${id}`, {
      method: "GET",
    });
    return data;
  } catch {
    return null;
  }
};

export const deletarEvento = async (id: string) => {
  try {
    const data = await fetchWithAuth(`/usuarios/eventos/${id}`, {
      method: "DELETE",
    });
    return data;
  } catch {
    return null;
  }
};
