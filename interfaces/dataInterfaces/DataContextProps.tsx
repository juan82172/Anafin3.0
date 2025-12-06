import {
  HorizontalAnalyticsClassByYearInterface,
  VerticalAnalyticsClassByYearInterface,
} from "../analyticsInterfaces/AnalyticsProps";


export interface DataContextInterface {
  enterpriseInformation: EnterpriseInformationInterface | null;
  dataInformation: DataInformationInterface | null;
  analyticsInformation: AnalyticsInformationInterface | null;
  handleSetEnterpriseInformation: (
    enterpriseInformation: EnterpriseInformationInterface
  ) => void;
  handleSetDataInformation: (dataInformation: DataInformationInterface) => void;
  handleSetAnalyticsInformation: (analyticsInformation: any) => void;
  clearInformation: () => void;
}

export interface EnterpriseInformationInterface {
  enterpriseName: string;
  enterpriseNIT: string;
  enterpriseType: "service" | "commercial" | null;
  initialYear: number;
  years: number;
}

export interface DataInformationInterface {
  hasData: boolean;
  dataInformation: Array<
    ServiceInformationInterface | CommercialInformationInterface
  >;
}

export interface AnalyticsInformationInterface {
  hasData: boolean;
  verticalAnalytics: any[];
  horizontalAnalytics: any[];
  financialIndicators?: {
    liquidez: {
      razonCorriente: number | null;
      pruebaAcida: number | null;
      msg1: string;
      msg2: string;
    };
    endeudamiento: {
      general: number | null;
      patrimonial: number | null;
      msg1: string;
      msg2: string;
    };
    actividad: {
      rotCartera: number | null;
      rotInventarios: number | null;
      msg1: string;
      msg2: string;
    };
    rentabilidad: {
      margenNeto: number | null;
      roa: number | null;
      roe: number | null;
      msg1: string;
      msg2: string;
      msg3: string;
    };
  };
}

export interface ServiceInformationInterface {
  amortizacionesac: number;
  amortizacionesacva: number;
  aportsac: number;
  aportsacva: number;
  bancoac: number;
  bancoacva: number;
  caperac: number;
  caperacva: number;
  cartascac: number;
  cartascacva: number;
  cartasubt: number;
  casuypac: number;
  casuypacva: number;
  cogaspac: number;
  cogaspacva: number;
  cogassubt: number;
  construccionac: number;
  construccionacva: number;
  cpcobraac: number;
  cpcobraacva: number;
  cpcobsubt: number;
  depreacuac: number;
  depreacuacva: number;
  deudorclienac: number;
  deudorclienacva: number;
  diferidosac: number;
  diferidosacva: number;
  dividendosac: number;
  dividendosacva: number;
  dividesubt: number;
  equipocompuac: number;
  equipocompuacva: number;
  equioficac: number;
  equioficacva: number;
  flotatranspac: number;
  flotatranspacva: number;
  impuestorac: number;
  impuestoracva: number;
  ingresoreciac: number;
  ingresoreciacva: number;
  invervitvac: number;
  invervitvacva: number;
  invemerac: number;
  invemeracva: number;
  invemeracsubt: number;
  inversiontvac: number;
  inversiontvacva: number;
  ivaac: number;
  ivaacva: number;
  ivasub: number;
  knowhowac: number;
  knowhowacva: number;
  oblilaac: number;
  oblilaacva: number;
  obliavac: number;
  obliavacva: number;
  ofcbac: number;
  ofcbacva: number;
  ofcoecac: number;
  ofcoecacva: number;
  oflpac: number;
  oflpacva: number;
  oflpbaac: number;
  oflpbaacva: number;
  otrosacac: number;
  otrosacacva: number;
  otrasresac: number;
  otrasresacva: number;
  perdejerac: number;
  perdejeracva: number;
  provexac: number;
  provexacva: number;
  provesubt: number;
  provisiondeac: number;
  provisiondeacpa: number;
  provnaac: number;
  provnaacva: number;
  provnasubto: number;
  reserlac: number;
  reserlacva: number;
  retenfueac: number;
  retenfueacva: number;
  retensubto: number;
  subtoaacva: number;
  subtopatva: number;
  subtppeva: number;
  terrenoac: number;
  terrenoacva: number;
  totalactiacva: number;
  utiliacumuac: number;
  utiliacumuacva: number;
  utiliejerac: number;
  utiliejeracva: number;
  subaccomer: number;
  subtppe: number;
  subtoaac: number;
  subtopcac: number;
  subtoplac: number;
  subtopatac: number;
  subpascorrva: number;
  subactcorrva: number;
  oflpbancova: number;
  oflsubtva: number;
  subpalarpva: number;
  capitalspva: number;
  aportessva: number;
  capitapnva: number;
  reservaslva: number;
  otrasresva: number;
  utiliejerva: number;
  perdidaejeva: number;
  utiliacumulava: number;
  subpatrimva: number;
  totalfinanasva: number;
  otrobliva: number;
  cajaacva: number;
  bancosva: number;
  inversiontvva: number;
  deudorclienva: number;
  provisiondeudorva: number;
  subaccomerva: number;

