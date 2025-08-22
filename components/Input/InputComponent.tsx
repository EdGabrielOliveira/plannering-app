import { useThemeColors } from "@/hooks/useThemeColors";
import { Text, TextInput, View } from "react-native";

interface InputComponentProps extends React.ComponentProps<typeof TextInput> {
  value: string;
  placeholder: string;
  label: string;
  onChangeText?: (text: string) => void;
}

export default function InputComponent({ value, onChangeText, placeholder, label, ...props }: InputComponentProps) {
  const colors = useThemeColors();
  return (
    <View>
      <Text>{label}</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 5,
          padding: 10,
          fontSize: 16,
        }}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
    </View>
  );
}
