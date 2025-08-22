import { fetchWithAuth } from "../secure/fetch";

export const cadastrarTarefa = async () => {
  try {
    const data = await fetchWithAuth("/usuarios/tarefas", {
      method: "POST",
    });
    return data;
  } catch {
    return null;
  }
};

export const atualizarTarefa = async (id: string, dados: any) => {
  try {
    const data = await fetchWithAuth(`/usuarios/tarefas/${id}`, {
      method: "PATCH",
    });
    return data;
  } catch {
    return null;
  }
};

export const listarTodasTarefas = async () => {
  try {
    const data = await fetchWithAuth("/usuarios/tarefas", {
      method: "GET",
    });
    return data;
  } catch {
    return null;
  }
};

export const buscarTarefaPorId = async (id: string) => {
  try {
    const data = await fetchWithAuth(`/usuarios/tarefas/${id}`, {
      method: "GET",
    });
    return data;
  } catch {
    return null;
  }
};

export const deletarTarefa = async (id: string) => {
  try {
    const data = await fetchWithAuth(`/usuarios/tarefas/${id}`, {
      method: "DELETE",
    });
    return data;
  } catch {
    return null;
  }
};
