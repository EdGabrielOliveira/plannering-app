import { useThemeColors } from "@/hooks/useThemeColors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

type ButtonVariant = "solid" | "outline" | "ghost" | "link";

interface ButtonProps extends TouchableOpacityProps {
  onPress: () => void;
  title: string;
  variant?: ButtonVariant;
}

export default function ButtonComponent({ onPress, title, variant = "solid", ...props }: ButtonProps) {
  const colors = useThemeColors();

  const styles = StyleSheet.create({
    container: {
      borderRadius: 5,
      overflow: "hidden",
    },
    button: {
      padding: 14,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor:
        variant === "solid"
          ? colors.primary
          : variant === "outline" || variant === "ghost"
          ? "transparent"
          : "transparent",
      borderWidth: variant === "outline" ? 2 : 0,
      borderColor: variant === "outline" ? colors.primary : "transparent",
    },
    text: {
      color:
        variant === "solid"
          ? colors.secondary
          : variant === "outline"
          ? colors.primary
          : variant === "ghost"
          ? colors.primary
          : variant === "link"
          ? colors.primary
          : colors.secondary,
      fontWeight: variant === "link" ? "normal" : "bold",
      fontSize: 14,
      textAlign: "center",
      textDecorationLine: variant === "link" ? "underline" : "none",
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.button} {...props}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}