  Terrenosacva: number;
  construccionva: number;
  equioficva: number;
  equipocompuva: number;
  laboratoriova: number;
  flotatransporteva: number;
  depreacumulava: number;
  subppeava: number;

  patentesva: number;
  knowhowva: number;
  diferidosva: number;
  amortizava: number;
  subintanva: number;

  invertvlargova: number;
  otrosava: number;
  subtoactva: number;

  totalactiasva: number;

  obficbva: number;
  obficonoenva: number;
  cuenporpava: number;
  cosgaspva: number;
  dividenpartiva: number;
  retenfueva: number;
  ivava: number;
  impuestova: number;
  obligacionlabova: number;
  ingresosrecibiva: number;
  subtopcacva: number;

  obligfinanva: number;
  proviprestava: number;
  subtoplacva: number;

  capitalva: number;
  reservaava: number;
  revalorizava: number;
  utiliacuva: number;
  subtopatacva: number;

  totalfinanacva: number;

  currentYear: string;

  cajasubtotal: number;
  bancossubtotal: number;
  invervitsubtotal: number;
  deudorclsubtotal: number;
  provisionsubtot: number;
  terrenosubtot: number;
  construccisubt: number;
  equiofisubt: number;
  equipocomsubt: number;
  laborasubt: number;
  flotatrasubtot: number;
  depreasubt: number;
  patentsubt: number;
  knowsubtot: number;
  diferisubt: number;
  amortizasubtot: number;
  inversionsubto: number;
  otrosacsubt: number;
  ofcbacsubt: number;
  ofcoesubt: number;
  obliasubt: number;
  cuenpsubt: number;
  cosgasubt: number;
  dividensubt: number;
  retenfsubt: number;
  ivasubt: number;
  impuestsubt: number;
  oblisubt: number;
  ingressubt: number;
  oflpsubto: number;
  oflsubt: number;
  casuysubt: number;
  aportsubt: number;
  capesubt: number;
  resersubt: number;
  otrasrsubt: number;
  utilisubt: number;
  perdesubt: number;
  utiliacsubt: number;

  creditIncome: number; // Ingresos a crédito
  cashIncome: number; // Ingresos a contado
  grossSales: number; // Ventas brutas (grossSales = creditIncome + cashIncome)

  operatingSalesExpenses: number; // Gastos operacionales de ventas
  administrativeOperatingExpenses: number; // Gastos operacionales de administración
  operatingProfit: number; // Utilidad operacional (operatingProfit = netIncome - operatingSalesExpenses - administrativeOperatingExpenses)

