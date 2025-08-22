import { useMutation } from "@tanstack/react-query";
import { register } from "../auth/register";

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
    onError: (error) => {
      console.error("Erro no cadastro:", error);
    },
  });
};
