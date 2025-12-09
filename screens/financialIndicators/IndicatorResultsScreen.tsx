// screens/financialIndicators/IndicatorResultsScreen.tsx
import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useDataContext } from "@/context/DataContext";

import {
  calculateIndicatorsForYear,
  IndicatorGroupKey,
} from "./indicator-calculations";

type IndicatorCategory = "money" | "percent" | "days" | "relation" | "unknown";

export default function IndicatorResultsScreen() {
  const params = useLocalSearchParams();
  const year = params.year as string;
  const group = params.group as IndicatorGroupKey;

  const { dataInformation } = useDataContext();

  const yearData = dataInformation?.dataInformation?.find(
    (y) => y.currentYear === year
  );

  if (!yearData) {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ color: "red", fontSize: 16 }}>
          No se encontró información para el año seleccionado.
        </Text>
      </View>
    );
  }

  const results = calculateIndicatorsForYear(yearData, group);

  const normalizeName = (value: string) =>
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

  const moneyIndicators = new Set<string>([
    normalizeName("Capital de trabajo neto"),
    normalizeName("Capital de trabajo neto operativo"),
    normalizeName("OBF"),
    normalizeName("EBITDA"),
  ]);

  const percentIndicators = new Set<string>([
    normalizeName("Importancia del activo corriente"),
    normalizeName("Nivel de endeudamiento"),
    normalizeName("Endeudamiento corto plazo"),
    normalizeName("Endeudamiento financiero"),
    normalizeName("Impacto de la carga financiera"),
    normalizeName("Margen Bruto"),
    normalizeName("Margen Operacional"),
    normalizeName("Margen Neto"),
    normalizeName("ROE (Rendimiento del Patrimonio)"),
    normalizeName("ROA (Rendimiento del Activo Total)"),
  ]);

  const daysIndicators = new Set<string>([
    normalizeName("Rotación cartera"),
    normalizeName("Rotación inventarios"),
    normalizeName("Rotación proveedores"),
    normalizeName("Ciclo operacional"),
  ]);

  const relationIndicators = new Set<string>([
    normalizeName("Razón corriente"),
    normalizeName("Prueba ácida"),
    normalizeName("Rotación activos fijos"),
    normalizeName("Rotación activos operacionales"),
    normalizeName("Rotación activo total"),
    normalizeName("Veces que se gana el interés"),
    normalizeName("Leverage total"),
    normalizeName("Leverage corto plazo"),
    normalizeName("Leverage financiero total"),
  ]);

  const getCategoryForIndicator = (name: string): IndicatorCategory => {
    const key = normalizeName(name);

    if (moneyIndicators.has(key)) return "money";
    if (percentIndicators.has(key)) return "percent";
    if (daysIndicators.has(key)) return "days";
    if (relationIndicators.has(key)) return "relation";

    return "unknown";
  };

  const formatNumberEs = (value: number): string => {
    const fixed = value.toFixed(2);
    const [intPart, decPart] = fixed.split(".");
    const withDots = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `${withDots},${decPart}`;
  };

  const COLORS = {
    money: {
      bg: "#c8e6c9",         // Verde claro (Material Green 100)
      border: "#388e3c",     // Verde intenso para el borde (Material Green 700)
      text: "#1b5e20",       // Verde oscuro para el texto
      fontWeight: "bold",
    },
    percent: {
      bg: "#bbdefb",         // Azul más fuerte (Material Blue 100)
      border: "#1976d2",     // Azul profundo para el borde
      text: "#0d47a1",       // Azul oscuro para el texto 
      fontWeight: "bold",
    },
    days: {
      bg: "#fff9c4",          // Amarillo claro (Material Yellow 100)
      border: "#fbc02d",      // Amarillo intenso para el borde (Material Yellow 700)
      text: "#f57f17",        // Amarillo oscuro para el texto (Material Yellow 900)
      fontWeight: "bold",
    },
    relation: {
      bg: "#E5E5E5",          // Gris claro (Material Yellow 100)
      border: "#9E9E9E",      // Gris intenso para el borde (Material Yellow 700)
      text: "#424242",        // Gris oscuro para el texto (Material Yellow 900)
    },
    unknown: {
      bg: "#F5F5F5",
      border: "#CCCCCC",
      text: "#333333",
    },
  } as const;

  const getDisplayName = (name: string, category: IndicatorCategory) => {
    return name;
  };

  const formatValue = (category: IndicatorCategory, value: number | string) => {
    if (value === "N/A") return "N/A";

    const num = Number(value);
    if (Number.isNaN(num)) return String(value);

    switch (category) {
      case "money":
        // Pesos/moneda
        return `$ ${formatNumberEs(num)}`;
      case "percent":
        // Porcentaje
        return `% ${formatNumberEs(num)}`;
      case "days":
      case "relation":
        // Solo número formateado
        return formatNumberEs(num);
      default:
        return formatNumberEs(num);
    }
  };

  const getYearLabel = (raw: string) => raw.replace(/Año\s*/i, "").trim();

  return (
  <ScrollView style={{ padding: 20 }}>

    <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 15 }}>
      Indicador: {group}
    </Text>

    <Text style={{ fontSize: 16, marginBottom: 20 }}>
      Año seleccionado: {getYearLabel(year)}
    </Text>

    {results.map((indicator, index) => {

      const category = getCategoryForIndicator(indicator.name);

      // Íconos por categoría
      const ICONS: Record<IndicatorCategory, string> = {
        money: "💰",
        percent: "📊",
        days: "⏱️",
        relation: "⚖️",
        unknown: "🔎",
      };

      const palette = COLORS[category];
      const isNA = indicator.value === "N/A";

      return (
        <View key={index} style={{ marginBottom: 16 }}>

          {/* Ícono + Nombre del indicador */}
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#1F2937",
              marginBottom: 6,
              marginLeft: 4,
            }}
          >
            {ICONS[category]} {getDisplayName(indicator.name, category)}
          </Text>

          {/* Caja con el valor */}
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
              {isNA ? "N/A" : formatValue(category, indicator.value)}
            </Text>
          </View>

        </View>
      );
    })}

  </ScrollView>
);
}