import {
  atualizarProva,
  buscarProvaPorId,
  cadastrarProva,
  deletarProva,
  listarTodasProvas,
} from "@/api/routers/provas";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useProvas() {
  return useQuery({
    queryKey: ["provas"],
    queryFn: listarTodasProvas,
  });
}

export function useProva(id: string) {
  return useQuery({
    queryKey: ["prova", id],
    queryFn: () => buscarProvaPorId(id),
    enabled: !!id,
  });
}

export function useCadastrarProva() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cadastrarProva,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["provas"] });
    },
  });
}

export function useAtualizarProva() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dados }: { id: string; dados: any }) => atualizarProva(id, dados),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["provas"] });
    },
  });
}

export function useDeletarProva() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletarProva(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["provas"] });
    },
  });
}
