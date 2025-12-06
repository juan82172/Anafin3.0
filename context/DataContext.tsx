// context/DataContext.tsx
import {
  AnalyticsInformation,
  DataInformation,
} from "@/classes/dataClasses/DataClass";
import { ChildrenProps } from "@/interfaces/authInterfaces/AuthContextProps";
import {
  AnalyticsInformationInterface,
  DataContextInterface,
  DataInformationInterface,
  EnterpriseInformationInterface,
} from "@/interfaces/dataInterfaces/DataContextProps";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { initIndicatorsTable } from "@/app/database/indicatorsRepository";

const initialValue: DataContextInterface = {
  enterpriseInformation: null,
  dataInformation: null,
  analyticsInformation: null,
  handleSetEnterpriseInformation: () => {},
  handleSetDataInformation: () => {},
  handleSetAnalyticsInformation: () => {},
  clearInformation: () => {},
};

export const DataContext = createContext<DataContextInterface>(initialValue);

export const DataContextProvider = ({ children }: ChildrenProps) => {
  const [enterpriseInformation, setEnterpriseInformation] =
    useState<EnterpriseInformationInterface | null>(null);

  const [dataInformation, setDataInformation] =
    useState<DataInformationInterface | null>(null);

  const [analyticsInformation, setAnalyticsInformation] =
    useState<AnalyticsInformationInterface | null>(null);

  // 🔹 Inicializar tabla de indicadores una sola vez
  useEffect(() => {
    initIndicatorsTable();
  }, []);

  const handleSetAnalyticsInformation = (analyticsInformation: any) => {
    setAnalyticsInformation(analyticsInformation);
  };

  const handleSetEnterpriseInformation = (
    enterpriseInformation: EnterpriseInformationInterface
  ) => {
    setEnterpriseInformation(enterpriseInformation);
    const dataInformationValue = new DataInformation(
      enterpriseInformation.years,
      enterpriseInformation.enterpriseType,
      enterpriseInformation.initialYear
    );
    const analyticsInformationValue = new AnalyticsInformation();
    setDataInformation(dataInformationValue);
    setAnalyticsInformation(analyticsInformationValue);
  };

  const handleSetDataInformation = (
    dataInformation: DataInformationInterface
  ) => {
    setDataInformation(dataInformation);
  };

  const clearInformation = () => {
    setEnterpriseInformation(null);
    setDataInformation(null);
  };

  const contextValue = useMemo(
    () => ({
      enterpriseInformation,
      dataInformation,
      analyticsInformation,
      handleSetEnterpriseInformation,
      handleSetDataInformation,
      handleSetAnalyticsInformation,
      clearInformation,
    }),
    [
      enterpriseInformation,
      dataInformation,
      analyticsInformation,
      handleSetEnterpriseInformation,
      handleSetDataInformation,
      handleSetAnalyticsInformation,
      clearInformation,
    ]
  );

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    console.error("Debes estar dentro del contexto de DataContext");
  }
  return context;
};