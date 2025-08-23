import { useColorScheme as useRNColorScheme } from "react-native";

/**
 * Returns the user's preferred color scheme ('light' or 'dark').
 * This hook works for both mobile and web platforms.
 */
export function useColorScheme() {
  return useRNColorScheme();
}
