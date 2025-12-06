import CustomAlertInformative from "@/components/CustomAlertInformative";
import CustomFormButton from "@/components/CustomFormButton";
import { useDataContext } from "@/context/DataContext";
import React, { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import ResultsService from "../../service/results/ResultsService";
import { useAuth } from "@/context/AuthContext";
import Spinner from "@/components/Spinner";
import Empty from "@/components/Empty";
import ResultsForm from "./ResultsForm";
import uuid from "react-native-uuid";

const ResultsComponents = () => {
  const { analyticsInformation } = useDataContext();
  const { user } = useAuth();
  const { enterpriseInformation } = useDataContext();

  const [showSessionAlert, setShowSessionAlert] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [resultGenerated, setResultGenerated] = useState<any>(null);
  const [resultsList, setResultsList] = useState<any[]>([]);

  const [loading, setLoading] = useState({
    result: false,
    resultsList: false,
    savingResult: false,
    deleteResult: false,
  });

  let resultId = uuid.v4();

  useEffect(() => {
    if (
      analyticsInformation?.hasData &&
      analyticsInformation?.horizontalAnalytics &&
      analyticsInformation?.verticalAnalytics
    ) {
      setIsAvailable(true);
    }
    if (user?.id !== "usuarioIncognito") {
      getIAResults(user?.email ?? "");
    } else {
      setShowSessionAlert(true);
    }
  }, [analyticsInformation]);

  useEffect(() => {
    setResultGenerated(null);
  }, [enterpriseInformation]);

  const getIAResults = async (email: string) => {
    setLoading({ ...loading, resultsList: true });
    ResultsService.getAllEarningsByUid(email)
      .then((response) => {
        const responseData: any[] = [];
        response.forEach((doc) => {
          responseData.push(doc.data());
        });
        setResultsList(responseData);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading({ ...loading, resultsList: false });
      });
  };

  const generateIAResults = async () => {
    setLoading({ ...loading, result: true });
    const verticalText = generateVerticalText(
      analyticsInformation?.verticalAnalytics
    );
    const horizontalText = generateHorizontalText(
      analyticsInformation?.horizontalAnalytics
    );
    const result = {
      id: resultId,
      title: `Resultados de la empresa ${enterpriseInformation?.enterpriseName} NIT: ${enterpriseInformation?.enterpriseNIT}`,
      results: `Resultados de la empresa ${enterpriseInformation?.enterpriseName} NIT: ${enterpriseInformation?.enterpriseNIT}.\n\n${verticalText}.\n${horizontalText}`,
      email: user?.email,
    };
    setTimeout(() => {
      setResultGenerated(result);
      setLoading({ ...loading, result: false });
    }, 3000);
    setResultGenerated(result);
  };
  //analisis vertical
  const generateVerticalText = (verticalInformation: any) => {
    let text = "";
    if (enterpriseInformation?.enterpriseType === "service") {
      // Actividad de servicios
      verticalInformation?.forEach((element: any) => {
        const introText = `🔍 Resultados del análisis vertical en el año ${element.currentYear}:\n`;

        const netExpenses =
          element.operatingSalesExpenses +
          element.administrativeOperatingExpenses;
        const expensesText =
          netExpenses > 0
            ? `💰 Del 100% de los ingresos, el ${netExpenses}% corresponde a los gastos operacionales del negocio.`
            : "💡 En este periodo no se presentaron gastos operacionales.";

        const operatingProfitText = `📈 La utilidad bruta operacional es equivalente al ${element.operatingProfit}%.`;

        const netIncomeText =
          element.netIncome > 0
            ? `✅ Después de cubrir los otros gastos y el impuesto a la renta, queda una utilidad positiva del ejercicio correspondiente al ${element.netIncome}%.`
            : `⚠️ Después de cubrir los otros gastos y el impuesto a la renta, queda una utilidad negativa del ejercicio correspondiente al ${element.netIncome}%.`;

        let balanceGeneral = ""; // Inicializar vacío

        if (element.totalactias > 0) {
          const activosCorrientesPorcentaje = (
            (element.subactcorr / element.totalactias) *
            100
          ).toFixed(1);
          const activosFijosPorcentaje = (
            (element.subppea / element.totalactias) *
            100
          ).toFixed(1);
          const otrasActividadesPorcentaje = (
            (element.subtoact / element.totalactias) *
            100
          ).toFixed(1);

          const pasivosCorrientesPorcentaje = (
            (element.subpascorr / element.totalfinanas) *
            100
          ).toFixed(1);
          const pasivosLargoPlazoPorcentaje = (
            (element.subpalarp / element.totalfinanas) *
            100
          ).toFixed(1);
          const patrimonioPorcentaje = (
            (element.subpatrim / element.totalfinanas) *
            100
          ).toFixed(1);

          balanceGeneral =
            `🏦 Adicionalmente, en el ${element.currentYear} se generó una inversión total de ${element.totalactias}.\n` +
            `👉 Esta inversión está distribuida en:\n` +
            `   - Activos corrientes: ${element.subactcorr} (${activosCorrientesPorcentaje}%)\n` +
            `   - Activos fijos: ${element.subppea} (${activosFijosPorcentaje}%)\n` +
            `   - Otras actividades económicas: ${element.subtoact} (${otrasActividadesPorcentaje}%)\n\n` +
            `💡 Para la financiación total:\n` +
            `   - Pasivos corrientes: ${element.subpascorr} (${pasivosCorrientesPorcentaje}%)\n` +
            `   - Pasivos a largo plazo: ${element.subpalarp} (${pasivosLargoPlazoPorcentaje}%)\n` +
            `   - Capital social y patrimonio: ${element.subpatrim} (${patrimonioPorcentaje}%)\n`;
        }

        text +=
          `${introText}\n` +
          `${expensesText}\n` +
          `${operatingProfitText}\n` +
          `${netIncomeText}\n\n` +
          `${balanceGeneral}\n` +
          `\n\n`;
      });
    }
    else {
      // Actividad comercial
verticalInformation?.forEach((element: any) => {
  const introText =
    `📊 Resultados del análisis vertical en el ${element.currentYear}:\n`;

  const netSalesText =
    `💵 Ventas netas: Del 100% de las ventas, teniendo en cuenta devoluciones y descuentos, ` +
    `el ${element.netSales} corresponde a las ventas netas.`;

  const costOfSalesText =
    `📉Costo de ventas:Corresponde al ${element.costOfSales}%.`;

  const grossOperatingIncomeText =
    `💡 Utilidad bruta operacional: Equivalente al ${element.grossOperatingIncome}%.`;

  const operatingProfitText =
    `📈 Utilidad operacional:Después de absorber los gastos operacionales, ` +
    `se obtiene una utilidad operacional del ${element.operatingProfit}%.`;

  const netIncomeText =
    element.netIncome > 0
      ? `✅ Resultado final: Se cubren los gastos financieros y extraordinarios, ` +
        `y el impuesto a la renta, quedando una utilidad positiva del ${element.netIncome}%.`
      : `⚠️ Resultado final: Se cubren los gastos financieros y extraordinarios, ` +
        `y el impuesto a la renta, quedando una utilidad negativa del ${element.netIncome}%.`;

  let balanceGeneral = ""; // Inicializamos vacío

  if (element.totalactiac > 0) {
    const activosCorrientesPorcentaje = (
      (element.subaccomer / element.totalactiac) *
      100
    ).toFixed(1);

    const activosFijosPorcentaje = (
      (element.subtppe / element.totalactiac) *
      100
    ).toFixed(1);

    const otrasActividadesPorcentaje = (
      (element.subtoaac / element.totalactiac) *
      100
    ).toFixed(1);

    const pasivosCorrientesPorcentaje = (
      (element.subtopcac / element.totalfinanac) *
      100
    ).toFixed(1);

    const pasivosLargoPlazoPorcentaje = (
      (element.subtoplac / element.totalfinanac) *
      100
    ).toFixed(1);

    const patrimonioPorcentaje = (
      (element.subtopatac / element.totalfinanac) *
      100
    ).toFixed(1);

    balanceGeneral =
      `Adicionalmente, para el ${element.currentYear} se generó un valor de activos corrientes de ${element.totalactiac}.\n` +
      `El valor de esta inversión está dividido en 3 cuentas:\n` +
      `   - Activos corrientes: ${element.subaccomer} (${activosCorrientesPorcentaje}%)\n` +
      `   - Propiedad, planta, equipo o activo fijo: ${element.subtppe} (${activosFijosPorcentaje}%)\n` +
      `   - Otros activos: ${element.subtoaac} (${otrasActividadesPorcentaje}%)\n\n` +
      `Para la financiación total:\n` +
      `   - Pasivos corrientes: ${element.subpascorr} (${pasivosCorrientesPorcentaje}%)\n` +
      `   - Pasivos a largo plazo: ${element.subpalarp} (${pasivosLargoPlazoPorcentaje}%)\n` +
      `   - Patrimonio: ${element.subpatrim} (${patrimonioPorcentaje}%)`;
  }

  text +=
    `${introText}` +
    `${netSalesText}\n` +
    `${costOfSalesText}\n` +
    `${grossOperatingIncomeText}\n` +
    `${operatingProfitText}\n` +
    `${netIncomeText}\n\n` +
    `${balanceGeneral}\n\n` +
    `\n\n`;
});

    }
    return text;
  };
  //analisis horizontal
  const generateHorizontalText = (horizontalInformation: any) => {
  let text = "";

  // Verificamos si es tipo servicio o no
  if (enterpriseInformation?.enterpriseType === "service") {
    horizontalInformation?.forEach((element: any) => {
      console.log("horizontalInformation", element);

      const balanceGeneral =
        `🔍 Resultados del análisis horizontal para el balance general en el año ${element.currentYear}:\n\n` +
        `💡 Diferencias entre las cuentas respecto al año anterior:\n` +
        `   - Subtotal Activo Corriente: ${element.subactcorrva}\n` +
        `   - Subtotal Propiedad, Planta y Equipo (Activo Fijo): ${element.subppeava}\n` +
        `   - Subtotal Otros Activos: ${element.subtoactva}\n` +
        `💵 - Total inversión o activos fijos: ${element.totalactiasva}\n` +
        `   - Subtotal Pasivo Corriente: ${element.subpascorrva}\n` +
        `   - Subtotal Pasivo de Largo Plazo: ${element.subpalarp}\n` +
        `   - Subtotal Patrimonio: ${element.subpatrimva}\n` +
        `💵 - Total financiación (pasivo y patrimonio): ${element.totalfinanasva}\n`;

      text +=
        `${balanceGeneral}\n` +
        `\n\n`;
    });
  } else {
    horizontalInformation?.forEach((element: any) => {
      console.log("horizontalInformation", element);

      const balanceGeneral =
        `🔍 Resultados del análisis horizontal para el balance general en el año ${element.currentYear}:\n\n` +
        `💡 Diferencias entre las cuentas respecto al año anterior:\n` +
        `   - Subtotal Activo Corriente: ${element.subaccomerva}\n` +
        `   - Subtotal Propiedad, Planta y Equipo (Activo Fijo): ${element.subtppeva}\n` +
        `   - Subtotal Otros Activos: ${element.subtoaacva}\n` +
        `💵- Total inversión o activos fijos: ${element.totalactiacva}\n` +
        `   - Subtotal Pasivo Corriente: ${element.subtopcacva}\n` +
        `   - Subtotal Pasivo de Largo Plazo: ${element.subtoplacva}\n` +
        `   - Subtotal Patrimonio: ${element.subtopatva}\n` +
        `💵- Total financiación (pasivo y patrimonio): ${element.totalfinanacva}\n`;

      text +=
        `${balanceGeneral}\n` +
        `\n\n`;
    });
  }

  return text;
};


  const handleSaveResult = () => {
    setLoading({ ...loading, savingResult: true });
    ResultsService.insertResults(resultGenerated)
      .then((response) => {
        console.log(response);
        if (response?.id) {
          getIAResults(user?.email ?? "");
          Alert.alert(
            `Guardado exitoso`,
            `El resultado ha sido guardado`,
            [
              {
                text: "Aceptar",
                onPress: () => { },
                style: "destructive",
              },
            ],
            { cancelable: true }
          );
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading({ ...loading, savingResult: false });
      });
  };

  const handleDeleteResult = (id: string) => {
    setLoading({ ...loading, deleteResult: true });
    ResultsService.deleteResult(id)
      .then(() => {
        getIAResults(user?.email ?? "");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading({ ...loading, deleteResult: false });
      });
  };

  return (
    <View className="p-4">
      {!isAvailable && (
        <CustomAlertInformative
          isVisible={true}
          type="error"
          message={`Primero verifica los análisis Horizontales y verticales generados en "Análisis". Asegúrate de que la información este correctamente diligenciada.`}
          isCloseable={false}
          onDismiss={() => { }}
        />
      )}
      {isAvailable && (
        <CustomAlertInformative
          isVisible={isAvailable}
          type="info"
          message={`Presione el botón de "Generar resultados" para obtener un análisis de los resultados obtenidos.`}
          isCloseable={false}
          onDismiss={() => { }}
        />
      )}
      {showSessionAlert && (
        <CustomAlertInformative
          isVisible={showSessionAlert}
          type="info"
          message={`Para ver el historial de resultados, inicia sesión en "Opciones".`}
          isCloseable={false}
          onDismiss={() => { }}
        />
      )}

      {isAvailable && (
        <View className="border-b border-neutral-200 mb-2">
          <Text className="text-[18px] font-bold mb-4 self-center">
            Nuevo resultado
          </Text>
          {loading.result ? (
            <Spinner />
          ) : (
            resultGenerated && (
              <ResultsForm
                key={resultGenerated.id}
                title={resultGenerated.title}
                resultContent={resultGenerated.results}
                isNew={true}
                OnPressButton={handleSaveResult}
                disabledButton={
                  user?.id === "usuarioIncognito" || loading.savingResult
                }
              />
            )
          )}
          {loading.savingResult || loading.resultsList ? (
            <Spinner />
          ) : (
            <CustomFormButton
              onPressFunction={generateIAResults}
              textButton={"Generar resultados"}
            />
          )}
        </View>
      )}
      <View className="mb-2 mt-10">
        <Text className="text-[18px] font-bold mb-4 self-center">
          Historial de resultados
        </Text>
        {loading.resultsList && <Spinner />}
        {!loading.resultsList && resultsList.length === 0 && <Empty />}
        {!loading.resultsList &&
          resultsList.length > 0 &&
          resultsList.map((result) => (
            <ResultsForm
              key={result.id}
              isNew={false}
              title={result.title}
              resultContent={result.results}
              OnPressButton={() => handleDeleteResult(result.id)}
              disabledButton={loading.deleteResult}
            />
          ))}
      </View>
    </View>
  );
};

export default ResultsComponents;
