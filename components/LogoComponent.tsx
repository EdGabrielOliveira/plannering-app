import { Image } from "expo-image";
import { View } from "react-native";

export default function LogoComponent() {
  const styles = {
    featureIcon: {
      fontSize: 24,
      marginBottom: 8,
    },
  };

  return (
    <View>
      <Image source={require("../assets/images/logo.png")} style={[styles.featureIcon, { width: 120, height: 120 }]} />
    </View>
  );
}
