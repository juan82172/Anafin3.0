import React, { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CustomAccordion from "@/components/CustomAccordion";
import { ServiceInformation } from "@/classes/dataClasses/DataClass";
import { Formik } from "formik";
import CustomInput from "@/components/CustomInput";
import { useDataContext } from "@/context/DataContext";
import parseErrorStack from "react-native/Libraries/Core/Devtools/parseErrorStack";
interface ServiceFormComponentProps {
  date: string;
  onSubmit: (year: string, values: any) => void;
  editableForm?: boolean;
  initialData?: ServiceInformation;
  percentageValues?: boolean;
  title?: string;
  typeanalisis?: string;
}

const ServiceFormComponent: React.FC<ServiceFormComponentProps> = ({
  date,
  onSubmit,
  editableForm = true,
  initialData = new ServiceInformation(date),
  percentageValues = false,
  title,
  typeanalisis,
}) => {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const initialValues = initialData;
  const { enterpriseInformation } = useDataContext();
  const formRef = useRef<any>(null);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
    } else {
      formRef.current?.resetForm({ values: new ServiceInformation(date) });
    }
  }, [enterpriseInformation]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  const [showsubtotal, setShowsubtotal] = useState(false);
  const [showvariA, setShowvariA] = useState(false);
  const [showmatrizac, setShowmatrizac] = useState(false);
  const calculateValues = (values: any, setFieldValues: any) => {

    const subpatrim = parseFloat(values.capitalsp) + parseFloat(values.aportess) + parseFloat(values.capitapn)
      + parseFloat(values.reservasl) + parseFloat(values.otrasres) + parseFloat(values.utiliejer)
      - parseFloat(values.perdidaeje) + parseFloat(values.utiliacumula);
    console.log("perdida ejercicio: ", values.perdidaeje);
    console.log("subtotal patrimonio: ", values.subpatrim);

    const subpalarp = parseFloat(values.oflpbanco) + parseFloat(values.oflpoenti);

    const subpascorr = parseFloat(values.obficb) + parseFloat(values.obficonoen) + parseFloat(values.otrobli)
      + parseFloat(values.cuenporpa) + parseFloat(values.cosgasp) + parseFloat(values.dividenparti)
      + parseFloat(values.retenfue) + parseFloat(values.iva) + parseFloat(values.impuesto)
      + parseFloat(values.obligacionlabo) + parseFloat(values.ingresosrecibi);

    const subtoact = parseFloat(values.patentes) + parseFloat(values.knowhow) + parseFloat(values.diferidos) + parseFloat(values.amortiza)
      + parseFloat(values.invertvlargo) + parseFloat(values.otrosa);

    const subppea = parseFloat(values.Terrenosac) + parseFloat(values.construccion) + parseFloat(values.equiofic) + parseFloat(values.equipocompu)
      + parseFloat(values.laboratorio) + parseFloat(values.flotatransporte) - parseFloat(values.depreacumula);

    const subactcorr =
      parseFloat(values.cajaac) + parseFloat(values.bancos) + parseFloat(values.inversiontv) + parseFloat(values.deudorclien) - parseFloat(values.provisiondeudor);

    const totalactias = subactcorr + subppea + subtoact;
    console.log("subtotal patrimonio antes de totalfinanzas: ", values.subpatrim);
    const totalfinanas = subpascorr + subpalarp + subpatrim;
    console.log("totalfinanzas: ", values.subpatrim);

    const grossSales =
      parseFloat(values.creditIncome) + parseFloat(values.cashIncome);

    const operatingProfit =
      grossSales -
      parseFloat(values.operatingSalesExpenses) -
      parseFloat(values.administrativeOperatingExpenses);

    const profitBeforeTax =
      operatingProfit +
      parseFloat(values.financialIncome) -
      parseFloat(values.financialExpenses) +
      parseFloat(values.extraordinaryIncome) -
      parseFloat(values.extraordinaryExpenses);

    const incomeTax = Math.ceil(profitBeforeTax * 0.35);
    const netIncome = profitBeforeTax - incomeTax;

    setFieldValues("grossSales", grossSales);
    setFieldValues("operatingProfit", operatingProfit);
    setFieldValues("profitBeforeTax", profitBeforeTax);
    setFieldValues("incomeTax", incomeTax);
    setFieldValues("netIncome", netIncome);
    setFieldValues("subactcorr", subactcorr);
    setFieldValues("subppea", subppea);
    setFieldValues("subtoact", subtoact);
    setFieldValues("subpascorr", subpascorr);
    setFieldValues("subpalarp", subpalarp);
    setFieldValues("subpatrim", subpatrim);
    setFieldValues("totalactias", totalactias);
    setFieldValues("totalfinanas", totalfinanas);
  };

  return (
    <CustomAccordion
      title={title ?? `Formulario del ${date}`}
      isOpen={isOpen}
      onToggle={toggleAccordion}
    >
      <View>
        <Formik
          innerRef={formRef}
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={(values) => {
            onSubmit(date, values);
            toggleAccordion();
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
          }) => {
            return (
              <View className="p-6">
                <View className="border-b border-neutral-200 mb-2">
                  <View className="border-b border-neutral-200 mb-2">
                    <Text className="text-[18px] font-bold mb-4 self-center">
                      Datos estado de resultados
                    </Text>
                  </View>
                  <CustomInput
                    label="Ingresos a Crédito"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.creditIncome.toString()}
                    onChangeText={(value) => {
                      setFieldValue("creditIncome", value);
                      calculateValues(
                        { ...values, creditIncome: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("creditIncome")}
                    editable={editableForm}
                  />
                  <CustomInput
                    label="Ingresos en Efectivo"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.cashIncome.toString()}
                    onChangeText={(value) => {
                      setFieldValue("cashIncome", value);
                      calculateValues(
                        { ...values, cashIncome: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("cashIncome")}
                    editable={editableForm}
                  />
                  <CustomInput
                    label="Ingresos netos"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.grossSales.toString()}
                    onChangeText={handleChange("grossSales")}
                    onBlur={handleBlur("grossSales")}
                    editable={false}
                    style={{
                      backgroundColor: "#bbdefb", // Azul más fuerte (Material Blue 100)
                      borderColor: "#1976d2",     // Azul profundo para el borde
                      color: "#0d47a1",           // Azul oscuro para el texto
                      fontWeight: "bold",
                    }}
                  />
                </View>
                <View className="border-b border-neutral-200 mb-2">
                  <CustomInput
                    label="Gastos Operacionales de Ventas"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.operatingSalesExpenses.toString()}
                    onChangeText={(value) => {
                      setFieldValue("operatingSalesExpenses", value);
                      calculateValues(
                        { ...values, operatingSalesExpenses: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("operatingSalesExpenses")}
                    editable={editableForm}
                  />
                  <CustomInput
                    label="Gastos Operacionales de Administración"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.administrativeOperatingExpenses.toString()}
                    onChangeText={(value) => {
                      setFieldValue("administrativeOperatingExpenses", value);
                      calculateValues(
                        { ...values, administrativeOperatingExpenses: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("administrativeOperatingExpenses")}
                    editable={editableForm}
                  />
                  <CustomInput
                    label="Utilidad Operacional"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.operatingProfit.toString()}
                    onChangeText={handleChange("operatingProfit")}
                    onBlur={handleBlur("operatingProfit")}
                    editable={false}
                    style={{
                      backgroundColor: "#bbdefb", // Azul más fuerte (Material Blue 100)
                      borderColor: "#1976d2",     // Azul profundo para el borde
                      color: "#0d47a1",           // Azul oscuro para el texto
                      fontWeight: "bold",
                    }}
                  />
                </View>
                <View className="border-b border-neutral-200 mb-2">
                  <CustomInput
                    label="Ingresos Financieros"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.financialIncome.toString()}
                    onChangeText={(value) => {
                      setFieldValue("financialIncome", value);
                      calculateValues(
                        { ...values, financialIncome: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("financialIncome")}
                    editable={editableForm}
                  />
                  <CustomInput
                    label="Gastos Financieros"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.financialExpenses.toString()}
                    onChangeText={(value) => {
                      setFieldValue("financialExpenses", value);
                      calculateValues(
                        { ...values, financialExpenses: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("financialExpenses")}
                    editable={editableForm}
                  />
                  <CustomInput
                    label="Ingresos Extraordinarios"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.extraordinaryIncome.toString()}
                    onChangeText={(value) => {
                      setFieldValue("extraordinaryIncome", value);
                      calculateValues(
                        { ...values, extraordinaryIncome: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("extraordinaryIncome")}
                    editable={editableForm}
                  />
                  <CustomInput
                    label="Gastos Extraordinarios"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.extraordinaryExpenses.toString()}
                    onChangeText={(value) => {
                      setFieldValue("extraordinaryExpenses", value);
                      calculateValues(
                        { ...values, extraordinaryExpenses: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("extraordinaryExpenses")}
                    editable={editableForm}
                  />
                  <CustomInput
                    label="Utilidad Antes de Impuestos"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.profitBeforeTax.toString()}
                    onChangeText={handleChange("profitBeforeTax")}
                    onBlur={handleBlur("profitBeforeTax")}
                    editable={false}
                    style={{
                      backgroundColor: "#bbdefb", // Azul más fuerte (Material Blue 100)
                      borderColor: "#1976d2",     // Azul profundo para el borde
                      color: "#0d47a1",           // Azul oscuro para el texto 
                      fontWeight: "bold",
                    }}
                  />
                </View>
                <View className="border-b border-neutral-200 mb-2">
                  <CustomInput
                    label="Impuesto a la Renta"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.incomeTax.toString()}
                    onChangeText={handleChange("incomeTax")}
                    onBlur={handleBlur("incomeTax")}
                    editable={false}
                    style={{
                      backgroundColor: "#bbdefb", // Azul más fuerte (Material Blue 100)
                      borderColor: "#1976d2",     // Azul profundo para el borde
                      color: "#0d47a1",           // Azul oscuro para el texto
                      fontWeight: "bold",
                    }}
                  />
                  <CustomInput
                    label="Utilidad del Ejercicio"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.netIncome.toString()}
                    onChangeText={handleChange("netIncome")}
                    onBlur={handleBlur("netIncome")}
                    editable={false}
                    style={{
                      backgroundColor: "#bbdefb", // Azul más fuerte (Material Blue 100)
                      borderColor: "#1976d2",     // Azul profundo para el borde
                      color: "#0d47a1",           // Azul oscuro para el texto 
                      fontWeight: "bold",
                    }}
                  />
                </View>
                <View className="border-b border-neutral-200 mb-2">
                  <Text className="text-[18px] font-bold mb-4 self-center">
                    Datos balance general
                  </Text>
                </View>
                <View className="border-b border-neutral-200 mb-2">
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variacion Absoluta Caja"
                      inputType={"currency"}
                      value={values.cajaacva.toString()}
                      onChangeText={handleChange("cajaacva")}
                      onBlur={handleBlur("cajaacva")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro 
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde 
                        color: "#f57f17",           // Amarillo oscuro para el texto 

                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CustomInput
                    label="Caja"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.cajaac.toString()}
                    onChangeText={(value) => {
                      setFieldValue("cajaac", value);
                      calculateValues(
                        { ...values, cajaac: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("cajaac")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Caja Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.cajasubtotal.toString()}
                      onChangeText={handleChange("cajasubtotal")}
                      editable={false}
                      onBlur={handleBlur("cajasubtotal")}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro 
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde
                        color: "#f57f17",           // Amarillo oscuro para el texto
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variacion Absoluta Bancos"
                      inputType={"currency"}
                      value={values.bancosva.toString()}
                      onChangeText={handleChange("bancosva")}
                      onBlur={handleBlur("bancosva")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde 
                        color: "#f57f17",           // Amarillo oscuro para el texto 
                        fontWeight: "bold",
                      }}
                    />
                  )}

                  <CustomInput
                    label="Bancos"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.bancos.toString()}
                    onChangeText={(value) => {
                      setFieldValue("bancos", value);
                      calculateValues(
                        { ...values, bancos: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("bancos")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Bancos Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.bancossubtotal.toString()}
                      onChangeText={handleChange("bancossubtotal")}
                      editable={false}
                      onBlur={handleBlur("bancossubtotal")}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro 
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde 
                        color: "#f57f17",           // Amarillo oscuro para el texto
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variación Absoluta Inversiones en Títulos Valores"
                      inputType={"currency"}
                      value={values.inversiontvva.toString()}
                      onChangeText={handleChange("inversiontvva")}
                      onBlur={handleBlur("inversiontvva")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro 
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde 
                        color: "#f57f17",           // Amarillo oscuro para el texto 
                        fontWeight: "bold",
                      }}
                    />
                  )}

                  <CustomInput
                    label="Inversiones en Titulos Valores de Corto Plazo"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.inversiontv.toString()}
                    onChangeText={(value) => {
                      setFieldValue("inversiontv", value);
                      calculateValues(
                        { ...values, inversiontv: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("inversiontv")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Inversiones en Titulos.. Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.invervitsubtotal.toString()}
                      onChangeText={handleChange("invervitsubtotal")}
                      editable={false}
                      onBlur={handleBlur("invervitsubtotal")}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde
                        color: "#f57f17",           // Amarillo oscuro para el texto 
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variación Absoluta Deudores por Ventas"
                      inputType="currency"
                      value={values.deudorclienva.toString()}
                      onChangeText={handleChange("deudorclienva")}
                      onBlur={handleBlur("deudorclienva")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro 
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde 
                        color: "#f57f17",           // Amarillo oscuro para el texto 
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CustomInput
                    label="Deudores Clientes o Cuentas por Cobrar o Cartera"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.deudorclien.toString()}
                    onChangeText={(value) => {
                      setFieldValue("deudorclien", value);
                      calculateValues(
                        { ...values, deudorclien: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("deudorclien")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Deudores Clientes Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.deudorclsubtotal.toString()}
                      onChangeText={handleChange("deudorclsubtotal")}
                      editable={false}
                      onBlur={handleBlur("deudorclsubtotal")}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro 
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde 
                        color: "#f57f17",           // Amarillo oscuro para el texto 
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variación Absoluta Provisión de Deudores"
                      inputType="currency"
                      value={values.provisiondeudorva.toString()}
                      onChangeText={handleChange("provisiondeudorva")}
                      onBlur={handleBlur("provisiondeudorva")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CustomInput
                    label="Provision Deudores-Clientes o Cuentas por Cobrar o Cartera"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.provisiondeudor.toString()}
                    onChangeText={(value) => {
                      setFieldValue("provisiondeudor", value);
                      calculateValues(
                        { ...values, provisiondeudor: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("provisiondeudor")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Provision Deudores Clientes Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.provisionsubtot.toString()}
                      onChangeText={handleChange("provisionsubtot")}
                      editable={false}
                      onBlur={handleBlur("provisionsubtot")}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variación Absoluta Subtotal Activo Corriente"
                      inputType="currency"
                      value={values.subactcorrva.toString()}
                      onChangeText={handleChange("subactcorrva")}
                      onBlur={handleBlur("subactcorrva")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CustomInput
                    label="Subtotal Activo Corriente"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.subactcorr.toString()}
                    onChangeText={handleChange("subtotal activo corriente")}
                    onBlur={handleBlur("subactcorr")}
                    editable={false}
                    style={{
                      backgroundColor: "#bbdefb", // Azul más fuerte (Material Blue 100)
                      borderColor: "#1976d2",     // Azul profundo para el borde
                      color: "#0d47a1",           // Azul oscuro para el texto 
                      fontWeight: "bold",
                    }}

                  />
                </View>

                <View className="border-b border-neutral-200 mb-2">
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variación Absoluta Terrenos"
                      inputType="currency"
                      value={values.Terrenosacva.toString()}
                      onChangeText={handleChange("Terrenosacva")}
                      onBlur={handleBlur("Terrenosacva")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CustomInput
                    label="Terrenos"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.Terrenosac.toString()}
                    onChangeText={(value) => {
                      setFieldValue("Terrenosac", value);
                      calculateValues(
                        { ...values, Terrenosac: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("Terrenosac")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Terrenos Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.terrenosubtot.toString()}
                      onChangeText={handleChange("terrenosubtot")}
                      editable={false}
                      onBlur={handleBlur("terrenosubtot")}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variación Absoluta Construcción"
                      inputType="currency"
                      value={values.construccionva.toString()}
                      onChangeText={handleChange("construccionva")}
                      onBlur={handleBlur("construccionva")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CustomInput
                    label="Construcciones Y Edificaciones"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.construccion.toString()}
                    onChangeText={(value) => {
                      setFieldValue("construccion", value);
                      calculateValues(
                        { ...values, construccion: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("construccion")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Construcciones Y Edificaciones Deudores Clientes Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.construccisubt.toString()}
                      onChangeText={handleChange("construccisubt")}
                      editable={false}
                      onBlur={handleBlur("construccisubt")}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variación Absoluta Equipo Oficina"
                      inputType="currency"
                      value={values.equioficva.toString()}
                      onChangeText={handleChange("equioficva")}
                      onBlur={handleBlur("equioficva")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CustomInput
                    label="Equipo de Oficina"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.equiofic.toString()}
                    onChangeText={(value) => {
                      setFieldValue("equiofic", value);
                      calculateValues(
                        { ...values, equiofic: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("equiofic")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Equipo de Oficina Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.equiofisubt.toString()}
                      onChangeText={handleChange("equiofisubt")}
                      editable={false}
                      onBlur={handleBlur("equiofisubt")}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}

                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variación Absoluta Equipo de Computación"
                      inputType="currency"
                      value={values.equipocompuva.toString()}
                      onChangeText={handleChange("equipocompuva")}
                      onBlur={handleBlur("equipocompuva")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CustomInput
                    label="Equipo de Computacion y Comunicaciones"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.equipocompu.toString()}
                    onChangeText={(value) => {
                      setFieldValue("equipocompu", value);
                      calculateValues(
                        { ...values, equipocompu: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("equipocompu")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Equipo de Computaciòn Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.equipocomsubt.toString()}
                      onChangeText={handleChange("equipocomsubt")}
                      editable={false}
                      onBlur={handleBlur("equipocomsubt")}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variación Absoluta Laboratorio"
                      inputType="currency"
                      value={values.laboratoriova.toString()}
                      onChangeText={handleChange("laboratoriova")}
                      onBlur={handleBlur("laboratoriova")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CustomInput
                    label="laboratorios"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.laboratorio.toString()}
                    onChangeText={(value) => {
                      setFieldValue("laboratorio", value);
                      calculateValues(
                        { ...values, laboratorio: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("laboratorio")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="laboratorio Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.laborasubt.toString()}
                      onChangeText={handleChange("laborasubt")}
                      editable={false}
                      onBlur={handleBlur("laborasubt")}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variación Absoluta Flota y Equipo de Transporte"
                      inputType="currency"
                      value={values.flotatransporteva.toString()}
                      onChangeText={handleChange("flotatransporteva")}
                      onBlur={handleBlur("flotatransporteva")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CustomInput
                    label="Flota y Equipo de Transporte"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.flotatransporte.toString()}
                    onChangeText={(value) => {
                      setFieldValue("flotatransporte", value);
                      calculateValues(
                        { ...values, flotatransporte: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("flotatransporte")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Flota y Equipo de Transporte Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.flotatrasubtot.toString()}
                      onChangeText={handleChange("flotatrasubtot")}
                      editable={false}
                      onBlur={handleBlur("flotatrasubtot")}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variación Absoluta Depreciación Acumulada"
                      inputType="currency"
                      value={values.depreacumulava.toString()}
                      onChangeText={handleChange("depreacumulava")}
                      onBlur={handleBlur("depreacumulava")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CustomInput
                    label="Depreciacion Acumulada"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.depreacumula.toString()}
                    onChangeText={(value) => {
                      setFieldValue("depreacumula", value);
                      calculateValues(
                        { ...values, depreacumula: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("depreacumula")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Depreciaciòn Acumulada Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.depreasubt.toString()}
                      onChangeText={handleChange("depreasubt")}
                      editable={false}
                      onBlur={handleBlur("depreasubt")}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variación Absoluta Subtotal Propiedad,Planta,Equipo y Activo Fijo"
                      inputType="currency"
                      value={values.subppeava.toString()}
                      onChangeText={handleChange("subppeava")}
                      onBlur={handleBlur("subppeava")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CustomInput
                    label="Subtotal Propiedad,Planta,Equipo y Activo Fijo"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.subppea.toString()}
                    onChangeText={handleChange("subppea")}
                    onBlur={handleBlur("subppea")}
                    editable={false}
                    style={{
                      backgroundColor: "#bbdefb", // Azul más fuerte (Material Blue 100)
                      borderColor: "#1976d2",     // Azul profundo para el borde
                      color: "#0d47a1",           // Azul oscuro para el texto 
                      fontWeight: "bold",
                    }}
                  />
                </View>

                <View className="border-b border-neutral-200 mb-2">
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variación Absoluta Patentes"
                      inputType="currency"
                      value={values.patentesva.toString()}
                      onChangeText={handleChange("patentesva")}
                      onBlur={handleBlur("patentesva")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CustomInput
                    label="Patentes"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.patentes.toString()}
                    onChangeText={(value) => {
                      setFieldValue("patentes", value);
                      calculateValues(
                        { ...values, patentes: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("patentes")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Patentes Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.patentsubt.toString()}
                      onChangeText={handleChange("patentsubt")}
                      editable={false}
                      onBlur={handleBlur("patentsubt")}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variación Absoluta Know How"
                      inputType="currency"
                      value={values.knowhowva.toString()}
                      onChangeText={handleChange("knowhowva")}
                      onBlur={handleBlur("knowhowva")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CustomInput
                    label="Know How"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.knowhow.toString()}
                    onChangeText={(value) => {
                      setFieldValue("knowhow", value);
                      calculateValues(
                        { ...values, knowhow: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("knowhow")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Know How Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.knowsubtot.toString()}
                      onChangeText={handleChange("knowsubtot")}
                      editable={false}
                      onBlur={handleBlur("knowsubtot")}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variación Absoluta Diferidos"
                      inputType="currency"
                      value={values.diferidosva.toString()}
                      onChangeText={handleChange("diferidosva")}
                      onBlur={handleBlur("diferidosva")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CustomInput
                    label="Diferidos"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.diferidos.toString()}
                    onChangeText={(value) => {
                      setFieldValue("diferidos", value);
                      calculateValues(
                        { ...values, diferidos: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("diferidos")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Diferidos Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.diferisubt.toString()}
                      onChangeText={handleChange("diferisubt")}
                      editable={false}
                      onBlur={handleBlur("diferisubt")}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variación Absoluta Amortización"
                      inputType="currency"
                      value={values.amortizava.toString()}
                      onChangeText={handleChange("amortizava")}
                      onBlur={handleBlur("amortizava")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CustomInput
                    label="Amortizaciones"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.amortiza.toString()}
                    onChangeText={(value) => {
                      setFieldValue("amortiza", value);
                      calculateValues(
                        { ...values, amortiza: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("amortiza")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Amortizaciones Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.amortizasubtot.toString()}
                      onChangeText={handleChange("amortizasubtot")}
                      editable={false}
                      onBlur={handleBlur("amortizasubtot")}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variación Absoluta Inversiones Largo Plazo"
                      inputType="currency"
                      value={values.invertvlargova.toString()}
                      onChangeText={handleChange("invertvlargova")}
                      onBlur={handleBlur("invertvlargova")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CustomInput
                    label="Inversiones en Titulos Valores de Largo Plazo"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.invertvlargo.toString()}
                    onChangeText={(value) => {
                      setFieldValue("invertvlargo", value);
                      calculateValues(
                        { ...values, invertvlargo: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("invertvlargo")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Inversiones en Titulos Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.inversionsubto.toString()}
                      onChangeText={handleChange("inversionsubto")}
                      editable={false}
                      onBlur={handleBlur("inversionsubto")}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variación Absoluta Otros Activos"
                      inputType="currency"
                      value={values.otrosava.toString()}
                      onChangeText={handleChange("otrosava")}
                      onBlur={handleBlur("otrosava")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CustomInput
                    label="Otros Activos"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.otrosa.toString()}
                    onChangeText={(value) => {
                      setFieldValue("otrosa", value);
                      calculateValues(
                        { ...values, otrosa: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("otrosa")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Otros Activos Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.otrosacsubt.toString()}
                      onChangeText={handleChange("otrosacsubt")}
                      editable={false}
                      onBlur={handleBlur("otrosacsubt")}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variación Absoluta Subtotal Otros Activos"
                      inputType="currency"
                      value={values.subtoactva.toString()}
                      onChangeText={handleChange("subtoactva")}
                      onBlur={handleBlur("subtoactva")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CustomInput
                    label="Subtotal Otros Activos"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.subtoact.toString()}
                    onChangeText={handleChange("subtoact")}
                    onBlur={handleBlur("subtoact")}
                    editable={false}
                    style={{
                      backgroundColor: "#bbdefb", // Azul más fuerte (Material Blue 100)
                      borderColor: "#1976d2",     // Azul profundo para el borde
                      color: "#0d47a1",           // Azul oscuro para el texto
                      fontWeight: "bold",
                    }}
                  />
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variación Absoluta Total Inversion"
                      inputType="currency"
                      value={values.totalactiasva.toString()}
                      onChangeText={handleChange("totalactiasva")}
                      onBlur={handleBlur("totalactiasva")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CustomInput
                    label="Total Inversion"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.totalactias.toString()}
                    onChangeText={handleChange("totalactias")}
                    onBlur={handleBlur("totalactias")}
                    editable={false}
                    style={{
                      backgroundColor: "#c8e6c9", // Verde claro (Material Green 100)
                      borderColor: "#388e3c",     // Verde intenso para el borde (Material Green 700)
                      color: "#1b5e20",           // Verde oscuro para el texto
                      fontWeight: "bold",
                    }}

                  />

                </View>

                <View className="border-b border-neutral-200 mb-2">
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variación Absoluta Obligaciones Financieras Con Bancos"
                      inputType="currency"
                      value={values.obficbva.toString()}
                      onChangeText={handleChange("obficbva")}
                      onBlur={handleBlur("obficbva")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CustomInput
                    label="Obligaciones Financieras Con Bancos"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.obficb.toString()}
                    onChangeText={(value) => {
                      setFieldValue("obficb", value);
                      calculateValues(
                        { ...values, obficb: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("obficb")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Obligaciones Financieras Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.ofcbacsubt.toString()}
                      onChangeText={handleChange("ofcbacsubt")}
                      editable={false}
                      onBlur={handleBlur("ofcbacsubt")}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variación Absoluta con Otras Entidades Crediticias"
                      inputType="currency"
                      value={values.obficonoenva.toString()}
                      onChangeText={handleChange("obficonoenva")}
                      onBlur={handleBlur("obficonoenva")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CustomInput
                    label="Obligaciones Financieras Con otras Entidades Crediticias"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.obficonoen.toString()}
                    onChangeText={(value) => {
                      setFieldValue("obficonoen", value);
                      calculateValues(
                        { ...values, obficonoen: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("obficonoen")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Obligaciones Financieras Con otras Entidades Crediticias subtotal "
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.ofcoesubt.toString()}
                      onChangeText={handleChange("ofcoesubt")}
                      editable={false}
                      onBlur={handleBlur("ofcoesubt")}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variación Absoluta Otras Obligaciones o Acreedores Varios"
                      inputType="currency"
                      value={values.otrobliva.toString()}
                      onChangeText={handleChange("otrobliva")}
                      onBlur={handleBlur("otrobliva")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CustomInput
                    label="Otras Obligaciones o Acreedores Varios"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.otrobli.toString()}
                    onChangeText={(value) => {
                      setFieldValue("otrobli", value);
                      calculateValues(
                        { ...values, otrobli: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("otrobli")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Acreedores Varios Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.obliasubt.toString()}
                      onChangeText={handleChange("obliasubt")}
                      editable={false}
                      onBlur={handleBlur("obliasubt")}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variación Absoluta Cuentas Por Pagar"
                      inputType="currency"
                      value={values.cuenporpava.toString()}
                      onChangeText={handleChange("cuenporpava")}
                      onBlur={handleBlur("cuenporpava")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CustomInput
                    label="Cuentas Por Pagar "
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.cuenporpa.toString()}
                    onChangeText={(value) => {
                      setFieldValue("cuenporpa", value);
                      calculateValues(
                        { ...values, cuenporpa: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("cuenporpa")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Cuentas Por Pagar Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.cuenpsubt.toString()}
                      onChangeText={handleChange("cuenpsubt")}
                      editable={false}
                      onBlur={handleBlur("cuenpsubt")}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variación Absoluta Costos y Gastos por Pagar"
                      inputType="currency"
                      value={values.cosgaspva.toString()}
                      onChangeText={handleChange("cosgaspva")}
                      onBlur={handleBlur("cosgaspva")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CustomInput
                    label="Costos y Gastos por Pagar"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.cosgasp.toString()}
                    onChangeText={(value) => {
                      setFieldValue("cosgasp", value);
                      calculateValues(
                        { ...values, cosgasp: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("cosgasp")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Costos y Gastos por Pagar Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.cosgasubt.toString()}
                      onChangeText={handleChange("cosgasubt")}
                      editable={false}
                      onBlur={handleBlur("cosgasubt")}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variación Absoluta Dividendos o Participaciones por Pagar"
                      inputType="currency"
                      value={values.dividenpartiva.toString()}
                      onChangeText={handleChange("dividenpartiva")}
                      onBlur={handleBlur("dividenpartiva")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CustomInput
                    label="Dividendos o Participaciones Por Pagar"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.dividenparti.toString()}
                    onChangeText={(value) => {
                      setFieldValue("dividenparti", value);
                      calculateValues(
                        { ...values, dividenparti: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("dividenparti")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Dividendos O Participaciones Por Pagar Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.dividensubt.toString()}
                      onChangeText={handleChange("dividensubt")}
                      editable={false}
                      onBlur={handleBlur("dividensubt")}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variación Absoluta Retenciones En La Fuente"
                      inputType="currency"
                      value={values.retenfueva.toString()}
                      onChangeText={handleChange("retenfueva")}
                      onBlur={handleBlur("retenfueva")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CustomInput
                    label="Retencion En La Fuente"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.retenfue.toString()}
                    onChangeText={(value) => {
                      setFieldValue("retenfue", value);
                      calculateValues(
                        { ...values, retenfue: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("retenfue")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Retencion en la Fuente Varios Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.retenfsubt.toString()}
                      onChangeText={handleChange("retenfsubt")}
                      editable={false}
                      onBlur={handleBlur("retenfsubt")}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variación Absoluta IVA Por Pagar"
                      inputType="currency"
                      value={values.ivava.toString()}
                      onChangeText={handleChange("ivava")}
                      onBlur={handleBlur("ivava")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CustomInput
                    label="Iva"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.iva.toString()}
                    onChangeText={(value) => {
                      setFieldValue("iva", value);
                      calculateValues(
                        { ...values, iva: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("iva")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="iva Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.ivasubt.toString()}
                      onChangeText={handleChange("ivasubt")}
                      editable={false}
                      onBlur={handleBlur("ivasubt")}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variación Absoluta Impuesto Por Pagar"
                      inputType="currency"
                      value={values.impuestova.toString()}
                      onChangeText={handleChange("impuestova")}
                      onBlur={handleBlur("impuestova")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CustomInput
                    label="Impuesto a la Renta"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.impuesto.toString()}
                    onChangeText={(value) => {
                      setFieldValue("impuesto", value);
                      calculateValues(
                        { ...values, impuesto: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("impuesto")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Impuesto a la Renta Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.impuestsubt.toString()}
                      onChangeText={handleChange("impuestsubt")}
                      editable={false}
                      onBlur={handleBlur("impuestsubt")}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variación Absoluta Obligaciones Laborales"
                      inputType="currency"
                      value={values.obligacionlabova.toString()}
                      onChangeText={handleChange("obligacionlabova")}
                      onBlur={handleBlur("obligacionlabova")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CustomInput
                    label="Obligaciones Laborales"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.obligacionlabo.toString()}
                    onChangeText={(value) => {
                      setFieldValue("obligacionlabo", value);
                      calculateValues(
                        { ...values, obligacionlabo: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("obligacionlabo")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Obligaciones Laborales Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.oblisubt.toString()}
                      onChangeText={handleChange("oblisubt")}
                      editable={false}
                      onBlur={handleBlur("oblisubt")}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variación Absoluta Ingresos Recibidos Por Anticipado"
                      inputType="currency"
                      value={values.ingresosrecibiva.toString()}
                      onChangeText={handleChange("ingresosrecibiva")}
                      onBlur={handleBlur("ingresosrecibiva")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CustomInput
                    label="Ingresos Recibidos Por Anticipado"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.ingresosrecibi.toString()}
                    onChangeText={(value) => {
                      setFieldValue("ingresosrecibi", value);
                      calculateValues(
                        { ...values, ingresosrecibi: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("ingresosrecibi")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Ingresos Recibidos Por Anticipado Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.ingressubt.toString()}
                      onChangeText={handleChange("ingressubt")}
                      editable={false}
                      onBlur={handleBlur("ingressubt")}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variación Absoluta Subtotal Pasivo Corriente"
                      inputType="currency"
                      value={values.subpascorrva.toString()}
                      onChangeText={handleChange("subpascorrva")}
                      onBlur={handleBlur("subpascorrva")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CustomInput
                    label="Subtotal Pasivo Corriente"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.subpascorr.toString()}
                    onChangeText={handleChange("subtotal pasivo corriente")}
                    onBlur={handleBlur("subpascorr")}
                    editable={false}
                    style={{
                      backgroundColor: "#bbdefb", // Azul más fuerte (Material Blue 100)
                      borderColor: "#1976d2",     // Azul profundo para el borde
                      color: "#0d47a1",           // Azul oscuro para el texto 
                      fontWeight: "bold",
                    }}
                  />
                </View>

                <View className="border-b border-neutral-200 mb-2">
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variación Absoluta Obligaciones Financieras De Largo Plazo Con Bancos"
                      inputType="currency"
                      value={values.oflpbancova.toString()}
                      onChangeText={handleChange("oflpbancova")}
                      onBlur={handleBlur("oflpbancova")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CustomInput
                    label="Obligaciones Financieras de Largo Plazo con Bancos"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.oflpbanco.toString()}
                    onChangeText={(value) => {
                      setFieldValue("oflpbanco", value);
                      calculateValues(
                        { ...values, oflpbanco: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("oflpbanco")}
                    editable={editableForm}
                  />

                  {showsubtotal && (
                    <CustomInput
                      label="Obligaciones Financieras de Largo Plazo Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.oflpsubto.toString()}
                      onChangeText={handleChange("oflpsubto")}
                      editable={false}
                      onBlur={handleBlur("oflpsubto")}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variación Absoluta Obligaciones Financieras de Largo Plazo con Otras Entidades Crediticias"
                      inputType="currency"
                      value={values.oflsubtva.toString()}
                      onChangeText={handleChange("oflsubtva")}
                      onBlur={handleBlur("oflsubtva")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CustomInput
                    label="Obligaciones Financieras de Largo Plazo con Otras Entidades Crediticias"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.oflpoenti.toString()}
                    onChangeText={(value) => {
                      setFieldValue("oflpoenti", value);
                      calculateValues(
                        { ...values, oflpoenti: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("oflpoenti")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Obligaciones Financieras de Largo Plazo Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.oflsubt.toString()}
                      onChangeText={handleChange("oflsubt")}
                      editable={false}
                      onBlur={handleBlur("oflsubt")}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variación Absoluta Subtotal Pasivo de Largo Plazo"
                      inputType="currency"
                      value={values.subpalarpva.toString()}
                      onChangeText={handleChange("subpalarpva")}
                      onBlur={handleBlur("subpalarpva")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CustomInput
                    label="Subtotal Pasivo de Largo Plazo"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.subpalarp.toString()}
                    onChangeText={handleChange("subpalarp")}
                    onBlur={handleBlur("subpalarp")}
                    editable={false}
                    style={{
                      backgroundColor: "#bbdefb", // Azul más fuerte (Material Blue 100)
                      borderColor: "#1976d2",     // Azul profundo para el borde
                      color: "#0d47a1",           // Azul oscuro para el texto 
                      fontWeight: "bold",
                    }}
                  />
                </View>

                <View className="border-b border-neutral-200 mb-2">
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variación Absoluta Capital Subscrito y Pagado"
                      inputType="currency"
                      value={values.capitalspva.toString()}
                      onChangeText={handleChange("capitalspva")}
                      onBlur={handleBlur("capitalspva")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CustomInput
                    label="Capital Subscrito y Pagado"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.capitalsp.toString()}
                    onChangeText={(value) => {
                      setFieldValue("capitalsp", value);
                      calculateValues(
                        { ...values, capitalsp: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("capitalsp")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Capital Suscrito y Pagado Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.casuysubt.toString()}
                      onChangeText={handleChange("casuysubt")}
                      editable={false}
                      onBlur={handleBlur("casuysubt")}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variación Absoluta Aportes Sociales"
                      inputType="currency"
                      value={values.aportessva.toString()}
                      onChangeText={handleChange("aportessva")}
                      onBlur={handleBlur("aportessva")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CustomInput
                    label="Aportes Sociales"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.aportess.toString()}
                    onChangeText={(value) => {
                      setFieldValue("aportess", value);
                      calculateValues(
                        { ...values, aportess: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("aportess")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Aportes Sociales Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.aportsubt.toString()}
                      onChangeText={handleChange("aportsubt")}
                      editable={false}
                      onBlur={handleBlur("aportsubt")}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variación Absoluta Capital de Personas Naturales"
                      inputType="currency"
                      value={values.capitapnva.toString()}
                      onChangeText={handleChange("capitapnva")}
                      onBlur={handleBlur("capitapnva")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CustomInput
                    label="Capital de Personas Naturales"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.capitapn.toString()}
                    onChangeText={(value) => {
                      setFieldValue("capitapn", value);
                      calculateValues(
                        { ...values, capitapn: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("capitapn")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Capital de Personas Naturales Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.capesubt.toString()}
                      onChangeText={handleChange("capesubt")}
                      editable={false}
                      onBlur={handleBlur("capesubt")}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variación Absoluta Reservas Legales"
                      inputType="currency"
                      value={values.reservaslva.toString()}
                      onChangeText={handleChange("reservaslva")}
                      onBlur={handleBlur("reservaslva")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CustomInput
                    label="Reservas Legales"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.reservasl.toString()}
                    onChangeText={(value) => {
                      setFieldValue("reservasl", value);
                      calculateValues(
                        { ...values, reservasl: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("reservasl")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Reservas Legales Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.resersubt.toString()}
                      onChangeText={handleChange("resersubt")}
                      editable={false}
                      onBlur={handleBlur("resersubt")}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variación Absoluta Otras Reservas"
                      inputType="currency"
                      value={values.otrasresva.toString()}
                      onChangeText={handleChange("otrasresva")}
                      onBlur={handleBlur("otrasresva")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CustomInput
                    label="Otras Reservas"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.otrasres.toString()}
                    onChangeText={(value) => {
                      setFieldValue("otrasres", value);
                      calculateValues(
                        { ...values, otrasres: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("otrasres")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Otras Reservas Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.otrasrsubt.toString()}
                      onChangeText={handleChange("otrasrsubt")}
                      editable={false}
                      onBlur={handleBlur("otrasrsubt")}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variación Absoluta Utilidad del Ejercicio"
                      inputType="currency"
                      value={values.utiliejerva.toString()}
                      onChangeText={handleChange("utiliejerva")}
                      onBlur={handleBlur("utiliejerva")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CustomInput
                    label="Utilidad del Ejercicio"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.utiliejer.toString()}
                    onChangeText={(value) => {
                      setFieldValue("utiliejer", value);
                      calculateValues(
                        { ...values, utiliejer: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("utiliejer")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Utilidad del Ejercicio Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.utilisubt.toString()}
                      onChangeText={handleChange("utilisubt")}
                      editable={false}
                      onBlur={handleBlur("utilisubt")}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variación Absoluta Perdida del Ejercicio"
                      inputType="currency"
                      value={values.perdidaejeva.toString()}
                      onChangeText={handleChange("perdidaejeva")}
                      onBlur={handleBlur("perdidaejeva")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CustomInput
                    label="Perdida del Ejercicio"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.perdidaeje.toString()}
                    onChangeText={(value) => {
                      setFieldValue("perdidaeje", value);
                      calculateValues(
                        { ...values, perdidaeje: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("perdidaeje")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Perdida del Ejercicio Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.perdesubt.toString()}
                      onChangeText={handleChange("perdesubt")}
                      editable={false}
                      onBlur={handleBlur("perdesubt")}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variación Absoluta Utilidades Acumuladas"
                      inputType="currency"
                      value={values.utiliacumulava.toString()}
                      onChangeText={handleChange("utiliacumulava")}
                      onBlur={handleBlur("utiliacumulava")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CustomInput
                    label="Utilidades Acumuladas"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.utiliacumula.toString()}
                    onChangeText={(value) => {
                      setFieldValue("utiliacumula", value);
                      calculateValues(
                        { ...values, utiliacumula: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("utiliacumula")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Utilidades Acumuladas Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.utiliacsubt.toString()}
                      onChangeText={handleChange("utiliacsubt")}
                      editable={false}
                      onBlur={handleBlur("utiliacsubt")}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variación Absoluta Subtotal Patrimonio"
                      inputType="currency"
                      value={values.subpatrimva.toString()}
                      onChangeText={handleChange("subpatrimva")}
                      onBlur={handleBlur("subpatrimva")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CustomInput
                    label="Subtotal Patrimonio"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.subpatrim.toString()}
                    onChangeText={handleChange("subpatrim")}
                    onBlur={handleBlur("subpatrim")}
                    editable={false}
                    style={{
                      backgroundColor: "#bbdefb", // Azul más fuerte (Material Blue 100)
                      borderColor: "#1976d2",     // Azul profundo para el borde
                      color: "#0d47a1",           // Azul oscuro para el texto 
                      fontWeight: "bold",
                    }}
                  />
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variación Absoluta Total Financiacion"
                      inputType="currency"
                      value={values.totalfinanasva.toString()}
                      onChangeText={handleChange("totalfinanasva")}
                      onBlur={handleBlur("totalfinanasva")}
                      editable={editableForm}

                      style={{
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  <CustomInput
                    label="Total Financiacion"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.totalfinanas.toString()}
                    onChangeText={handleChange("totalfinanas")}
                    onBlur={handleBlur("totalfinanas")}
                    editable={false}
                    style={{
                      backgroundColor: "#c8e6c9", // Verde claro (Material Green 100)
                      borderColor: "#388e3c",     // Verde intenso para el borde (Material Green 700)
                      color: "#1b5e20",           // Verde oscuro para el texto
                      fontWeight: "bold",
                    }}

                  />
                </View>
                <View className="border-b border-neutral-200 mb-2">
                  {(values.totalactias !== 0 || values.totalfinanas !== 0) ? (
                    typeanalisis === "Horizontal" ? (
                      <TouchableOpacity
                        onPress={() => setShowvariA(!showvariA)}
                        className="p-2 bg-indigo-500 rounded-md mb-2"
                      >
                        <Text className="text-white text-center">
                          {showvariA
                            ? "Ocultar cálculo de variación absoluta"
                            : "Presentar cálculo de variación absoluta"}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => setShowsubtotal(!showsubtotal)}
                        className="p-2 bg-indigo-500 rounded-md mb-2"
                      >
                        <Text className="text-white text-center">
                          {showsubtotal
                            ? "Ocultar cálculo de subtotales"
                            : "Presentar cálculo de subtotales"}
                        </Text>
                      </TouchableOpacity>
                    )
                  ) : (
                    <Text className="text-center text-red-600 font-semibold mt-2">
                      ⚠️ No hay datos disponibles para generar calculos
                    </Text>
                  )}

                </View>
                <View className="border-b border-neutral-200 mb-2">
                  {(values.totalactias !== 0 || values.totalfinanas !== 0) ? (
                    <>
                      {typeanalisis !== "Horizontal" && (
                        <TouchableOpacity
                          onPress={() => setShowmatrizac(prev => !prev)}
                          className="p-2 bg-indigo-500 rounded-md mb-2"
                        >
                          <Text className="text-white text-center">
                            {showmatrizac
                              ? "Ocultar matriz actividad económica"
                              : "Mostrar matriz actividad económica"}
                          </Text>
                        </TouchableOpacity>
                      )}

                        {typeanalisis !== "Horizontal" && showmatrizac && (
                        <View className="border border-gray-400 p-4 bg-white rounded-md">
                          <Text className="text-lg font-bold text-center mb-2">
                            TABLA O MATRIZ ACTIVIDAD ECONÓMICA
                          </Text>
                          <Text className="text-center text-base font-semibold text-blue-700 mb-2">
                            {`AÑO ${date}`}
                          </Text>

                          {/* Bloque: ACTIVOS */}
                          <View className="flex-row border-t border-b py-2">
                            <View className="flex-1 pr-2">
                              <Text className="text-blue-600 font-semibold">ACTIVOS CORRIENTES</Text>
                              <Text>
                                {values.totalactias === 0
                                  ? "0.0%"
                                  : `${((values.subactcorr / values.totalactias) * 100).toFixed(1)}%`}
                              </Text>
                            </View>
                            <View className="flex-1 px-2">
                              <Text className="text-blue-600 font-semibold">ACTIVOS FIJOS</Text>
                              <Text>
                                {values.totalactias === 0
                                  ? "0.0%"
                                  : `${((values.subppea / values.totalactias) * 100).toFixed(1)}%`}
                              </Text>
                            </View>
                            <View className="flex-1 pl-2">
                              <Text className="text-blue-600 font-semibold">
                                INVERSIÓN OTRAS ACTIVIDADES ECONÓMICAS
                              </Text>
                              <Text>
                                {values.totalactias === 0
                                  ? "0.0%"
                                  : `${((values.subtoact / values.totalactias) * 100).toFixed(1)}%`}
                              </Text>
                            </View>
                          </View>

                          {/* Total inversión */}
                          <View className="flex-row justify-between border-b py-2 bg-indigo-100 rounded-md px-2">
                            <Text className="text-purple-700 font-bold">INVERSIÓN TOTAL</Text>
                            <Text className="text-purple-700 font-bold">
                              {values.totalactias === 0
                                ? "0.0%"
                                : `${(((values.subactcorr + values.subppea + values.subtoact) / values.totalactias) * 100).toFixed(1)}%`}
                            </Text>
                          </View>

                          {/* Bloque: FINANCIAMIENTO */}
                          <View className="flex-row border-t border-b py-2 mt-2">
                            <View className="flex-1 pr-2">
                              <Text className="text-blue-600 font-semibold">PASIVOS CORRIENTES</Text>
                              <Text>
                                {values.totalfinanas === 0
                                  ? "0.0%"
                                  : `${((values.subpascorr / values.totalfinanas) * 100).toFixed(1)}%`}
                              </Text>
                            </View>
                            <View className="flex-1 px-2">
                              <Text className="text-blue-600 font-semibold">PASIVOS LARGO PLAZO</Text>
                              <Text>
                                {values.totalfinanas === 0
                                  ? "0.0%"
                                  : `${((values.subpalarp / values.totalfinanas) * 100).toFixed(1)}%`}
                              </Text>
                            </View>
                            <View className="flex-1 pl-2">
                              <Text className="text-blue-600 font-semibold">CAPITAL SOCIAL Y PATRIMONIO</Text>
                              <Text>
                                {values.totalfinanas === 0
                                  ? "0.0%"
                                  : `${((values.subpatrim / values.totalfinanas) * 100).toFixed(1)}%`}
                              </Text>
                            </View>
                          </View>

                          {/* Total financiamiento */}
                          <View className="flex-row justify-between border-b py-2 bg-indigo-100 rounded-md px-2">
                            <Text className="text-purple-700 font-bold">FINANCIAMIENTO TOTAL</Text>
                            <Text className="text-purple-700 font-bold">
                              {values.totalfinanas === 0
                                ? "0.0%"
                                : `${(((values.subpascorr + values.subpalarp + values.subpatrim) / values.totalfinanas) * 100).toFixed(1)}%`}
                            </Text>
                          </View>
                        </View>
                      )}
                    </>
                  ) : (
                    <Text className="text-center text-red-600 font-semibold mt-2">
                      ⚠️ No hay datos disponibles para mostrar la matriz de actividad económica.
                    </Text>
                  )}
                </View>



                {editableForm && (
                  <>
                    {/* Mostrar advertencia si no hay datos */}
                    {values.totalactias === 0 && values.totalfinanas === 0 && (
                      <Text className="text-center text-red-600 font-semibold mt-2">
                        ⚠️ El resultado de calculos del balance general es 0(total de inversión y total de financiación son igual a 0)
                        solo se generara calculos para el estado de resultados
                      </Text>
                    )}

                    {/* Mostrar advertencia si los totales son diferentes */}
                    {values.totalactias !== values.totalfinanas &&
                      !(values.totalactias === 0 && values.totalfinanas === 0) && (
                        <Text className="text-center text-red-600 font-semibold mt-2">
                          ⚠️ El total de inversión debe ser igual al total de financiación.
                        </Text>
                      )}

                    {/* Botón de guardar información */}
                    <TouchableOpacity
                      onPress={() => handleSubmit()}
                      disabled={
                        values.totalactias !== values.totalfinanas &&
                        !(values.totalactias === 0 && values.totalfinanas === 0)
                      }
                      className={`p-3 rounded-lg mt-4 shadow-lg ${(values.totalactias === values.totalfinanas ||
                        (values.totalactias === 0 && values.totalfinanas === 0))
                        ? "bg-blue-600"
                        : "bg-gray-400"
                        }`}
                    >
                      <Text className="text-white text-center font-semibold">
                        {`Guardar información: ${date}`}
                      </Text>
                    </TouchableOpacity>
                  </>
                )}




              </View>
            );
          }}
        </Formik>
      </View>
    </CustomAccordion>
  );
};

export default ServiceFormComponent;
