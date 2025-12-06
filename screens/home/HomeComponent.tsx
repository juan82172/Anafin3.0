import React, { useState } from "react";
import { Alert, Keyboard, Text, View } from "react-native";
import { Formik } from "formik";

import CustomFormButton from "@/components/CustomFormButton";
import CustomInput from "@/components/CustomInput";
import CustomSelect from "@/components/CustomSelect";
import { EnterpriseInformation } from "@/classes/dataClasses/DataClass";
import { InitialValuesValidationSchema } from "@/schemas/InitialValuesValidationSchema";
import { useDataContext } from "@/context/DataContext";
import CustomAlertInformative from "@/components/CustomAlertInformative";
import { router } from "expo-router";

const activityOptions = [
  { label: "Actividad de servicios", value: "service", id: "1" },
  { label: "Actividad comercial", value: "commercial", id: "2" },
];

const HomeComponent = () => {
  const [initialValues, setInitialValues] = useState<EnterpriseInformation>(
    new EnterpriseInformation()
  );
  const [isVisible, setIsVisible] = useState(false);
  const { enterpriseInformation, handleSetEnterpriseInformation } =
    useDataContext();

  const handleSubmit = (values: EnterpriseInformation) => {
    Alert.alert(
      "Guardado exitoso",
      `Dirígete a "Datos" para visualizar el estado de resultados`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Ir a datos",
          onPress: () => router.push("/StatementResults"),
          style: "destructive",
        },
      ]
    );

    const newEnterpriseInformation = new EnterpriseInformation(values);
    handleSetEnterpriseInformation(newEnterpriseInformation);
    setInitialValues(newEnterpriseInformation);
    Keyboard.dismiss();
    setIsVisible(true);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={InitialValuesValidationSchema}
      onSubmit={handleSubmit}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
      }) => (
        <View className="p-4">
          {enterpriseInformation?.enterpriseName && (
            <CustomAlertInformative
              isVisible={isVisible}
              type="warning"
              message="Si modificas este formulario, se generará nuevamente el estado de resultados."
              onDismiss={() => setIsVisible(false)}
            />
          )}

          <CustomInput
            label="NIT de la empresa"
            value={values.enterpriseNIT}
            onChangeText={handleChange("enterpriseNIT")}
            placeholder="Ingrese el NIT de la empresa"
            onBlur={handleBlur("enterpriseNIT")}
          />
          {errors.enterpriseNIT && touched.enterpriseNIT && (
            <Text className="text-red-600 mb-3">{errors.enterpriseNIT}</Text>
          )}

          <CustomInput
            label="Nombre de la empresa"
            value={values.enterpriseName}
            onChangeText={handleChange("enterpriseName")}
            placeholder="Ingrese el nombre de la empresa"
            onBlur={handleBlur("enterpriseName")}
          />
          {errors.enterpriseName && touched.enterpriseName && (
            <Text className="text-red-600 mb-3">{errors.enterpriseName}</Text>
          )}

          <CustomSelect
            label="Seleccione una opción"
            selectedValue={
              activityOptions.find(
                (item) => item.value === values.enterpriseType
              )?.label ?? null
            }
            onValueChange={handleChange("enterpriseType")}
            options={activityOptions}
          />
          {errors.enterpriseType && touched.enterpriseType && (
            <Text className="text-red-600 mb-3">{errors.enterpriseType}</Text>
          )}

          <CustomInput
            label="Año inicial"
            value={values.initialYear ? values.initialYear.toString() : ""}
            onChangeText={handleChange("initialYear")}
            onBlur={handleBlur("initialYear")}
            placeholder="Ingrese el año inicial"
            keyboardType="numeric"
          />
          {errors.initialYear && touched.initialYear && (
            <Text className="text-red-600 mb-3">{errors.initialYear}</Text>
          )}

          <CustomInput
            label="Años de información"
            value={values.years ? values.years.toString() : ""}
            onChangeText={handleChange("years")}
            onBlur={handleBlur("years")}
            placeholder="Ingrese los años de información"
            keyboardType="numeric"
          />
          {errors.years && touched.years && (
            <Text className="text-red-600 mb-3">{errors.years}</Text>
          )}

          <CustomFormButton
            onPressFunction={handleSubmit}
            textButton="Generar estado de resultados"
            isDisabled={!isValid || isVisible}
          />

          <CustomFormButton
            textButton="Indicadores Financieros"
            onPressFunction={() => router.push("/financial-indicators")}
          />
        </View>
      )}
    </Formik>
  );
};

export default HomeComponent;