  financialIncome: number; // Ingresos financieros
  financialExpenses: number; // Gastos financieros
  extraordinaryIncome: number; // Ingresos extraordinarios
  extraordinaryExpenses: number; // Gastos extraordinarios
  profitBeforeTax: number; // Utilidad antes de impuestos (profitBeforeTax = operatingProfit + financialIncome - financialExpenses + extraordinaryIncome - extraordinaryExpenses)

  incomeTax: number; // Impuesto a la renta (incomeTax = profitBeforeTax * 0.35)
  netIncome: number; // Utilidad del ejercicio (netIncomeExercise = profitBeforeTax - incomeTax)

  //cambios para el balance general: 
  subactcorr: number; //subtotal activo corriente
  bancos: number; //bancos de activo corriente
  inversiontv: number //inversion titulo valor
  deudorclien: number //deudor cliente  
  provisiondeudor: number // provision deudor

  subppea: number; // subtotal propiedad, planta, equipo o activo fijo
  construccion: number; // construcciones y edificaciones 
  equiofic: number; // equipo de oficina 
  equipocompu: number; // equipo de computacion y comunicaciones 
  laboratorio: number; // laboratorios 
  flotatransporte: number; // flota y equipo de transporte 
  depreacumula: number; // depreciacion acumulada 
  cajaac: number; // cajaas
  totalactias: number, //total inversion
  Terrenosac: number; // terrenos
  patentes: number; // patentes

  subtoact: number; // sobtotal otros activos 
  knowhow: number; //  knowhow
  diferidos: number; // diferidos 
  amortiza: number; //  amortizaciones 
  invertvlargo: number; // inversiones en titulos valores de largo plazo
  otrosa: number; // otros activos 

  subpascorr: number; // subtotal pasivo corriente
  obficb: number; // obligaciones financieras con bancos
  obficonoen: number; // obligaciones financieras con otras entidades crediticias
  otrobli: number; // otras obligaciones o acreedores varios
  cuenporpa: number; // cuentas por pagar es requerido
  cosgasp: number; // costos y gastos por pagar
  dividenparti: number; // dividendos o participaciones por pagar
  retenfue: number; // retencion en la fuente es requerido
  iva: number; // iva  es requerido
  impuesto: number; // impuesto a la rentaes requerido
  obligacionlabo: number; // valor obligaciones laboral
  ingresosrecibi: number; //valor ingresos recibidos por anticipado

  subpalarp: number; // subtotal pasivo de largo plazo
  oflpbanco: number; // obligaciones financieras de largo plazo con bancos es requerido
  oflpoenti: number; // obligaciones financieras de largo plazo con otras entidades crediticias

  subpatrim: number; // subtotal patrimonio
  capitalsp: number; // capital subscrito y pagado
  aportess: number; // aportes sociales
  capitapn: number; // capital de personas naturales
  reservasl: number; // reservas legales
  otrasres: number; // otras reservas
  utiliejer: number; // utilidad del ejercicio
  perdidaeje: number; // perdida del ejercicio
  utiliacumula: number; // utilidades acumuladas

  totalacti: number; // total inversion
  totalfinanas: number; // total financiacion
  totalactiac: number;
  totalfinanac: number;

}

