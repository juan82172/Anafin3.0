// screens/financialIndicators/IndicatorsScreen.tsx
import React, { useMemo, useState } from "react";
import { View, Text, Alert } from "react-native";
import { router } from "expo-router";

import { useDataContext } from "@/context/DataContext";
import CustomSelect from "@/components/CustomSelect";
import CustomFormButton from "@/components/CustomFormButton";

import {
  indicatorList,
  IndicatorGroupKey,
  calculateIndicatorsForYear,
} from "./indicator-calculations";

import { saveIndicatorsForYear } from "@/app/database/indicatorsRepository";

export default function IndicatorsScreen() {
  const { dataInformation, enterpriseInformation } = useDataContext();
  const yearsData = dataInformation?.dataInformation ?? [];

  const groupOptions = useMemo(
    () =>
      (Object.keys(indicatorList) as IndicatorGroupKey[]).map((key, index) => ({
        id: String(index),
        label: key,
        value: key,
      })),
    []
  );

  const yearOptions = useMemo(
    () =>
      yearsData.map((y, index) => ({
        id: String(index),
        label: y.currentYear, // solo "2021", "2022", etc.
        value: y.currentYear,
      })),
    [yearsData]
  );

  const [indicatorGroup, setIndicatorGroup] =
    useState<IndicatorGroupKey>("Liquidez");

  const [selectedYear, setSelectedYear] = useState<string | null>(
    yearOptions[0]?.value ?? null
  );

  const [savingHistorical, setSavingHistorical] = useState(false);

  const handleNavigate = () => {
    if (!selectedYear) {
      Alert.alert(
        "Selecciona un año",
        "Debes seleccionar un año para ver los indicadores."
      );
      return;
    }

    router.push({
      pathname: "/financial-indicators/results",
      params: {
        year: selectedYear,
        group: indicatorGroup,
      },
    });
  };

  const handleGenerateHistorical = async () => {
    if (!selectedYear) {
      Alert.alert(
        "Selecciona un año",
        "Debes seleccionar un año para guardar en el historial."
      );
      return;
    }

    if (!enterpriseInformation || !yearsData.length) {
      Alert.alert(
        "Datos incompletos",
        "Primero debes diligenciar y guardar la información financiera de la empresa."
      );
      return;
    }

    const yearData = yearsData.find((y) => y.currentYear === selectedYear);

    if (!yearData) {
      Alert.alert(
        "Año no encontrado",
        `No se encontró información para el año ${selectedYear}.`
      );
      return;
    }

    try {
      setSavingHistorical(true);

      const companyName =
        (enterpriseInformation as any).enterpriseName || "Empresa sin nombre";
      const enterpriseType =
        enterpriseInformation.enterpriseType || "Desconocido";

      const allGroups = Object.keys(indicatorList) as IndicatorGroupKey[];

      const indicatorsByGroup = allGroups.map((groupKey) => {
        const indicators = calculateIndicatorsForYear(yearData, groupKey);
        return {
          groupKey,
          indicators: indicators.map((ind) => ({
            name: ind.name,
            value: ind.value,
          })),
        };
      });

      await saveIndicatorsForYear({
        companyName,
        year: String(selectedYear),
        enterpriseType,
        indicatorsByGroup,
      });

      Alert.alert(
        "Guardado en historial",
        `Se guardaron los indicadores de ${companyName} - ${selectedYear} correctamente.`
      );
    } catch (error) {
      console.error("❌ Error generando histórico:", error);
      Alert.alert(
        "Error",
        "Ocurrió un problema al guardar en el historial. Revisa la consola para más detalles."
      );
    } finally {
      setSavingHistorical(false);
    }
  };

  const handleGoToHistory = () => {
    router.push("/financial-indicators/history");
  };

  return (
    <View className="p-4">
      <Text className="text-xl font-bold mb-4">Indicadores Financieros</Text>

      <CustomSelect
        label="Seleccione grupo de indicadores"
        selectedValue={indicatorGroup}
        onValueChange={(value) => setIndicatorGroup(value as IndicatorGroupKey)}
        options={groupOptions}
      />

      <CustomSelect
        label="Seleccione año"
        selectedValue={selectedYear}
        onValueChange={(value) => setSelectedYear(value as string)}
        options={yearOptions}
      />

      {/* Botón VER RESULTADOS */}
      <CustomFormButton
        textButton="Ver resultados"
        onPressFunction={handleNavigate}
        isDisabled={!selectedYear || savingHistorical}
      />

      {/* Botón GUARDAR EN HISTORIAL */}
      <View className="mt-3">
        <CustomFormButton
          textButton={
            savingHistorical ? "Guardando en historial..." : "Guardar en Historial"
          }
          onPressFunction={handleGenerateHistorical}
          isDisabled={!selectedYear || savingHistorical}
        />
      </View>

      {/* Botón VER HISTÓRICO */}
      <View className="mt-3">
        <CustomFormButton
          textButton="Histórico"
          onPressFunction={handleGoToHistory}
          isDisabled={false}
        />
      </View>
    </View>
  );
}