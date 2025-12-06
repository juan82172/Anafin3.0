// app/financial-indicators/history.tsx
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { getIndicatorsHistory, HistoricalHeader } from "../database/indicatorsRepository";

export default function IndicatorsHistoryScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<HistoricalHeader[]>([]);
  const [error, setError] = useState<string | null>(null);
  const toColombiaDate = (utcString: string) => {
    return new Date(utcString).toLocaleString("es-CO", {
      timeZone: "America/Bogota",
    });
  };

  const prettyEnterprise = (raw?: string) => {
  if (!raw) return "";
  if (raw.toLowerCase() === "services") return "Servicios";
  if (raw.toLowerCase() === "commerce") return "Comercial";
  return raw;
};

  const loadHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getIndicatorsHistory();
      setHistory(data);
    } catch (err: any) {
      console.error("❌ Error cargando histórico:", err);
      setError("Ocurrió un error al cargar el histórico.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
        <Text className="mt-2 text-base">Cargando histórico...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-white p-4">
        <Text className="text-red-600 font-semibold text-center mb-2">
          {error}
        </Text>
      </View>
    );
  }

  if (!history.length) {
    return (
      <View className="flex-1 items-center justify-center bg-white p-4">
        <Text className="text-lg font-semibold text-gray-700 text-center">
          Aún no hay indicadores guardados en el histórico.
        </Text>
        <Text className="text-sm text-gray-500 text-center mt-2">
          Genera indicadores desde la pantalla de{" "}
          <Text className="font-semibold">Indicadores Financieros</Text>.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-xl font-bold mb-4 text-center">
        Histórico de Indicadores
      </Text>

      <FlatList
        data={history}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
              pathname: "/financial-indicators/history-details",
              params: {
                companyName: item.companyName,
                year: item.year,
              },
            })
          }
          >
          <View
            className="mb-3 p-3 rounded-lg border"
            style={{
              borderColor: "#e0e0e0",
              backgroundColor: "#f9fafb",
            }}
          >
            <Text className="text-base font-bold text-indigo-800">
              {item.companyName}
            </Text>
            <Text className="text-sm text-gray-700 mt-1">
              Año: <Text className="font-semibold">{item.year}</Text>
            </Text>
            <Text className="text-sm text-gray-700">
              Tipo de empresa:{" "}
              <Text className="font-semibold">{prettyEnterprise(item.enterpriseType)}</Text>
            </Text>
            <Text className="text-xs text-gray-500 mt-1">
              Registrado: {toColombiaDate(item.createdAt)}
            </Text>
          </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
