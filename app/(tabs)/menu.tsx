import { logout } from "@/api/auth/logout";
import ButtonComponent from "@/components/Button/ButtonComponent";
import ScreenContainer from "@/components/ScreenContainer";
import { StyleSheet, Text, View } from "react-native";

export default function MenuScreen() {
  return (
    <ScreenContainer>
      <View style={styles.container}>
        <Text style={styles.title}>Menu</Text>
        <ButtonComponent
          title="Desconectar"
          onPress={() => {
            logout();
          }}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
