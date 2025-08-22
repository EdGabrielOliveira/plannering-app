import { AuthStorage } from "@/api/auth/storage";
import { useThemeColors } from "@/hooks/useThemeColors";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const colors = useThemeColors();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const authenticated = await AuthStorage.isAuthenticated();

      if (!authenticated) {
        // Token inválido ou não existe - redirecionar para login
        await AuthStorage.clear(); // Limpar dados inválidos
        router.replace("/auth/login");
        return;
      }

      setIsAuthenticated(true);
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
      router.replace("/auth/login");
    }
  };

  // Mostrar loading enquanto verifica autenticação
  if (isAuthenticated === null) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // Se autenticado, renderizar filhos
  return <>{children}</>;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