export interface CommercialInformationInterface {
  utiliacumuacva: number;
  subtopatva: number;
  bancoacva: number;
  invervitvacva: number;
  deudorclienacva: number;
  provisiondeacpa: number;
  invemeracva: number;
  subaccomerva: number;
  terrenoacva: number;
  construccionacva: number;
  equioficacva: number;
  equipocompuacva: number;
  flotatranspacva: number;
  depreacuacva: number;
  subtppeva: number;
  knowhowacva: number;
  diferidosacva: number;
  amortizacionesacva: number;
  inversiontvacva: number;
  otrosacacva: number;
  subtoaacva: number;
  totalactiacva: number;
  ofcbacva: number;
  ofcoecacva: number;
  obliavacva: number;
  cpcobraacva: number;
  provnaacva: number;
  provexacva: number;
  cogaspacva: number;
  dividendosacva: number;
  retenfueacva: number;
  ivaacva: number;
  impuestoracva: number;
  oblilaacva: number;
  ingresoreciacva: number;
  subtopcacva: number;
  oflpbaacva: number;
  oflpacva: number;
  cartascacva: number;
  subtoplacva: number;
  casuypacva: number;
  aportsacva: number;
  caperacva: number;
  reserlacva: number;
  otrasresacva: number;
  utiliejeracva: number;
  perdejeracva: number;
  totalfinanacva: number;
  cajaacva: number;
  diferisubt: number;
  knowsubtot: number;
  amortizasubtot: number;
  inversionsubto: number;
  otrosacsubt: number;
  ofcbacsubt: number;
  ofcoesubt: number;
  obliasubt: number;
  cpcobsubt: number;
  provnasubto: number;
  provesubt: number;
  cogassubt: number;
  dividesubt: number;
  retensubto: number;
  ivasub: number;
  impuestsubt: number;
  oblisubt: number;
  ingressubt: number;
  oflpsubto: number;
  oflsubt: number;
  cartasubt: number;
  casuysubt: number;
  aportsubt: number;
  capesubt: number;
  resersubt: number;
  otrasrsubt: number;
  utilisubt: number;
  perdesubt: number;
  utiliacsubt: number;

  bancossubtotal: number;
  invervitsubtotal: number;
  deudorclsubtotal: number;
  provisionsubtot: number;
  invemeracsubt: number;
  terrenosubtot: number;
  construccisubt: number;
  equiofisubt: number;
  equipocomsubt: number;
  flotatrasubtot: number;
  depreasubt: number;



  cajasubtotal: number;
  currentYear: string;
  totalactias: number;
  creditIncome: number; // Ingresos a crédito
  cashIncome: number; // Ingresos a contado
  grossSales: number; // Ventas brutas (grossSales = creditIncome + cashIncome)

  returnsAndDiscounts: number; // Devoluciones y descuentos
  netSales: number; // Ventas netas (netSales = grossSales - returnsAndDiscounts)

  initialInventory: number; // Inventario inicial
  finalInventory: number; // Inventario final
  purchasesCredit: number; // Compras a crédito
  purchasesCash: number; // Compras al contado
  costOfSales: number; // Costo de ventas (costOfSales = initialInventory + purchasesCredit + purchasesCash - finalInventory)
  grossOperatingIncome: number; // Utilidad bruta operacional (grossOperatingIncome = netSales - costOfSales)

  operatingSalesExpenses: number; // Gastos operacionales de ventas
  administrativeOperatingExpenses: number; // Gastos operacionales de administración
  generalExpenses: number; // Gastos generales
  operatingProfit: number; // Utilidad operacional (operatingProfit = grossOperatingIncome - operatingSalesExpenses - administrativeOperatingExpenses - generalExpenses)

  financialIncome: number; // Ingresos financieros
  financialExpenses: number; // Gastos financieros
  extraordinaryIncome: number; // Ingresos extraordinarios
  extraordinaryExpenses: number; // Gastos extraordinarios
  profitBeforeTax: number; // Utilidad antes de impuestos (profitBeforeTax = operatingProfit + financialIncome - financialExpenses + extraordinaryIncome - extraordinaryExpenses)

  incomeTax: number; // Impuesto a la renta (incomeTax = profitBeforeTax * 0.35)
  netIncome: number; // Utilidad del ejercicio (netIncome = profitBeforeTax - incomeTax)

