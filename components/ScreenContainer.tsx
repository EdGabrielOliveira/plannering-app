import { Stack } from "expo-router";
import { ReactNode } from "react";
import { SafeAreaView, View } from "react-native";

export default function ScreenContainer({ children }: { children: ReactNode }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{ flex: 1, marginTop: 60, paddingHorizontal: 14 }}>{children}</View>
    </SafeAreaView>
  );
}
