import { useEffect, useState } from "react";
import { ensureValidToken } from "../api/auth/refresh";
import { AuthStorage } from "../api/auth/storage";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const authenticated = await AuthStorage.isAuthenticated();
      setIsAuthenticated(authenticated);

      if (authenticated) {
        const userData = await AuthStorage.getUser();
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshTokens = async () => {
    try {
      await ensureValidToken();
      await checkAuth();
      return true;
    } catch (error) {
      console.error("Erro ao renovar tokens:", error);
      setIsAuthenticated(false);
      setUser(null);
      return false;
    }
  };

  const logout = async () => {
    try {
      await AuthStorage.clear();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return {
    isAuthenticated,
    isLoading,
    user,
    checkAuth,
    refreshTokens,
    logout,
  };
};
