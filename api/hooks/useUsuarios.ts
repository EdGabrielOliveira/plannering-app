import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  atualizarUsuario,
  buscarUsuarioPorId,
  cadastrarUsuario,
  deletarUsuario,
  listarTodosUsuarios,
} from "../routers/usuarios";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: listarTodosUsuarios,
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => buscarUsuarioPorId(id),
    enabled: !!id,
  });
}

export function useCadastrarUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cadastrarUsuario,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useAtualizarUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dados }: { id: string; dados: any }) => atualizarUsuario(id, dados),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useDeletarUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletarUsuario(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
