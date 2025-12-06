import { ReactNode } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
  Text,
} from "react-native";

interface ScreenWrapperProps {
  children: ReactNode;
  title?: string; // ✅ Agregamos la prop title opcional
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ title, children }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
          className="bg-white"
        >
          {title && (
            <View style={{ padding: 16, borderBottomWidth: 1, borderColor: "#eee" }}>
              <Text style={{ fontSize: 18, fontWeight: "600" }}>{title}</Text>
            </View>
          )}

          <View style={{ flex: 1 }}>{children}</View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ScreenWrapper;