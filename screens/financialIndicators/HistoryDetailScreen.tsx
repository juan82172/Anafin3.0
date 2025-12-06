// screens/financialIndicators/HistoryDetailScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getIndicatorsByCompanyAndYear } from "@/app/database/indicatorsRepository";

interface HistoryRow {
  groupKey: string;
  indicatorName: string;
  indicatorValue: number | null;
  createdAt: string;
}

type GroupedIndicators = Record<string, HistoryRow[]>;

const COLORS = {
  Liquidez: {
    bg: "#c8e6c9",
    border: "#388e3c",
    text: "#1b5e20",
  },
  Actividad: {
    bg: "#fff9c4",
    border: "#fbc02d",
    text: "#f57f17",
  },
  Endeudamiento: {
    bg: "#bbdefb",
    border: "#1976d2",
    text: "#0d47a1",
  },
  Rentabilidad: {
    bg: "#e0e0e0",
    border: "#9e9e9e",
    text: "#424242",
  },
  unknown: {
    bg: "#f5f5f5",
    border: "#cccccc",
    text: "#333333",
  },
} as const;

const GROUP_ICONS: Record<string, string> = {
  Liquidez: "💧",
  Actividad: "⚙️",
  Endeudamiento: "📉",
  Rentabilidad: "📈",
};

const groupIndicators = (items: HistoryRow[]): GroupedIndicators => {
  const groups: GroupedIndicators = {};
  items.forEach((i) => {
    if (!groups[i.groupKey]) groups[i.groupKey] = [];
    groups[i.groupKey].push(i);
  });
  return groups;
};

const formatNumberEs = (value: number): string => {
  const fixed = value.toFixed(2);
  const [intPart, decPart] = fixed.split(".");
  const withDots = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${withDots},${decPart}`;
};

export default function HistoryDetailScreen() {
  const { companyName, year } = useLocalSearchParams();
  const cleanYear = String(year)
  .replace(/año\s*/i, "")
  .replace(/Año\s*/i, "")
  .trim();
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState<GroupedIndicators>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const rows = await getIndicatorsByCompanyAndYear(
          String(companyName),
          String(year)
        );

        setGroups(groupIndicators(rows as HistoryRow[]));
      } catch (err) {
        console.error("❌ Error cargando detalle del histórico:", err);
        setError("Ocurrió un error al cargar el detalle del histórico.");
      } finally {
        setLoading(false);
      }
    };

    if (companyName && year) {
      load();
    } else {
      setError("Faltan datos para cargar el histórico.");
      setLoading(false);
    }
  }, [companyName, year]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
        <Text className="mt-2 text-base">Cargando indicadores guardados...</Text>
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

  const groupsKeys = Object.keys(groups);

  if (!groupsKeys.length) {
    return (
      <View className="flex-1 items-center justify-center bg-white p-4">
        <Text className="text-lg font-semibold text-gray-700 text-center">
          No se encontraron indicadores guardados para este historial.
        </Text>
      </View>
    );
  }

  return (
  <ScrollView className="flex-1 bg-white p-4">

    <Text className="text-xl font-bold mb-2 text-center">
      Indicadores guardados
    </Text>

    <Text className="text-base text-center mb-4">
      {companyName} - Año {cleanYear}
    </Text>

    {groupsKeys.map((groupKey) => (
      <View key={groupKey} style={{ marginBottom: 28 }}>

        {/* Título del grupo */}
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#1F2937",
            marginBottom: 12,
            marginLeft: 2,
          }}
        >
          {GROUP_ICONS[groupKey] ?? "📊"}  {groupKey}
        </Text>

        {/* Lista de indicadores del grupo */}
        {groups[groupKey].map((item, index) => {
          const palette =
            COLORS[groupKey as keyof typeof COLORS] ?? COLORS.unknown;
          const isNA = item.indicatorValue === null;

          return (
            <View key={index} style={{ marginBottom: 16 }}>

              {/* Nombre del indicador (arriba, estilo Anafin clásico) */}
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#1F2937",
                  marginBottom: 6,
                  marginLeft: 4,
                }}
              >
                {item.indicatorName}
              </Text>

              {/* Caja coloreada SOLO con el valor */}
              <View
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 14,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: palette.border,
                  backgroundColor: palette.bg,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: palette.text,
                  }}
                >
                  {isNA
                    ? "N/A"
                    : formatNumberEs(Number(item.indicatorValue))}
                </Text>
              </View>

            </View>
          );
        })}

      </View>
    ))}

  </ScrollView>
);
}
