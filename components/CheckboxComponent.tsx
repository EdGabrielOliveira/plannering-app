import { useThemeColors } from "@/hooks/useThemeColors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CheckboxProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export default function CheckboxComponent({ value, onValueChange, label, disabled = false }: CheckboxProps) {
  const colors = useThemeColors();

  const handlePress = () => {
    if (!disabled) {
      onValueChange(!value);
    }
  };

  return (
    <TouchableOpacity style={[styles.container, disabled && styles.disabled]} onPress={handlePress} activeOpacity={0.7}>
      <View
        style={[
          styles.checkbox,
          { borderColor: colors.border },
          value && { backgroundColor: colors.primary, borderColor: colors.primary },
          disabled && styles.checkboxDisabled,
        ]}
      >
        {value && <Ionicons name="checkmark" size={16} color="white" />}
      </View>
      {label && <Text style={[styles.label, { color: colors.text }, disabled && styles.labelDisabled]}>{label}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  checkboxDisabled: {
    opacity: 0.5,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
  },
  labelDisabled: {
    opacity: 0.5,
  },
  disabled: {
    opacity: 0.6,
  },
});
