import { VerticalAnalyticsClassByYear } from "@/classes/analyticsClass/VerticalAnalyticsClass";
import CustomAlertInformative from "@/components/CustomAlertInformative";
import { useDataContext } from "@/context/DataContext";

import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import ServiceFormComponent from "../statementResults/ServiceFormComponent";
import CommercialFormComponent from "../statementResults/CommercialFormComponent";
import { HorizontalAnalyticsClassByYear } from "@/classes/analyticsClass/HorizontalAnalyticsClass";
import CustomAccordion from "@/components/CustomAccordion";
import CustomInput from "@/components/CustomInput";
const AnalyticsComponent = () => {
  const [verticalAnalysis, setVerticalAnalysis] = useState<any>([]);
  const [horizontalAnalysis, setHorizontalAnalysis] = useState<any>([]);
  const [isOpenDuPont, setIsOpenDuPont] = useState(false);
  const {
    enterpriseInformation,
    dataInformation,
    handleSetAnalyticsInformation,
  } = useDataContext();

  useEffect(() => {
    if (dataInformation?.hasData) {
      getHorizontalAndVerticalAnalysis();
    } else {
      setVerticalAnalysis([]);
      setHorizontalAnalysis([]);
    }
  }, [dataInformation]);

  const getHorizontalAndVerticalAnalysis = () => {
    const horizontalAnalysisArray = new Array();
    dataInformation?.dataInformation?.forEach((dataByYear, index) => {
      if (index !== 0) {
        const baseYear = dataInformation?.dataInformation[index - 1];
        horizontalAnalysisArray.push(
          new HorizontalAnalyticsClassByYear(
            dataByYear,
            baseYear,
            enterpriseInformation?.enterpriseType ?? null
          ).generateHorizontalAnalysis()
        );
      }
    });
    setHorizontalAnalysis(horizontalAnalysisArray);
    const verticalAnalysisArray = dataInformation?.dataInformation?.map(
      (dataByYear) => {
        return new VerticalAnalyticsClassByYear(
          dataByYear,
          enterpriseInformation?.enterpriseType ?? null
        ).generateVerticalAnalysis();
      }
    );
    setVerticalAnalysis(verticalAnalysisArray);
    handleSetAnalyticsInformation({
      hasData: true,
      verticalAnalytics: verticalAnalysisArray,
      horizontalAnalytics: horizontalAnalysisArray,
    });
  };

  return (
    <View className="p-4">
      {dataInformation?.hasData ? (
        <CustomAlertInformative
          isVisible={true}
          type="info"
          message={`Los años NO guardados, también serán tomados en cuenta para el análisis.`}
          isCloseable={false}
          onDismiss={() => {}}
        />
      ) : (
        <CustomAlertInformative
          isVisible={true}
          type="error"
          message={`Ingresa los estados de resultados en "Datos".`}
          isCloseable={false}
          onDismiss={() => {}}
        />
      )}

      {verticalAnalysis.length > 0 && (
        <View className="mb-4">
          <Text className="text-[18px] font-bold mb-4 self-center">
            Análisis Vertical
          </Text>
          {verticalAnalysis.map((elementByYear: any) =>
            enterpriseInformation?.enterpriseType === "service" ? (
              <ServiceFormComponent
                key={elementByYear?.currentYear}
                title={`Análisis ${elementByYear?.currentYear}`}
                date={elementByYear?.currentYear}
                initialData={elementByYear}
                editableForm={false}
                percentageValues={true}
                onSubmit={() => {}}
              />
            ) : (
              <CommercialFormComponent
                key={elementByYear?.currentYear}
                title={`Análisis ${elementByYear?.currentYear}`}
                date={elementByYear?.currentYear}
                initialData={elementByYear}
                editableForm={false}
                percentageValues={true}
                onSubmit={() => {}}
              />
            )
          )}
        </View>
      )}
      {horizontalAnalysis.length > 0 && (
        <View className="mb-4">
          <Text className="text-[18px] font-bold mb-4 self-center">
            Análisis Horizontal
          </Text>
          {horizontalAnalysis.map((elementByYear: any) =>
            enterpriseInformation?.enterpriseType === "service" ? (
              <ServiceFormComponent
                typeanalisis={'Horizontal'}
                key={elementByYear?.currentYear}
                title={`Análisis ${elementByYear?.currentYear}`}
                date={elementByYear?.currentYear}
                initialData={elementByYear}
                editableForm={false}
                percentageValues={true}
                onSubmit={() => {}}
              />
            ) : (
              <CommercialFormComponent
                typeanalisis={'Horizontal'}
                key={elementByYear?.currentYear}
                title={`Análisis ${elementByYear?.currentYear}`}
                date={elementByYear?.currentYear}
                initialData={elementByYear}
                editableForm={false}
                percentageValues={true}
                onSubmit={() => {}}
              />
            )
          )}
        </View>
      )}
      {horizontalAnalysis.length > 0 || verticalAnalysis.length > 0 ? (
        <View className="mb-4">
          <Text className="text-[18px] font-bold mb-4 self-center">
            Análisis DuPont
          </Text>
          <CustomAccordion
            isOpen={isOpenDuPont}
            onToggle={() => setIsOpenDuPont(!isOpenDuPont)}
            title="Análisis DuPont"
          >
            <View className="p-6">
              <View className="border-b border-neutral-200 mb-2">
                <CustomInput
                  label="Margen de utilidad neta"
                  inputType={"percentage"}
                  value={"15"}
                  onChangeText={() => {}}
                  editable={false}
                />
              </View>
              <View className="border-b border-neutral-200 mb-2">
                <CustomInput
                  label="Rotación del Activo Total"
                  inputType={"number"}
                  value={"1.3"}
                  onChangeText={() => {}}
                  editable={false}
                />
              </View>
              <View className="mb-2">
                <CustomInput
                  label="Rentabilidad Financiera"
                  inputType={"percentage"}
                  value={"21.4"}
                  onChangeText={() => {}}
                  editable={false}
                />
              </View>
            </View>
          </CustomAccordion>
        </View>
      ) : null}
    </View>
  );
};

export default AnalyticsComponent;
