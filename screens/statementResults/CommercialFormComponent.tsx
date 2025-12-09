import React, { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Formik } from "formik";
import { CommercialInformation } from "@/classes/dataClasses/DataClass";
import CustomAccordion from "@/components/CustomAccordion";
import CustomInput from "@/components/CustomInput";
import { useDataContext } from "@/context/DataContext";

interface CommercialFormComponentProps {
  date: string;
  onSubmit: (year: string, values: any) => void;
  editableForm?: boolean;
  initialData?: CommercialInformation;
  percentageValues?: boolean;
  title?: string;
  typeanalisis?: string;
}

const CommercialFormComponent: React.FC<CommercialFormComponentProps> = ({

  date,
  onSubmit,
  editableForm = true,
  initialData = new CommercialInformation(date),
  percentageValues = false,
  title,
  typeanalisis,
}) => {
  //console.log("valor del typeanalisis en comercial:", typeanalisis);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const initialValues = initialData;

  //console.log("🟢 initialValues:", initialValues);

  const { enterpriseInformation } = useDataContext();
  const formRef = useRef<any>(null);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
    } else {
      formRef.current?.resetForm({ values: new CommercialInformation(date) });
    }
  }, [enterpriseInformation]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const [showsubtotal, setShowsubtotal] = useState(false);
  const [showvariA, setShowvariA] = useState(false);
  const [showmatrizac, setShowmatrizac] = useState(false);
  const calculateValues = (values: any, setFieldValues: any) => {

    const subtopatac = parseFloat(values.casuypac) + parseFloat(values.aportsac) + parseFloat(values.caperac)
      + parseFloat(values.reserlac) + parseFloat(values.otrasresac) + parseFloat(values.utiliejerac)
      - parseFloat(values.perdejerac) + parseFloat(values.utiliacumuac);

    const subtoplac = parseFloat(values.oflpbaac) + parseFloat(values.oflpac) + parseFloat(values.cartascac);

    const subtopcac = parseFloat(values.ofcbac) + parseFloat(values.ofcoecac) + parseFloat(values.obliavac)
      + parseFloat(values.cpcobraac) + parseFloat(values.provnaac) + parseFloat(values.provexac)
      + parseFloat(values.cogaspac) + parseFloat(values.dividendosac) + parseFloat(values.retenfueac)
      + parseFloat(values.ivaac) + parseFloat(values.impuestorac) + parseFloat(values.oblilaac)
      + parseFloat(values.ingresoreciac);


    const subtoaac = parseFloat(values.knowhowac) + parseFloat(values.diferidosac) + parseFloat(values.amortizacionesac)
      + parseFloat(values.inversiontvac) + parseFloat(values.otrosacac);

    const subtppe = parseFloat(values.terrenoac) + parseFloat(values.construccionac) + parseFloat(values.equioficac)
      + parseFloat(values.equipocompuac) + parseFloat(values.flotatranspac) - parseFloat(values.depreacuac);

    const subaccomer = parseFloat(values.cajaac) + parseFloat(values.bancoac) + parseFloat(values.invervitvac)
      + parseFloat(values.deudorclienac) - parseFloat(values.provisiondeac) + parseFloat(values.invemerac);


    const totalactiac = subaccomer + subtppe + subtoaac;
    const totalfinanac = subtopcac + subtoplac + subtopatac;

    const grossSales =
      parseFloat(values.creditIncome) + parseFloat(values.cashIncome);

    const netSales = grossSales - parseFloat(values.returnsAndDiscounts);

    const costOfSales =
      parseFloat(values.initialInventory) +
      parseFloat(values.purchasesCredit) +
      parseFloat(values.purchasesCash) -
      parseFloat(values.finalInventory);

    const grossOperatingIncome = netSales - costOfSales;

    const operatingProfit =
      grossOperatingIncome -
      parseFloat(values.operatingSalesExpenses) -
      parseFloat(values.administrativeOperatingExpenses) -
      parseFloat(values.generalExpenses);

    const profitBeforeTax =
      operatingProfit +
      parseFloat(values.financialIncome) -
      parseFloat(values.financialExpenses) +
      parseFloat(values.extraordinaryIncome) -
      parseFloat(values.extraordinaryExpenses);

    const incomeTax = Math.ceil(profitBeforeTax * 0.35);
    const netIncome = profitBeforeTax - incomeTax;

    setFieldValues("grossSales", grossSales);
    setFieldValues("netSales", netSales);
    setFieldValues("costOfSales", costOfSales);
    setFieldValues("grossOperatingIncome", grossOperatingIncome);
    setFieldValues("operatingProfit", operatingProfit);
    setFieldValues("profitBeforeTax", profitBeforeTax);
    setFieldValues("incomeTax", incomeTax); subaccomer
    setFieldValues("netIncome", netIncome);
    setFieldValues("subaccomer", subaccomer);
    setFieldValues("subtppe", subtppe);
    setFieldValues("subtoaac", subtoaac);
    setFieldValues("subtopcac", subtopcac);
    setFieldValues("subtoplac", subtoplac);
    setFieldValues("subtopatac", subtopatac);
    setFieldValues("totalactiac", totalactiac);
    setFieldValues("totalfinanac", totalfinanac);
  };
  return (
    <CustomAccordion
      title={title ?? `Formulario del ${date}`}
      isOpen={isOpen}
      onToggle={toggleAccordion}
    >
      <View className="inline-block">

        <Formik
          innerRef={formRef}
          initialValues={{
            ...initialValues,               // mantiene los datos que ya tengas
            typeanalisis: typeanalisis ?? ""
          }}
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
                    value={(values.creditIncome ?? 0).toString()}
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
                    value={(values.cashIncome ?? 0).toString()}
                    onChangeText={(value) => {
                      setFieldValue("cashIncome", value);
                      calculateValues(
                        { ...values, cashIncome: value },
                        setFieldValue
                      );
                    }}
                    editable={editableForm}
                    onBlur={handleBlur("cashIncome")}
                  />

                  <CustomInput
                    label="Ventas Brutas"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={(values.grossSales ?? 0).toString()}
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
                    label="Devoluciones y Descuentos"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={(values.returnsAndDiscounts ?? 0).toString()}
                    onChangeText={(value) => {
                      setFieldValue("returnsAndDiscounts", value);
                      calculateValues(
                        { ...values, returnsAndDiscounts: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("returnsAndDiscounts")}
                    editable={editableForm}
                  />
                  <CustomInput
                    label="Ventas Netas"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={(values.netSales ?? 0).toString()}
                    onChangeText={handleChange("netSales")}
                    onBlur={handleBlur("netSales")}
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
                    label="Inventario Inicial"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={(values.initialInventory ?? 0).toString()}
                    onChangeText={(value) => {
                      setFieldValue("initialInventory", value);
                      calculateValues(
                        { ...values, initialInventory: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("initialInventory")}
                    editable={editableForm}
                  />
                  <CustomInput
                    label="Inventario Final"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={(values.finalInventory ?? 0).toString()}
                    onChangeText={(value) => {
                      setFieldValue("finalInventory", value);
                      calculateValues(
                        { ...values, finalInventory: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("finalInventory")}
                    editable={editableForm}
                  />
                  <CustomInput
                    label="Compras a Crédito"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={(values.purchasesCredit ?? 0).toString()}
                    onChangeText={(value) => {
                      setFieldValue("purchasesCredit", value);
                      calculateValues(
                        { ...values, purchasesCredit: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("purchasesCredit")}
                    editable={editableForm}
                  />
                  <CustomInput
                    label="Compras al Contado"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={(values.purchasesCash ?? 0).toString()}
                    onChangeText={(value) => {
                      setFieldValue("purchasesCash", value);
                      calculateValues(
                        { ...values, purchasesCash: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("purchasesCash")}
                    editable={editableForm}
                  />
                  <CustomInput
                    label="Costo de Ventas"
                    inputType={percentageValues ? "percentage" : "currency"}

                    value={(values.costOfSales ?? 0).toString()}
                    onChangeText={handleChange("costOfSales")}
                    onBlur={handleBlur("costOfSales")}
                    editable={false}
                    style={{
                      backgroundColor: "#bbdefb", // Azul más fuerte (Material Blue 100)
                      borderColor: "#1976d2",     // Azul profundo para el borde
                      color: "#0d47a1",           // Azul oscuro para el texto 
                      fontWeight: "bold",
                    }}
                  />
                  <CustomInput
                    label="Utilidad Bruta Operacional"
                    inputType={percentageValues ? "percentage" : "currency"}

                    value={(values.grossOperatingIncome ?? 0).toString()}
                    onChangeText={handleChange("grossOperatingIncome")}
                    onBlur={handleBlur("grossOperatingIncome")}
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

                    value={(values.operatingSalesExpenses ?? 0).toString()}
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
                    value={(values.administrativeOperatingExpenses ?? 0).toString()}
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
                    label="Gastos Generales"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={(values.generalExpenses ?? 0).toString()}
                    onChangeText={(value) => {
                      setFieldValue("generalExpenses", value);
                      calculateValues(
                        { ...values, generalExpenses: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("generalExpenses")}
                    editable={editableForm}
                  />
                  <CustomInput
                    label="Utilidad Operacional"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.operatingProfit.toString()}
                    onChangeText={handleChange("operatingProfit")}
                    onBlur={handleBlur("operatingProfit")}
                    editable={false}
                  />
                </View>
                <View className="border-b border-neutral-200 mb-2">
                  <CustomInput
                    label="Ingresos Financieros"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={(values.financialIncome ?? 0).toString()}
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
                    value={(values.financialExpenses ?? 0).toString()}
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
                    value={(values.extraordinaryIncome ?? 0).toString()}
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
                    value={(values.extraordinaryExpenses ?? 0).toString()}
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
                    value={(values.profitBeforeTax ?? 0).toString()}
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
                    value={(values.incomeTax ?? 0).toString()}
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
                    value={(values.netIncome ?? 0).toString()}
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
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
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
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}

                    />
                  )}



                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variacion Absoluta Bancos"
                      inputType={"currency"}
                      value={values.bancoacva.toString()}
                      onChangeText={handleChange("bancoacva")}
                      onBlur={handleBlur("bancoacva")}
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
                    label="Bancos"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.bancoac.toString()}
                    onChangeText={(value) => {
                      setFieldValue("bancoac", value);
                      calculateValues(
                        { ...values, bancoac: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("bancoac")}
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
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variacion Absoluta Inversiones en Titulos Valores de Corto Plazo"
                      inputType={"currency"}
                      value={values.invervitvacva.toString()}
                      onChangeText={handleChange("invervitvacva")}
                      onBlur={handleBlur("invervitvacva")}
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
                    label="Inversiones en Titulos Valores de Corto Plazo"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.invervitvac.toString()}
                    onChangeText={(value) => {
                      setFieldValue("invervitvac", value);
                      calculateValues(
                        { ...values, invervitvac: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("invervitvac")}
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
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variacion Absoluta Deudores Clientes o Cuentas por Cobrar o Cartera"
                      inputType={"currency"}
                      value={values.deudorclienacva.toString()}
                      onChangeText={handleChange("deudorclienacva")}
                      onBlur={handleBlur("deudorclienacva")}
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
                    label="Deudores Clientes o Cuentas por Cobrar o Cartera"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.deudorclienac.toString()}
                    onChangeText={(value) => {
                      setFieldValue("deudorclienac", value);
                      calculateValues(
                        { ...values, deudorclienac: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("deudorclienac")}
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
                        backgroundColor: "#fff9c4", // Amarillo claro (Material Yellow 100)
                        borderColor: "#fbc02d",     // Amarillo intenso para el borde (Material Yellow 700)
                        color: "#f57f17",           // Amarillo oscuro para el texto (Material Yellow 900)
                        fontWeight: "bold",
                      }}
                    />
                  )}
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variacion Absoluta Deudores Clientes o Cuentas por Cobrar"
                      inputType={"currency"}
                      value={values.provisiondeacpa.toString()}
                      onChangeText={handleChange("provisiondeacpa")}
                      onBlur={handleBlur("provisiondeacpa")}
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
                    label="Provision Deudores Clientes o Cuentas por Cobrar o Cartera"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.provisiondeac.toString()}
                    onChangeText={(value) => {
                      setFieldValue("provisiondeac", value);
                      calculateValues(
                        { ...values, provisiondeac: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("provisiondeac")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Provision Deudores Clientes subtotal"
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
                      label="Variacion Absoluta Inventario de Mercancias"
                      inputType={"currency"}
                      value={values.invemeracva.toString()}
                      onChangeText={handleChange("invemeracva")}
                      onBlur={handleBlur("invemeracva")}
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
                    label="Inventario de Mercancias"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.invemerac.toString()}
                    onChangeText={(value) => {
                      setFieldValue("invemerac", value);
                      calculateValues(
                        { ...values, invemerac: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("invemerac")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Inventario de Mercancias Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.invemeracsubt.toString()}
                      onChangeText={handleChange("invemeracsubt")}
                      editable={false}
                      onBlur={handleBlur("invemeracsubt")}

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
                      label="Variacion Absoluta Subtotal Activo Corriente"
                      inputType={"currency"}
                      value={values.subaccomerva.toString()}
                      onChangeText={handleChange("subaccomerva")}
                      onBlur={handleBlur("subaccomerva")}
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
                    value={values.subaccomer.toString()}
                    onChangeText={handleChange("subaccomer")}
                    onBlur={handleBlur("subaccomer")}
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
                      label="Variacion Absoluta Terrenos"
                      inputType={"currency"}
                      value={values.terrenoacva.toString()}
                      onChangeText={handleChange("terrenoacva")}
                      onBlur={handleBlur("terrenoacva")}
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
                    value={values.terrenoac.toString()}
                    onChangeText={(value) => {
                      setFieldValue("terrenoac", value);
                      calculateValues(
                        { ...values, terrenoac: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("terrenoac")}
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
                      label="Variacion Absoluta Construcciones y Edificaciones"
                      inputType={"currency"}
                      value={values.construccionacva.toString()}
                      onChangeText={handleChange("construccionacva")}
                      onBlur={handleBlur("construccionacva")}
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
                    label="Construcciones y Edificaciones"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.construccionac.toString()}
                    onChangeText={(value) => {
                      setFieldValue("construccionac", value);
                      calculateValues(
                        { ...values, construccionac: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("construccionac")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Construcciones y Edificaciones Deudores Clientes Subtotal"
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
                      label="Variacion Absoluta Equipo de Oficina"
                      inputType={"currency"}
                      value={values.equioficacva.toString()}
                      onChangeText={handleChange("equioficacva")}
                      onBlur={handleBlur("equioficacva")}
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
                    value={values.equioficac.toString()}
                    onChangeText={(value) => {
                      setFieldValue("equioficac", value);
                      calculateValues(
                        { ...values, equioficac: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("equioficac")}
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
                      label="Variacion Absoluta Equipo de Computaciòn y Comunicaciones"
                      inputType={"currency"}
                      value={values.equipocompuacva.toString()}
                      onChangeText={handleChange("equipocompuacva")}
                      onBlur={handleBlur("equipocompuacva")}
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
                    label="Equipo de Computaciòn y Comunicaciones"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.equipocompuac.toString()}
                    onChangeText={(value) => {
                      setFieldValue("equipocompuac", value);
                      calculateValues(
                        { ...values, equipocompuac: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("equipocompuac")}
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
                      label="Variacion Absoluta Flota y Equipo de Transporte"
                      inputType={"currency"}
                      value={values.flotatranspacva.toString()}
                      onChangeText={handleChange("flotatranspacva")}
                      onBlur={handleBlur("flotatranspacva")}
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
                    value={values.flotatranspac.toString()}
                    onChangeText={(value) => {
                      setFieldValue("flotatranspac", value);
                      calculateValues(
                        { ...values, flotatranspac: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("flotatranspac")}
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
                      label="Variacion Absoluta Depreciaciòn Acumulada"
                      inputType={"currency"}
                      value={values.depreacuacva.toString()}
                      onChangeText={handleChange("depreacuacva")}
                      onBlur={handleBlur("depreacuacva")}
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
                    label="Depreciaciòn Acumulada"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.depreacuac.toString()}
                    onChangeText={(value) => {
                      setFieldValue("depreacuac", value);
                      calculateValues(
                        { ...values, depreacuac: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("depreacuac")}
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
                      label="Variacion Absoluta Subtotal Propiedad, Planta y Equipo o Activo Fijo"
                      inputType={"currency"}
                      value={values.subtppeva.toString()}
                      onChangeText={handleChange("subtppeva")}
                      onBlur={handleBlur("subtppeva")}
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
                    label="Subtotal Propiedad, Planta y Equipo o Activo Fijo"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.subtppe.toString()}
                    onChangeText={handleChange("subtotal propiedad, planta y equipo o activo fijo")}
                    onBlur={handleBlur("subtppe")}
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
                      label="Variacion Absoluta Know How"
                      inputType={"currency"}
                      value={values.knowhowacva.toString()}
                      onChangeText={handleChange("knowhowacva")}
                      onBlur={handleBlur("knowhowacva")}
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
                    value={values.knowhowac.toString()}
                    onChangeText={(value) => {
                      setFieldValue("knowhowac", value);
                      calculateValues(
                        { ...values, knowhowac: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("knowhowac")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Know how Subtotal"
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
                      label="Variacion Absoluta Diferidos"
                      inputType={"currency"}
                      value={values.diferidosacva.toString()}
                      onChangeText={handleChange("diferidosacva")}
                      onBlur={handleBlur("diferidosacva")}
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
                    value={values.diferidosac.toString()}
                    onChangeText={(value) => {
                      setFieldValue("diferidosac", value);
                      calculateValues(
                        { ...values, diferidosac: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("diferidosac")}
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
                      label="Variacion Absoluta Amortizaciones"
                      inputType={"currency"}
                      value={values.amortizacionesacva.toString()}
                      onChangeText={handleChange("amortizacionesacva")}
                      onBlur={handleBlur("amortizacionesacva")}
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
                    value={values.amortizacionesac.toString()}
                    onChangeText={(value) => {
                      setFieldValue("amortizacionesac", value);
                      calculateValues(
                        { ...values, amortizacionesac: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("amortizacionesac")}
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
                      label="Variacion Absoluta Inversiones en Titulos Valores de Largo Plazo"
                      inputType={"currency"}
                      value={values.inversiontvacva.toString()}
                      onChangeText={handleChange("inversiontvacva")}
                      onBlur={handleBlur("inversiontvacva")}
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
                    value={values.inversiontvac.toString()}
                    onChangeText={(value) => {
                      setFieldValue("inversiontvac", value);
                      calculateValues(
                        { ...values, inversiontvac: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("inversiontvac")}
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
                      label="Variacion Absoluta Otros Activos"
                      inputType={"currency"}
                      value={values.otrosacacva.toString()}
                      onChangeText={handleChange("otrosacacva")}
                      onBlur={handleBlur("otrosacacva")}
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
                    value={values.otrosacac.toString()}
                    onChangeText={(value) => {
                      setFieldValue("otrosacac", value);
                      calculateValues(
                        { ...values, otrosacac: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("otrosacac")}
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
                      label="Variacion Absoluta Subtotal Otros Activos"
                      inputType={"currency"}
                      value={values.subtoaacva.toString()}
                      onChangeText={handleChange("subtoaacva")}
                      onBlur={handleBlur("subtoaacva")}
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
                    value={values.subtoaac.toString()}
                    onChangeText={handleChange("subtoaac")}
                    onBlur={handleBlur("subtoaac")}
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
                      label="Variacion Absoluta Total Inversion"
                      inputType={"currency"}
                      value={values.totalactiacva.toString()}
                      onChangeText={handleChange("totalactiacva")}
                      onBlur={handleBlur("totalactiacva")}
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
                    value={values.totalactiac.toString()}
                    onChangeText={handleChange("totalactiac")}
                    onBlur={handleBlur("totalactiac")}
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
                      label="Variacion Absoluta Obligaciones Financieras Con Bancos"
                      inputType={"currency"}
                      value={values.ofcbacva.toString()}
                      onChangeText={handleChange("ofcbacva")}
                      onBlur={handleBlur("ofcbacva")}
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
                    value={values.ofcbac.toString()}
                    onChangeText={(value) => {
                      setFieldValue("ofcbac", value);
                      calculateValues(
                        { ...values, ofcbac: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("ofcbac")}
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
                      label="Variacion Absoluta Obligaciones Financieras con Otras Entidades Crediticias"
                      inputType={"currency"}
                      value={values.ofcoecacva.toString()}
                      onChangeText={handleChange("ofcoecacva")}
                      onBlur={handleBlur("ofcoecacva")}
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
                    label="Obligaciones Financieras con Otras Entidades Crediticias"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.ofcoecac.toString()}
                    onChangeText={(value) => {
                      setFieldValue("ofcoecac", value);
                      calculateValues(
                        { ...values, ofcoecac: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("ofcoecac")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Obligaciones Con Otras Entidades Crediticias Subtotal"
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
                      label="Variacion Absoluta Otras  Obligaciones o Acreedores Varios"
                      inputType={"currency"}
                      value={values.obliavacva.toString()}
                      onChangeText={handleChange("obliavacva")}
                      onBlur={handleBlur("obliavacva")}
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
                    value={values.obliavac.toString()}
                    onChangeText={(value) => {
                      setFieldValue("obliavac", value);
                      calculateValues(
                        { ...values, obliavac: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("obliavac")}
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
                      label="Variacion Absoluta Cuentas por Cobrar"
                      inputType={"currency"}
                      value={values.cpcobraacva.toString()}
                      onChangeText={handleChange("cpcobraacva")}
                      onBlur={handleBlur("cpcobraacva")}
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
                    label="Cuentas por Cobrar"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.cpcobraac.toString()}
                    onChangeText={(value) => {
                      setFieldValue("cpcobraac", value);
                      calculateValues(
                        { ...values, cpcobraac: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("cpcobraac")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Cuentas por Cobrar Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.cpcobsubt.toString()}
                      onChangeText={handleChange("cpcobsubt")}
                      editable={false}
                      onBlur={handleBlur("cpcobsubt")}

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
                      label="Variacion Absoluta Proveedores Nacionales"
                      inputType={"currency"}
                      value={values.provnaacva.toString()}
                      onChangeText={handleChange("provnaacva")}
                      onBlur={handleBlur("provnaacva")}
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
                    label="Proveedores Nacionales"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.provnaac.toString()}
                    onChangeText={(value) => {
                      setFieldValue("provnaac", value);
                      calculateValues(
                        { ...values, provnaac: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("provnaac")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Proveedores Nacionales Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.provnasubto.toString()}
                      onChangeText={handleChange("provnasubto")}
                      editable={false}
                      onBlur={handleBlur("provnasubto")}

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
                      label="Variacion Absoluta Proveedores del Extranjero"
                      inputType={"currency"}
                      value={values.provexacva.toString()}
                      onChangeText={handleChange("provexacva")}
                      onBlur={handleBlur("provexacva")}
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
                    label="Proveedores del Extranjero "
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.provexac.toString()}
                    onChangeText={(value) => {
                      setFieldValue("provexac", value);
                      calculateValues(
                        { ...values, provexac: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("provexac")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Proveedores del Extranjero Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.provesubt.toString()}
                      onChangeText={handleChange("provesubt")}
                      editable={false}
                      onBlur={handleBlur("provesubt")}

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
                      label="Variacion Absoluta Costos y Gastos por Pagar"
                      inputType={"currency"}
                      value={values.cogaspacva.toString()}
                      onChangeText={handleChange("cogaspacva")}
                      onBlur={handleBlur("cogaspacva")}
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
                    value={values.cogaspac.toString()}
                    onChangeText={(value) => {
                      setFieldValue("cogaspac", value);
                      calculateValues(
                        { ...values, cogaspac: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("cogaspac")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Costos y Gastos por Pagar Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.cogassubt.toString()}
                      onChangeText={handleChange("cogassubt")}
                      editable={false}
                      onBlur={handleBlur("cogassubt")}

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
                      label="Variacion Absoluta Dividentos o Participaciones Por Pagar"
                      inputType={"currency"}
                      value={values.dividendosacva.toString()}
                      onChangeText={handleChange("dividendosacva")}
                      onBlur={handleBlur("dividendosacva")}
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
                    label="Dividentos o Participaciones por Pagar"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.dividendosac.toString()}
                    onChangeText={(value) => {
                      setFieldValue("dividendosac", value);
                      calculateValues(
                        { ...values, dividendosac: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("dividendosac")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Participaciones por Pagar Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.dividesubt.toString()}
                      onChangeText={handleChange("dividesubt")}
                      editable={false}
                      onBlur={handleBlur("dividesubt")}

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
                      label="Variacion Absoluta Retencion en la Fuente"
                      inputType={"currency"}
                      value={values.retenfueacva.toString()}
                      onChangeText={handleChange("retenfueacva")}
                      onBlur={handleBlur("retenfueacva")}
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
                    label="Retencion en la Fuente"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.retenfueac.toString()}
                    onChangeText={(value) => {
                      setFieldValue("retenfueac", value);
                      calculateValues(
                        { ...values, retenfueac: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("retenfueac")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Retencion en la Fuente Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.retensubto.toString()}
                      onChangeText={handleChange("retensubto")}
                      editable={false}
                      onBlur={handleBlur("retensubto")}

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
                      label="Variacion Absoluta Iva"
                      inputType={"currency"}
                      value={values.ivaacva.toString()}
                      onChangeText={handleChange("ivaacva")}
                      onBlur={handleBlur("ivaacva")}
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
                    value={values.ivaac.toString()}
                    onChangeText={(value) => {
                      setFieldValue("ivaac", value);
                      calculateValues(
                        { ...values, ivaac: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("ivaac")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Iva Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.ivasub.toString()}
                      onChangeText={handleChange("ivasub")}
                      editable={false}
                      onBlur={handleBlur("ivasub")}

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
                      label="Variacion Absoluta Impuesto a la Renta"
                      inputType={"currency"}
                      value={values.impuestoracva.toString()}
                      onChangeText={handleChange("impuestoracva")}
                      onBlur={handleBlur("impuestoracva")}
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
                    value={values.impuestorac.toString()}
                    onChangeText={(value) => {
                      setFieldValue("impuestorac", value);
                      calculateValues(
                        { ...values, impuestorac: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("impuestorac")}
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
                      label="Variacion Absoluta Obligaciones Laborales"
                      inputType={"currency"}
                      value={values.oblilaacva.toString()}
                      onChangeText={handleChange("oblilaacva")}
                      onBlur={handleBlur("oblilaacva")}
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
                    value={values.oblilaac.toString()}
                    onChangeText={(value) => {
                      setFieldValue("oblilaac", value);
                      calculateValues(
                        { ...values, oblilaac: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("oblilaac")}
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
                      label="Variacion Absoluta Ingresos Recibidos por Anticipado"
                      inputType={"currency"}
                      value={values.ingresoreciacva.toString()}
                      onChangeText={handleChange("ingresoreciacva")}
                      onBlur={handleBlur("ingresoreciacva")}
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
                    label="Ingresos Recibidos por Anticipado"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.ingresoreciac.toString()}
                    onChangeText={(value) => {
                      setFieldValue("ingresoreciac", value);
                      calculateValues(
                        { ...values, ingresoreciac: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("ingresoreciac")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Ingresos Recibidos por Anticipado Subtotal"
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
                      label="Variacion Absoluta Subtotal Pasivo Corriente"
                      inputType={"currency"}
                      value={values.subtopcacva.toString()}
                      onChangeText={handleChange("subtopcacva")}
                      onBlur={handleBlur("subtopcacva")}
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
                    value={values.subtopcac.toString()}
                    onChangeText={handleChange("subtopcac")}
                    onBlur={handleBlur("subtopcac")}
                    editable={false}
                    style={{
                      backgroundColor: "#bbdefb", // Azul más fuerte (Material Blue 100)
                      borderColor: "#1976d2",     // Azul profundo para el borde
                      color: "#0d47a1",
                      fontWeight: "bold",
                    }}
                  />
                </View>
                <View className="border-b border-neutral-200 mb-2">
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variacion Absoluta Obligaciones Financieras de Largo Plazo con Bancos"
                      inputType={"currency"}
                      value={values.oflpbaacva.toString()}
                      onChangeText={handleChange("oflpbaacva")}
                      onBlur={handleBlur("oflpbaacva")}
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
                    value={values.oflpbaac.toString()}
                    onChangeText={(value) => {
                      setFieldValue("oflpbaac", value);
                      calculateValues(
                        { ...values, oflpbaac: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("oflpbaac")}
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
                      label="Variacion Absoluta Obligaciones Financieras de Largo Plazo con Otras Entidades Crediticias"
                      inputType={"currency"}
                      value={values.oflpacva.toString()}
                      onChangeText={handleChange("oflpacva")}
                      onBlur={handleBlur("oflpacva")}
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
                    value={values.oflpac.toString()}
                    onChangeText={(value) => {
                      setFieldValue("oflpac", value);
                      calculateValues(
                        { ...values, oflpac: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("oflpac")}
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
                      label="Variacion Absoluta Cartas de Credito"
                      inputType={"currency"}
                      value={values.cartascacva.toString()}
                      onChangeText={handleChange("cartascacva")}
                      onBlur={handleBlur("cartascacva")}
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
                    label="Cartas de Credito"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.cartascac.toString()}
                    onChangeText={(value) => {
                      setFieldValue("cartascac", value);
                      calculateValues(
                        { ...values, cartascac: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("cartascac")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Cartas de Credito Subtotal"
                      inputType={percentageValues ? "percentage" : "currency"}
                      value={values.cartasubt.toString()}
                      onChangeText={handleChange("cartasubt")}
                      editable={false}
                      onBlur={handleBlur("cartasubt")}

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
                      label="Variacion Absoluta Subtotal Pasivo de Largo Plazo"
                      inputType={"currency"}
                      value={values.subtoplacva.toString()}
                      onChangeText={handleChange("subtoplacva")}
                      onBlur={handleBlur("subtoplacva")}
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
                    value={values.subtoplac.toString()}
                    onChangeText={handleChange("subtoplac")}
                    onBlur={handleBlur("subtoplac")}
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
                      label="Variacion Absoluta Capital Suscrito y Pagado"
                      inputType={"currency"}
                      value={values.casuypacva.toString()}
                      onChangeText={handleChange("casuypacva")}
                      onBlur={handleBlur("casuypacva")}
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
                    label="Capital Suscrito y Pagado"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.casuypac.toString()}
                    onChangeText={(value) => {
                      setFieldValue("casuypac", value);
                      calculateValues(
                        { ...values, casuypac: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("casuypac")}
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
                      label="Variacion Absoluta Aportes Sociales"
                      inputType={"currency"}
                      value={values.aportsacva.toString()}
                      onChangeText={handleChange("aportsacva")}
                      onBlur={handleBlur("aportsacva")}
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
                    value={values.aportsac.toString()}
                    onChangeText={(value) => {
                      setFieldValue("aportsac", value);
                      calculateValues(
                        { ...values, aportsac: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("aportsac")}
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
                      label="Variacion Absoluta Capital de Personas Naturales"
                      inputType={"currency"}
                      value={values.caperacva.toString()}
                      onChangeText={handleChange("caperacva")}
                      onBlur={handleBlur("caperacva")}
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
                    value={values.caperac.toString()}
                    onChangeText={(value) => {
                      setFieldValue("caperac", value);
                      calculateValues(
                        { ...values, caperac: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("caperac")}
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
                      label="Variacion Absoluta Reservas Legales"
                      inputType={"currency"}
                      value={values.reserlacva.toString()}
                      onChangeText={handleChange("reserlacva")}
                      onBlur={handleBlur("reserlacva")}
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
                    value={values.reserlac.toString()}
                    onChangeText={(value) => {
                      setFieldValue("reserlac", value);
                      calculateValues(
                        { ...values, reserlac: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("reserlac")}
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
                      label="Variacion Absoluta Otras Reserva"
                      inputType={"currency"}
                      value={values.otrasresacva.toString()}
                      onChangeText={handleChange("otrasresacva")}
                      onBlur={handleBlur("otrasresacva")}
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
                    value={values.otrasresac.toString()}
                    onChangeText={(value) => {
                      setFieldValue("otrasresac", value);
                      calculateValues(
                        { ...values, otrasresac: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("otrasresac")}
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
                      label="Variacion Absoluta Utilidad Del Ejercicio"
                      inputType={"currency"}
                      value={values.utiliejeracva.toString()}
                      onChangeText={handleChange("utiliejeracva")}
                      onBlur={handleBlur("utiliejeracva")}
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
                    label="Utilidad Del Ejercicio"
                    inputType={percentageValues ? "percentage" : "currency"}
                    value={values.utiliejerac.toString()}
                    onChangeText={(value) => {
                      setFieldValue("utiliejerac", value);
                      calculateValues(
                        { ...values, utiliejerac: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("utiliejerac")}
                    editable={editableForm}
                  />
                  {showsubtotal && (
                    <CustomInput
                      label="Utilidad Del Ejercicio Subtotal"
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
                      label="Variacion Absoluta Perdida Del Ejercicio"
                      inputType={"currency"}
                      value={values.perdejeracva.toString()}
                      onChangeText={handleChange("perdejeracva")}
                      onBlur={handleBlur("perdejeracva")}
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
                    value={values.perdejerac.toString()}
                    onChangeText={(value) => {
                      setFieldValue("perdejerac", value);
                      calculateValues(
                        { ...values, perdejerac: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("perdejerac")}
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
                      label="Variacion Absoluta Utilidades Acumuladas"
                      inputType={"currency"}
                      value={values.utiliacumuacva.toString()}
                      onChangeText={handleChange("utiliacumuacva")}
                      onBlur={handleBlur("utiliacumuacva")}
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
                    value={values.utiliacumuac.toString()}
                    onChangeText={(value) => {
                      setFieldValue("utiliacumuac", value);
                      calculateValues(
                        { ...values, utiliacumuac: value },
                        setFieldValue
                      );
                    }}
                    onBlur={handleBlur("utiliacumuac")}
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
                      label="Variacion Absoluta Subtotal Patrimonio"
                      inputType={"currency"}
                      value={values.subtopatva.toString()}
                      onChangeText={handleChange("subtopatva")}
                      onBlur={handleBlur("subtopatva")}
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
                    value={values.subtopatac.toString()}
                    onChangeText={handleChange("subtopatac")}
                    onBlur={handleBlur("subtopatac")}
                    editable={false}
                    style={{
                      backgroundColor: "#bbdefb", // Azul más fuerte (Material Blue 100)
                      borderColor: "#1976d2",     // Azul profundo para el borde
                      color: "#0d47a1",
                      fontWeight: "bold",
                    }}
                  />
                  {typeanalisis === "Horizontal" && showvariA && (
                    <CustomInput
                      label="Variacion Absoluta Total Financiacion"
                      inputType={"currency"}
                      value={values.totalfinanacva.toString()}
                      onChangeText={handleChange("totalfinanacva")}
                      onBlur={handleBlur("totalfinanacva")}
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
                    value={values.totalfinanac.toString()}
                    onChangeText={handleChange("totalfinanac")}
                    onBlur={handleBlur("totalfinanac")}
                    editable={false}
                    style={{
                      backgroundColor: "#c8e6c9", // Verde claro (Material Green 100)
                      borderColor: "#388e3c",     // Verde intenso para el borde (Material Green 700)
                      color: "#1b5e20",           // Verde oscuro para el texto
                      fontWeight: "bold",
                    }}

                  />
                  <View className="border-b border-neutral-200 mb-2">
                    {(values.totalactiac !== 0 || values.totalfinanac !== 0) ? (
                      typeanalisis === "Horizontal" ? (
                        <TouchableOpacity
                          onPress={() => setShowvariA(!showvariA)}
                          className="p-2 bg-indigo-500 rounded-md mb-2"
                        >
                          <Text className="text-white text-center font-medium">
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
                          <Text className="text-white text-center font-medium">
                            {showsubtotal
                              ? "Ocultar cálculo de subtotales"
                              : "Presentar cálculo de subtotales"}
                          </Text>
                        </TouchableOpacity>
                      )
                    ) : (
                      <Text className="text-center text-red-600 font-semibold mt-2">
                        ⚠️ No hay datos disponibles para generar cálculos
                      </Text>
                    )}
                  </View>



                </View>
                <View className="border-b border-neutral-200 mb-2">
                  {(values.totalactiac !== 0 || values.totalfinanac !== 0) ? (
                    <>
                      {typeanalisis !== "Horizontal" && (
                        <TouchableOpacity
                          onPress={() => setShowmatrizac(!showmatrizac)}
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
                          <Text className="text-center text-base font-semibold text-blue-700 mb-4">
                            {`AÑO ${date}`}
                          </Text>

                          <Text className="text-base text-center font-semibold text-indigo-700 mb-2">
                            DISTRIBUCIÓN PERCENTUAL DE LA ESTRUCTURA ECONÓMICA
                          </Text>

                          {(() => {
                            const formatPercent = (numerador: number, denominador: number) =>
                              denominador === 0
                                ? "0.0%"
                                : `${((numerador / denominador) * 100).toFixed(1)}%`;

                            return (
                              <>
                                <View className="flex-row border-t border-b py-2">
                                  <View className="flex-1 pr-2">
                                    <Text className="text-blue-600 font-semibold">ACTIVOS CORRIENTES</Text>
                                    <Text>{formatPercent(values.subaccomer, values.totalactiac)}</Text>
                                  </View>
                                  <View className="flex-1 px-2">
                                    <Text className="text-blue-600 font-semibold">PROPIEDAD, PLANTA Y EQUIPO</Text>
                                    <Text>{formatPercent(values.subtppe, values.totalactiac)}</Text>
                                  </View>
                                  <View className="flex-1 pl-2">
                                    <Text className="text-blue-600 font-semibold">OTROS ACTIVOS</Text>
                                    <Text>{formatPercent(values.subtoaac, values.totalactiac)}</Text>
                                  </View>
                                </View>

                                <View className="flex-row justify-between border-b py-2 bg-indigo-100 rounded-md px-2">
                                  <Text className="text-indigo-800 font-bold">INVERSIÓN TOTAL</Text>
                                  <Text className="text-indigo-800 font-bold">
                                    {formatPercent(
                                      values.subaccomer + values.subtppe + values.subtoaac,
                                      values.totalactiac
                                    )}
                                  </Text>
                                </View>

                                <View className="flex-row border-t border-b py-2 mt-2">
                                  <View className="flex-1 pr-2">
                                    <Text className="text-blue-600 font-semibold">PASIVOS CORRIENTES</Text>
                                    <Text>{formatPercent(values.subtopcac, values.totalfinanac)}</Text>
                                  </View>
                                  <View className="flex-1 px-2">
                                    <Text className="text-blue-600 font-semibold">PASIVOS LARGO PLAZO</Text>
                                    <Text>{formatPercent(values.subtoplac, values.totalfinanac)}</Text>
                                  </View>
                                  <View className="flex-1 pl-2">
                                    <Text className="text-blue-600 font-semibold">PATRIMONIO</Text>
                                    <Text>{formatPercent(values.subtopatac, values.totalfinanac)}</Text>
                                  </View>
                                </View>

                                <View className="flex-row justify-between border-b py-2 bg-indigo-100 rounded-md px-2">
                                  <Text className="text-indigo-800 font-bold">FINANCIAMIENTO TOTAL</Text>
                                  <Text className="text-indigo-800 font-bold">
                                    {formatPercent(
                                      values.subtopcac + values.subtoplac + values.subtopatac,
                                      values.totalfinanac
                                    )}
                                  </Text>
                                </View>
                              </>
                            );
                          })()}
                        </View>
                      )}
                    </>
                  ) : (
                    <Text className="text-center text-red-600 font-semibold mt-2">
                      ⚠️  No hay datos disponibles para mostrar la matriz de actividad económica.
                    </Text>
                  )}
                </View>


                {editableForm && (
                  <>
                    {/* Advertencia si no hay datos */}
                    {values.totalactiac === 0 && values.totalfinanac === 0 && (
                      <Text className="text-center text-red-600 font-semibold mt-2">
                        ⚠️ El resultado de calculos del balance general es 0(total de inversión y total de financiación son igual a 0)
                        solo se generara calculos para el estado de resultados
                      </Text>
                    )}

                    {/* Advertencia si los totales son diferentes y no ambos cero */}
                    {values.totalactiac !== values.totalfinanac &&
                      !(values.totalactiac === 0 && values.totalfinanac === 0) && (
                        <Text className="text-center text-red-600 font-semibold mt-2">
                          ⚠️ El total de inversión debe ser igual al total de financiación.
                        </Text>
                      )}

                    {/* Botón de guardar actividad comercial */}
                    <TouchableOpacity
                      onPress={() => handleSubmit()}
                      disabled={
                        values.totalactiac !== values.totalfinanac &&
                        !(values.totalactiac === 0 && values.totalfinanac === 0)
                      }
                      className={`p-3 rounded-lg mt-4 shadow-lg ${(values.totalactiac === values.totalfinanac ||
                        (values.totalactiac === 0 && values.totalfinanac === 0))
                        ? "bg-yellow-400"
                        : "bg-gray-400"
                        }`}
                    >
                      <Text className="text-white text-center font-semibold">
                        {`Guardar actividad comercial: ${date}`}
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

export default CommercialFormComponent;
