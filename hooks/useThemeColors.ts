import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export const useThemeColors = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const colors = Colors[isDark ? "dark" : "light"];

  return {
    // Cores principais do tema
    primary: isDark ? "#d1cfd2" : "#0084d1",
    secondary: isDark ? "#0084d1" : "#d1cfd2",

    // Cores do sistema
    text: colors.text,
    background: colors.background,
    tint: colors.tint,
    icon: colors.icon,
    tabIconDefault: colors.tabIconDefault,
    tabIconSelected: colors.tabIconSelected,

    // Cores de status
    success: "#4CAF50",
    error: "#F44336",
    warning: "#FF9800",
    info: "#2196F3",

    // Cores utilitárias
    overlay: isDark ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.7)",
    border: isDark ? "rgba(209, 207, 210, 0.2)" : "rgba(0, 132, 209, 0.25)",

    // Cores de superfície
    surface: isDark ? "#1a1a1a" : "#ffffff",
    surfaceVariant: isDark ? "#2d2d2d" : "#f5f5f5",

    // Cores de texto secundário
    textSecondary: isDark ? "rgba(209, 207, 210, 0.7)" : "rgba(0, 132, 209, 0.7)",
    textMuted: isDark ? "rgba(209, 207, 210, 0.5)" : "rgba(0, 132, 209, 0.5)",
  };
};
