import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  atualizarTarefa,
  buscarTarefaPorId,
  cadastrarTarefa,
  deletarTarefa,
  listarTodasTarefas,
} from "../routers/tarefas";

export function useListarTarefas() {
  return useQuery({
    queryKey: ["tarefas"],
    queryFn: listarTodasTarefas,
  });
}

export function useTarefasPorId(id: string) {
  return useQuery({
    queryKey: ["tarefas", id],
    queryFn: () => buscarTarefaPorId(id),
    enabled: !!id,
  });
}

export function useCadastrarTarefa() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cadastrarTarefa,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tarefas"] });
    },
  });
}

export function useAtualizarTarefa() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dados }: { id: string; dados: any }) => atualizarTarefa(id, dados),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tarefas"] });
    },
  });
}

export function useDeletarTarefa() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletarTarefa(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tarefas"] });
    },
  });
}
