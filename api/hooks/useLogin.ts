import { useAuthContext } from "@/contexts/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../auth/login";

export function useLogin() {
  const queryClient = useQueryClient();
  const { checkAuth } = useAuthContext();

  return useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      if (data && data.success !== false) {
        queryClient.invalidateQueries({ queryKey: ["login"] });
        await checkAuth();
      }
    },
  });
}
