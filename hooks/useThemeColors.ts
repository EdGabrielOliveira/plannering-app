import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export const useThemeColors = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return {
    primary: colorScheme === "dark" ? "#d1cfd2" : "#00898b",
    secondary: colorScheme === "dark" ? "#00898b" : "#d1cfd2",

    text: colors.text,
    background: colors.background,
    tint: colors.tint,
    icon: colors.icon,
    tabIconDefault: colors.tabIconDefault,
    tabIconSelected: colors.tabIconSelected,

    success: "#4CAF50",
    error: "#F44336",
    warning: "#FF9800",
    info: "#2196F3",

    overlay: colorScheme === "dark" ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.7)",
    border: colorScheme === "dark" ? "rgba(209, 207, 210, 0.2)" : "rgba(0, 137, 139, 0.2)",
  };
};
