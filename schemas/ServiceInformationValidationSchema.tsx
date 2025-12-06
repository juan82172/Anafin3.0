import * as Yup from "yup";

export const ServiceInformationValidationSchema = Yup.object().shape({
  creditIncome: Yup.number().required("El ingreso a crédito es requerido"),
  cashIncome: Yup.number().required("El ingreso en efectivo es requerido"),
  grossSales: Yup.number().required("Las ventas brutas son requeridas"),
  totalactiac: Yup.number().required("total"),
  operatingSalesExpenses: Yup.number().required(
    "Los gastos de ventas son requeridos"
  ),
  administrativeOperatingExpenses: Yup.number().required(
    "Los gastos administrativos son requeridos"
  ),
  financialIncome: Yup.number().required(
    "Los ingresos financieros son requeridos"
  ),
  financialExpenses: Yup.number().required(
    "Los gastos financieros son requeridos"
  ),
  extraordinaryIncome: Yup.number().required(
    "Los ingresos extraordinarios son requeridos"
  ),
  extraordinaryExpenses: Yup.number().required(
    "Los gastos extraordinarios son requeridos"
  ),
  profitBeforeTax: Yup.number().required(
    "La utilidad antes de impuestos es requerida"
  ),
  subactcorr: Yup.number().required(
    "La utilidad antes de impuestos es requerida"
  ),

  incomeTax: Yup.number().required("El impuesto a la renta es requerido"),
  netIncome: Yup.number().required("La utilidad neta es requerida"),
  totalactias: Yup.number().required("total inversion actividad de servicio"),
  cajaac: Yup.number().required("el valor caja es requerido"), 
  bancos: Yup.number().required("el valor de bancos es requerido"),  
  inversiontv: Yup.number().required("el valor de la inversion titulo valor es requerido"), 
  deudorclien: Yup.number().required("el valor de deudor cliente es requerido"), 
  provisiondeudor: Yup.number().required("el valor de provision deudor es requerido"),

  subppea: Yup.number().required("el valor subtotal propiedad, planta, equipo o activo fijo es requerido"), 
  construccion: Yup.number().required("el valor Construcciones y edificaciones  es requerido"), 
  equiofic: Yup.number().required("el valor equipo de oficina  es requerido"), 
  equipocompu: Yup.number().required("el valor equipo de computacion y comunicaciones es requerido"), 
  laboratorio: Yup.number().required("el valor laboratorios es requerido"), 
  flotatransporte: Yup.number().required("el valor flota y equipo de transporte es requerido"), 
  depreacumula: Yup.number().required("el valor depreciacion acumulada es requerido"), 
  
  subtoact: Yup.number().required("el valor subtotal otros activos es requerido"), 
  knowhow: Yup.number().required("el valor know how es requerido"),
  diferidos: Yup.number().required("el valor diferidos  es requerido"),
  amortiza: Yup.number().required("el valor amortizaciones es requerido"),
  invertvlargo: Yup.number().required("el valor  inversiones en titulos valores de largo plazo es requerido"),
  otrosa: Yup.number().required("el valor otros activos  es requerido"),

  subpascorr: Yup.number().required("el valor subtotal pasivo corriente es requerido"), 
  obficb:     Yup.number().required("el valor obligaciones financieras con bancos es requerido"), 
  obficonoen: Yup.number().required("el valor obligaciones financieras con otras entidades crediticias es requerido"), 
  otrobli:    Yup.number().required("el valor otras obligaciones o acreedores varios es requerido"), 
  cuenporpa:  Yup.number().required("el valor cuentas por pagar es requerido"), 
  cosgasp:    Yup.number().required("el valor costos y gastos por pagar es requerido"), 
  dividenparti: Yup.number().required("el valor dividendos o participaciones por pagar es requerido"), 
  retenfue:     Yup.number().required("el valor retencion en la fuente es requerido"), 
  iva:          Yup.number().required("el valor iva  es requerido"), 
  impuesto:     Yup.number().required("el valor  impuesto a la rentaes requerido"), 
  obligacionlabo: Yup.number().required("el valor obligaciones laboral es requerido"), 
  ingresosrecibi: Yup.number().required("el valor ingresos recibidos por anticipado es requerido"), 
  
  subpalarp: Yup.number().required("el valor subtotal pasivo de largo plazo es requerido"), 
  oflpbanco: Yup.number().required("el valor obligaciones financieras de largo plazo con bancos es requerido"), 
  oflpoenti: Yup.number().required("el valor obligaciones financieras de largo plazo con otras entidades crediticias es requerido"), 

  subpatrim:    Yup.number().required("el valor subtotal patrimonio es requerido"), 
  capitalsp:    Yup.number().required("el valor capital subscrito y pagado es requerido"), 
  aportess:     Yup.number().required("el valor aportes sociales es requerido"), 
  capitapn:     Yup.number().required("el valor capital de personas naturales es requerido"), 
  reservasl:    Yup.number().required("el valor reservas legales  es requerido"), 
  otrasres:     Yup.number().required("el valor otras reservas es requerido"), 
  utiliejer:    Yup.number().required("el valor utilidad del ejercicio es requerido"), 
  perdidaeje:   Yup.number().required("el valor perdida del ejercicio es requerido"), 
  utiliacumula: Yup.number().required("el valor utilidades acumuladas es requerido"), 
});
