import { fetchWithAuth } from "../secure/fetch";
import { Usuario } from "../types/usuario";

export const cadastrarUsuario = async () => {
  try {
    const data = await fetchWithAuth("/usuarios", {
      method: "POST",
    });
    return data;
  } catch {
    return null;
  }
};

export const atualizarUsuario = async (id: string, dados: any) => {
  try {
    const data = await fetchWithAuth(`/usuarios/${id}`, {
      method: "PATCH",
    });
    return data;
  } catch {
    return null;
  }
};

export const listarTodosUsuarios = async () => {
  try {
    const data = await fetchWithAuth("/usuarios", {
      method: "GET",
    });
    return data as Usuario[];
  } catch {
    return null;
  }
};

export const buscarUsuarioPorId = async (id: string) => {
  try {
    const data = await fetchWithAuth(`/usuarios/${id}`, {
      method: "GET",
    });
    return data;
  } catch {
    return null;
  }
};

export const deletarUsuario = async (id: string) => {
  try {
    const data = await fetchWithAuth(`/usuarios/${id}`, {
      method: "DELETE",
    });
    return data;
  } catch {
    return null;
  }
};