  subaccomer: number; // subtotal activo corriente
  cajaac: number; //     caja 
  bancoac: number; //      bancos
  bancos: number; //bancos
  inversiontv: number //inversion
  provisiondeudor: number //provision deudor
  subactcorr: number //subtotal
  Terrenosac: number //terrenos
  equiofic: number //oficina
  equipocompu: number//equipo computo 
  laboratorio: number//laboratorio
  flotatransporte: number //flotatransporte
  depreacumula: number //depreacumula
  subppea: number//subppea
  patentes: number//patentes
  knowhow: number //knowhow
  diferidos: number //diferidos
  amortiza: number//amortiza
  invertvlargo: number //invertvlargo
  otrosa: number //otrosa
  subtoact: number// subtoact
  obficb: number //obficb
  obficonoen: number //obficonoen
  otrobli: number //otrobli
  cuenporpa: number//cuenporpa
  cosgasp: number//cosgasp
  dividenparti: number//dividenparti
  retenfue: number //retenfue
  ingresosrecibi: number //ingresosrecibi
  subpascorr: number //subpascorr
  oflpbanco: number //oflpbanco
  oflpoenti: number//oflpoenti
  subpalarp: number//subpalarp
  capitalsp: number//capitalsp
  aportess: number//aportess
  capitapn: number //capitapn
  reservasl: number//reservasl
  otrasres: number//otrasres
  utiliejer: number//utiliejer
  perdidaeje: number //perdidaeje
  utiliacumula: number//utiliacumula
  subpatrim: number //subpatrim
  totalfinanas: number //totalfinanas
  iva: number //iva
  impuesto: number//impuesto
  obligacionlabo: number// obligacionlabo
  construccion: number//construccion
  deudorclien: number// deudor cliente
  invervitvac: number; //   inversiones en titulos valores de corto plazo
  deudorclienac: number; // deudores clientes o cuentas por cobrar o cartera
  provisiondeac: number; // provision deudores clientes o cuentas por cobrar o cartera
  invemerac: number; // inventario de mercancias

  terrenoac: number; // terrenos 
  construccionac: number; // construcciones y edificaciones
  equioficac: number; //   equipo de oficina
  equipocompuac: number; // equipo de computaciòn y comunicaciones
  flotatranspac: number; // flota y equipo de transporte
  depreacuac: number; // depreciaciòn acumulada
  subtppe: number; // subtotal propiedad, planta y equipo o activo fijo

  subtoaac: number; // subtotal otros activos
  knowhowac: number; // knowhow
  diferidosac: number; //  diferidos
  amortizacionesac: number; // amortizaciones
  inversiontvac: number; // inversiones en titulos valores de largo plazo
  otrosacac: number; // otros activos

  subtopcac: number; // subtotal pasivo corriente
  ofcbac: number; // obligaciones financieras con bancos
  ofcoecac: number; // obligaciones financieras con otras entidades crediticias
  obliavac: number; //  otras  obligaciones o acreedores varios
  cpcobraac: number; // cuentas por cobrar
  provnaac: number; // proveedores nacionales
  provexac: number; // proveedores del extranjero
  cogaspac: number; // costos y gastos por pagar
  dividendosac: number; //  dividentos o participaciones por pagar
  retenfueac: number; // retencion en la fuente
  ivaac: number; // iva 
  impuestorac: number; // impuesto a la renta
  oblilaac: number; // obligaciones laborales
  ingresoreciac: number; // ingresos recibidos por anticipado

  oflpbaac: number; // obligaciones financieras de largo plazo con bancos
  oflpac: number; // obligaciones financieras de largo plazo con otras entidades crediticias
  cartascac: number; // cartas de credito
  subtoplac: number; // subtotal pasivo de largo plazo

  subtopatac: number; //  subtotal patrimonio
  casuypac: number; // capital suscrito y pagado
  aportsac: number; // aportes sociales
  caperac: number; // capital de personas naturales
  reserlac: number; // reservas legales
  otrasresac: number; // otras reservas
  utiliejerac: number; // utilidad del ejercicio
  perdejerac: number; // perdida del ejercicio
  utiliacumuac: number; // utilidades acumuladas

  totalactiac: number; // total activos actividad comercial 
  totalfinanac: number; // total inversión actividad comercial

}
