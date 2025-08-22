import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  atualizarAtividade,
  buscarAtividadePorId,
  cadastrarAtividade,
  deletarAtividade,
  listarTodasAtividades,
} from "../routers/atividades";

export function useListarAtividades() {
  return useQuery({
    queryKey: ["atividades"],
    queryFn: listarTodasAtividades,
  });
}

export function useAtividadesPorId(id: string) {
  return useQuery({
    queryKey: ["atividades", id],
    queryFn: () => buscarAtividadePorId(id),
    enabled: !!id,
  });
}

export function useCadastrarAtividade() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cadastrarAtividade,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["atividades"] });
    },
  });
}

export function useAtualizarAtividade() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dados }: { id: string; dados: any }) => atualizarAtividade(id, dados),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["atividades"] });
    },
  });
}

export function useDeletarAtividade() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletarAtividade(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["atividades"] });
    },
  });
}
