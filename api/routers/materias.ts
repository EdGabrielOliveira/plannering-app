import { fetchWithAuth } from "../secure/fetch";

export const cadastrarMateria = async () => {
  try {
    const data = await fetchWithAuth("/usuarios/materias", {
      method: "POST",
    });
    return data;
  } catch {
    return null;
  }
};

export const atualizarMateria = async (id: string, dados: any) => {
  try {
    const data = await fetchWithAuth(`/usuarios/materias/${id}`, {
      method: "PATCH",
    });
    return data;
  } catch {
    return null;
  }
};

export const listarTodasMaterias = async () => {
  try {
    const data = await fetchWithAuth("/usuarios/materias", {
      method: "GET",
    });
    return data;
  } catch {
    return null;
  }
};

export const buscarMateriaPorId = async (id: string) => {
  try {
    const data = await fetchWithAuth(`/usuarios/materias/${id}`, {
      method: "GET",
    });
    return data;
  } catch {
    return null;
  }
};

export const deletarMateria = async (id: string) => {
  try {
    const data = await fetchWithAuth(`/usuarios/materias/${id}`, {
      method: "DELETE",
    });
    return data;
  } catch {
    return null;
  }
};
