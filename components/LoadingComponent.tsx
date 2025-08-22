import { useThemeColors } from "@/hooks/useThemeColors";
import { ActivityIndicator, Text, View } from "react-native";
import ScreenContainer from "./ScreenContainer";

interface LoadingComponentProps {
  title?: string;
  description?: string;
}

export default function LoadingComponent({ title, description }: LoadingComponentProps) {
  const colors = useThemeColors();

  const loadingText = title || "Carregando...";
  const loadingDescription = description || "Por favor, aguarde.";

  return (
    <ScreenContainer>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={80} style={{ marginBottom: 12 }} color={colors.primary} />
        <Text style={{ fontSize: 18, fontWeight: "bold", marginVertical: 8 }}>{loadingText}</Text>
        <Text style={{ textAlign: "center", paddingHorizontal: 20 }}>{loadingDescription}</Text>
      </View>
    </ScreenContainer>
  );
}
