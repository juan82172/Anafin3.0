import { useEffect } from "react";
import { Alert } from "react-native";
import { setJSExceptionHandler } from "react-native-exception-handler";
import { AuthContextProvider } from "@/context/AuthContext";
import { DataContextProvider } from "@/context/DataContext";
import { Stack } from "expo-router";

// Manejo global de errores
const errorHandler = (error: Error, isFatal: boolean) => {
  if (isFatal) {
    Alert.alert(
      "Error crítico",
      `Ocurrió un error inesperado:\n${error.name} - ${error.message}`,
      [{ text: "Cerrar" }]
    );
  } else {
    console.log("Error no fatal:", error);
  }
};

// Registrar el handler al cargar el componente
setJSExceptionHandler(errorHandler, true);

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <DataContextProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "white" },
          }}
        >
          <Stack.Screen name="Login" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </DataContextProvider>
    </AuthContextProvider>
  );
}

