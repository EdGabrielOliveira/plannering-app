import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  atualizarMateria,
  buscarMateriaPorId,
  cadastrarMateria,
  deletarMateria,
  listarTodasMaterias,
} from "../routers/materias";

export function useListarMaterias() {
  return useQuery({
    queryKey: ["materias"],
    queryFn: listarTodasMaterias,
  });
}

export function useMateriasPorId(id: string) {
  return useQuery({
    queryKey: ["materias", id],
    queryFn: () => buscarMateriaPorId(id),
    enabled: !!id,
  });
}

export function useCadastrarMateria() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cadastrarMateria,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materias"] });
    },
  });
}

export function useAtualizarMateria() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dados }: { id: string; dados: any }) => atualizarMateria(id, dados),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materias"] });
    },
  });
}

export function useDeletarMateria() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletarMateria(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materias"] });
    },
  });
}
