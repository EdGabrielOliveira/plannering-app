import ButtonComponent from "@/components/Button/ButtonComponent";
import LoadingComponent from "@/components/LoadingComponent";
import ScreenContainer from "@/components/ScreenContainer";
import { router } from "expo-router";
import { Text, View } from "react-native";

export default function HomeScreen() {
  // Define isPending, for example as false or from a hook
  const isPending = false; // Replace with your actual logic

  if (isPending) {
    return (
      <ScreenContainer>
        <View>
          <LoadingComponent />
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <View>
        <Text>Welcome to the ADMIN!</Text>

        <ButtonComponent
          title="Entrar"
          onPress={() => {
            router.push("/index");
          }}
        />
      </View>
    </ScreenContainer>
  );
}
