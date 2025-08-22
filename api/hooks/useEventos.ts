import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  atualizarEvento,
  buscarEventoPorId,
  cadastrarEvento,
  deletarEvento,
  listarTodosEventos,
} from "../routers/eventos";

export function useListarEventos() {
  return useQuery({
    queryKey: ["eventos"],
    queryFn: listarTodosEventos,
  });
}

export function useEventosPorId(id: string) {
  return useQuery({
    queryKey: ["eventos", id],
    queryFn: () => buscarEventoPorId(id),
    enabled: !!id,
  });
}

export function useCadastrarEvento() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cadastrarEvento,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["eventos"] });
    },
  });
}

export function useAtualizarEvento() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dados }: { id: string; dados: any }) => atualizarEvento(id, dados),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["eventos"] });
    },
  });
}

export function useDeletarEvento() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletarEvento(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["eventos"] });
    },
  });
}
