import { useMutation, useQueryClient } from "@tanstack/react-query";

import { login } from "../auth/login";

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["login"] });
    },
  });
}
