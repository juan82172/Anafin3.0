import { CurrencyFormatter } from "@/utils/FunctionsUtils";
import React from "react";
import { Text, TextInput, View, StyleProp, TextStyle } from "react-native";
import CurrencyInput from "react-native-currency-input";

interface CustomInputProps {
  label: string;
  value: string;
  placeholder?: string;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  editable?: boolean;
  inputType?: "text" | "number" | "percentage" | "currency";
  onChangeText: (text: string) => void;
  onBlur?: (action: any) => void;
  style?: StyleProp<TextStyle>; // ✅ nueva prop para estilos personalizados
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  value,
  placeholder,
  keyboardType = "default",
  editable = true,
  inputType = "text",
  onChangeText,
  onBlur,
  style,
}) => {
  const Handlers = {
    number: (text: string) => text.replace(/\D/g, ""),
    percentage: (text: string) => {
      const sanitized = text.replace(/[^0-9.]/g, "");
      const parts = sanitized.split(".");
      return parts.length > 2
        ? `${parts[0]}.${parts.slice(1).join("")}`
        : sanitized;
    },
    currency: (text: string) => CurrencyFormatter(text),
    text: (text: string) => text,
  };

  const handleTextChange = (text: string) => {
    const sanitizedText = Handlers[inputType](text);
    onChangeText(sanitizedText);
  };

  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ marginBottom: 4, fontSize: 16 }}>{label}</Text>

      {inputType === "currency" || inputType === "percentage" ? (
        <CurrencyInput
          value={parseFloat(value)}
          onChangeValue={(valueInput) =>
            onChangeText(valueInput?.toString() ?? "0")
          }
          prefix={inputType === "currency" ? "$  " : "%  "}
          delimiter="."
          separator={inputType === "currency" ? "," : "."}
          precision={inputType === "currency" ? 2 : 1}
          minValue={inputType === "currency" ? 0 : -999}
          editable={editable}
          style={[
            {
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              padding: 8,
              fontSize: 16,
              backgroundColor: editable ? "white" : "#f0f0f0",
            },
            style,
          ]}
        />
      ) : (
        <TextInput
          value={value}
          onChangeText={handleTextChange}
          placeholder={placeholder ?? ""}
          keyboardType={keyboardType}
          onBlur={onBlur}
          editable={editable}
          style={[
            {
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              padding: 8,
              fontSize: 16,
              backgroundColor: editable ? "white" : "#f0f0f0",
            },
            style,
          ]}
        />
      )}
    </View>
  );
};

export default CustomInput;
