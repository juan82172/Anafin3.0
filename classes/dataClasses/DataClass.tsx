import {
  VerticalAnalyticsClassByYearInterface,
  HorizontalAnalyticsClassByYearInterface,
} from "@/interfaces/analyticsInterfaces/AnalyticsProps";
import {
  AnalyticsInformationInterface,
  CommercialInformationInterface,
  DataInformationInterface,
  EnterpriseInformationInterface,
  ServiceInformationInterface,
} from "@/interfaces/dataInterfaces/DataContextProps";

export class EnterpriseInformation implements EnterpriseInformationInterface {
  enterpriseName: string;
  enterpriseNIT: string;
  enterpriseType: "service" | "commercial" | null;
  initialYear: number;
  years: number;

  constructor(values?: EnterpriseInformation) {
    this.enterpriseName = values?.enterpriseName ?? "";
    this.enterpriseNIT = values?.enterpriseNIT ?? "";
    this.enterpriseType = values?.enterpriseType ?? null;
    this.initialYear = parseInt(values?.initialYear?.toString() ?? "0");
    this.years = parseInt(values?.years?.toString() ?? "0");
  }
}

export class AnalyticsInformation implements AnalyticsInformationInterface {
  hasData: boolean;
  verticalAnalytics: (VerticalAnalyticsClassByYearInterface | null)[];
  horizontalAnalytics: (HorizontalAnalyticsClassByYearInterface | null)[];

  constructor() {
    this.hasData = false;
    this.verticalAnalytics = [];
    this.horizontalAnalytics = [];
  }
}
export class DataInformation implements DataInformationInterface {
  dataInformation: Array<
    ServiceInformationInterface | CommercialInformationInterface
  >;
  hasData: boolean;

  constructor(
    years: number,
    type: "service" | "commercial" | null,
    initialYear: number
  ) {
    this.hasData = false;
    this.dataInformation = new Array<
      ServiceInformationInterface | CommercialInformationInterface
    >();
    for (let i = 0; i < years; i++) {
      if (type === "service") {
        this.dataInformation.push(
          new ServiceInformation(`año ${initialYear + i}`)
        );
      } else if (type === "commercial") {
        this.dataInformation.push(
          new CommercialInformation(`año ${initialYear + i}`)
        );
      }
    }
  }
}

export class ServiceInformation implements ServiceInformationInterface {
  amortizasubtot: number;
  aportsubt: number;
  bancoac: number;
  bancoacva: number;
  bancossubtotal: number;
  cajaac: number;
  cajaacva: number;
  cajasubtotal: number;
  caperac: number;
  caperacva: number;
  capesubt: number;
  cartascac: number;
  cartascacva: number;
  cartasubt: number;
  casuypac: number;
  casuypacva: number;
  casuysubt: number;
  cogaspac: number;
  cogaspacva: number;
  cogassubt: number;
  construccionac: number;
  construccionacva: number;
  construccisubt: number;
  cpcobraac: number;
  cpcobraacva: number;
  cpcobsubt: number;
  depreacuac: number;
  depreacuacva: number;
  depreasubt: number;
  deudorclienac: number;
  deudorclienacva: number;
  deudorclsubtotal: number;
  diferidosac: number;
  diferidosacva: number;
  diferisubt: number;
  dividendosac: number;
  dividendosacva: number;
  dividesubt: number;
  equipocompuac: number;
  equipocompuacva: number;
  equipocomsubt: number;
  equioficac: number;
  equioficacva: number;
  equiofisubt: number;
  flotatranspac: number;
  flotatranspacva: number;
  flotatrasubtot: number;
  impuestorac: number;
  impuestoracva: number;
  impuestsubt: number;
  ingresoreciac: number;
  ingresoreciacva: number;
  ingressubt: number;
  invervitvac: number;
  invervitvacva: number;
  invervitsubtotal: number;
  invemerac: number;
  invemeracva: number;
  invemeracsubt: number;
  inversiontvac: number;
  inversiontvacva: number;
  inversionsubto: number;
  ivaac: number;
  ivaacva: number;
  ivasub: number;
  knowhowac: number;
  knowhowacva: number;
  knowsubtot: number;
  oblilaac: number;
  oblilaacva: number;
  oblisubt: number;
  obliavac: number;
  obliavacva: number;
  obliasubt: number;
  ofcbac: number;
  ofcbacva: number;
  ofcbacsubt: number;
  ofcoecac: number;
  ofcoecacva: number;
  ofcoesubt: number;
  oflpac: number;
  oflpacva: number;
  oflpbaac: number;
  oflpbaacva: number;
  oflpoenti: number;
  oflpsubto: number;
  oflsubt: number;
  otrosacac: number;
  otrosacacva: number;
  otrosacsubt: number;
  otrasresac: number;
  otrasresacva: number;
  otrasrsubt: number;
  perdejerac: number;
  perdejeracva: number;
  perdesubt: number;
  provexac: number;
  provexacva: number;
  provesubt: number;
  provisiondeac: number;
  provisiondeacpa: number;
  provisionsubtot: number;
  provnaac: number;
  provnaacva: number;
  provnasubto: number;
  reserlac: number;
  reserlacva: number;
  resersubt: number;
  retenfueac: number;
  retenfueacva: number;
  retensubto: number;
  subaccomer: number;
  subaccomerva: number;
  subactcorr: number;
  subtoaac: number;
  subtoaacva: number;
  subtopatac: number;
  subtopatva: number;
  subtopcac: number;
  subtopcacva: number;
  subtoplac: number;
  subtoplacva: number;
  subtppe: number;
  subtppeva: number;
  terrenoac: number;
  terrenoacva: number;
  terrenosubtot: number;
  totalactiac: number;
  totalactiacva: number;
  totalfinanac: number;
  totalfinanacva: number;
  utiliacumuac: number;
  utiliacumuacva: number;
  utiliacsubt: number;
  utiliejerac: number;
  utiliejeracva: number;
  utilisubt: number;
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
  bancosva: number;
  inversiontvva: number;
  deudorclienva: number;
  provisiondeudorva: number;

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


  obligfinanva: number;
  proviprestava: number;


  capitalva: number;
  reservaava: number;
  revalorizava: number;
  utiliacuva: number;
  subtopatacva: number;



  laborasubt: number;

  patentsubt: number;

  cuenpsubt: number;
  cosgasubt: number;
  dividensubt: number;
  retenfsubt: number;
  ivasubt: number;



  currentYear: string;

  creditIncome: number;
  cashIncome: number;
  grossSales: number;

  operatingSalesExpenses: number;
  administrativeOperatingExpenses: number;
  operatingProfit: number;

  financialIncome: number;
  financialExpenses: number;
  extraordinaryIncome: number;
  extraordinaryExpenses: number;
  profitBeforeTax: number;

  incomeTax: number;
  netIncome: number;


  bancos: number;
  inversiontv: number;
  deudorclien: number;
  provisiondeudor: number;

  subppea: number;
  construccion: number;
  equiofic: number;
  equipocompu: number;
  laboratorio: number;
  flotatransporte: number;
  depreacumula: number;

  subtoact: number;
  knowhow: number;
  diferidos: number;
  amortiza: number;
  invertvlargo: number;
  otrosa: number;

  subpascorr: number;
  obficb: number;
  obficonoen: number;
  otrobli: number;
  cuenporpa: number;
  cosgasp: number;
  dividenparti: number;
  retenfue: number;
  iva: number;
  impuesto: number;
  obligacionlabo: number;
  ingresosrecibi: number;

  subpalarp: number;
  oflpbanco: number;


  subpatrim: number;
  capitalsp: number;
  aportess: number;
  capitapn: number;
  reservasl: number;
  otrasres: number;
  utiliejer: number;
  perdidaeje: number;
  utiliacumula: number;

  Terrenosac: number;
  patentes: number;

  totalactias: number;
  totalfinanas: number;
  totalacti: number;
  subpascorrva: number;

  amortizacionesac: number;
  amortizacionesacva: number;
  aportsac: number;
  aportsacva: number;

  constructor(currentYear: string) {
    this.amortizacionesac = 0;
    this.amortizacionesacva = 0;
    this.amortizasubtot = 0;
    this.aportsac = 0;
    this.aportsacva = 0;
    this.aportsubt = 0;
    this.bancoac = 0;
    this.bancoacva = 0;
    this.bancossubtotal = 0;
    this.cajaac = 0;
    this.cajaacva = 0;
    this.cajasubtotal = 0;
    this.caperac = 0;
    this.caperacva = 0;
    this.capesubt = 0;
    this.cartascac = 0;
    this.cartascacva = 0;
    this.cartasubt = 0;
    this.casuypac = 0;
    this.casuypacva = 0;
    this.casuysubt = 0;
    this.cogaspac = 0;
    this.cogaspacva = 0;
    this.cogassubt = 0;
    this.construccionac = 0;
    this.construccionacva = 0;
    this.construccisubt = 0;
    this.cpcobraac = 0;
    this.cpcobraacva = 0;
    this.cpcobsubt = 0;
    this.depreacuac = 0;
    this.depreacuacva = 0;
    this.depreasubt = 0;
    this.deudorclienac = 0;
    this.deudorclienacva = 0;
    this.deudorclsubtotal = 0;
    this.diferidosac = 0;
    this.diferidosacva = 0;
    this.diferisubt = 0;
    this.dividendosac = 0;
    this.dividendosacva = 0;
    this.dividesubt = 0;
    this.equipocompuac = 0;
    this.equipocompuacva = 0;
    this.equipocomsubt = 0;
    this.equioficac = 0;
    this.equioficacva = 0;
    this.equiofisubt = 0;
    this.flotatranspac = 0;
    this.flotatranspacva = 0;
    this.flotatrasubtot = 0;
    this.impuestorac = 0;
    this.impuestoracva = 0;
    this.impuestsubt = 0;
    this.ingresoreciac = 0;
    this.ingresoreciacva = 0;
    this.ingressubt = 0;
    this.invervitvac = 0;
    this.invervitvacva = 0;
    this.invervitsubtotal = 0;
    this.invemerac = 0;
    this.invemeracva = 0;
    this.invemeracsubt = 0;
    this.inversiontvac = 0;
    this.inversiontvacva = 0;
    this.inversionsubto = 0;
    this.ivaac = 0;
    this.ivaacva = 0;
    this.ivasub = 0;
    this.knowhowac = 0;
    this.knowhowacva = 0;
    this.knowsubtot = 0;
    this.oblilaac = 0;
    this.oblilaacva = 0;
    this.oblisubt = 0;
    this.obliavac = 0;
    this.obliavacva = 0;
    this.obliasubt = 0;
    this.ofcbac = 0;
    this.ofcbacva = 0;
    this.ofcbacsubt = 0;
    this.ofcoecac = 0;
    this.ofcoecacva = 0;
    this.ofcoesubt = 0;
    this.oflpac = 0;
    this.oflpacva = 0;
    this.oflpbaac = 0;
    this.oflpbaacva = 0;
    this.oflpoenti = 0;
    this.oflpsubto = 0;
    this.oflsubt = 0;
    this.otrosacac = 0;
    this.otrosacacva = 0;
    this.otrosacsubt = 0;
    this.otrasresac = 0;
    this.otrasresacva = 0;
    this.otrasrsubt = 0;
    this.perdejerac = 0;
    this.perdejeracva = 0;
    this.perdesubt = 0;
    this.provexac = 0;
    this.provexacva = 0;
    this.provesubt = 0;
    this.provisiondeac = 0;
    this.provisiondeacpa = 0;
    this.provisionsubtot = 0;
    this.provnaac = 0;
    this.provnaacva = 0;
    this.provnasubto = 0;
    this.reserlac = 0;
    this.reserlacva = 0;
    this.resersubt = 0;
    this.retenfueac = 0;
    this.retenfueacva = 0;
    this.retensubto = 0;
    this.subaccomer = 0;
    this.subaccomerva = 0;
    this.subactcorr = 0;
    this.subtoaac = 0;
    this.subtoaacva = 0;
    this.subtopatac = 0;
    this.subtopatva = 0;
    this.subtopcac = 0;
    this.subtopcacva = 0;
    this.subtoplac = 0;
    this.subtoplacva = 0;
    this.subtppe = 0;
    this.subtppeva = 0;
    this.terrenoac = 0;
    this.terrenoacva = 0;
    this.terrenosubtot = 0;
    this.totalactiac = 0;
    this.totalactiacva = 0;
    this.totalfinanac = 0;
    this.totalfinanacva = 0;
    this.utiliacumuac = 0;
    this.utiliacumuacva = 0;
    this.utiliacsubt = 0;
    this.utiliejerac = 0;
    this.utiliejeracva = 0;
    this.utilisubt = 0;
    this.bancoac = 0;
    this.bancoac = 0;
    this.subaccomer = 0;
    this.subtppe = 0;
    this.subtoaac = 0;
    this.subtopcac = 0;
    this.subtoplac = 0;
    this.subtopatac = 0;
    this.totalfinanac = 0;
    this.totalactiac = 0;
    this.subpascorrva = 0;
    this.subactcorrva = 0;
    this.oflpbancova = 0;
    this.oflsubtva = 0;
    this.subpalarpva = 0;
    this.capitalspva = 0;
    this.aportessva = 0;
    this.capitapnva = 0;
    this.reservaslva = 0;
    this.otrasresva = 0;
    this.utiliejerva = 0;
    this.perdidaejeva = 0;
    this.utiliacumulava = 0;
    this.subpatrimva = 0;
    this.totalfinanasva = 0;
    this.otrobliva = 0;
    this.cajaacva = 0;
    this.bancosva = 0;
    this.inversiontvva = 0;
    this.deudorclienva = 0;
    this.provisiondeudorva = 0;
    this.subaccomerva = 0;

    this.Terrenosacva = 0;
    this.construccionva = 0;
    this.equioficva = 0;
    this.equipocompuva = 0;
    this.laboratoriova = 0;
    this.flotatransporteva = 0;
    this.depreacumulava = 0;
    this.subppeava = 0;

    this.patentesva = 0;
    this.knowhowva = 0;
    this.diferidosva = 0;
    this.amortizava = 0;
    this.subintanva = 0;

    this.invertvlargova = 0;
    this.otrosava = 0;
    this.subtoactva = 0;

    this.totalactiasva = 0;

    this.obficbva = 0;
    this.obficonoenva = 0;
    this.cuenporpava = 0;
    this.cosgaspva = 0;
    this.dividenpartiva = 0;
    this.retenfueva = 0;
    this.ivava = 0;
    this.impuestova = 0;
    this.obligacionlabova = 0;
    this.ingresosrecibiva = 0;
    this.subtopcacva = 0;

    this.obligfinanva = 0;
    this.proviprestava = 0;
    this.subtoplacva = 0;

    this.capitalva = 0;
    this.reservaava = 0;
    this.revalorizava = 0;
    this.utiliacuva = 0;
    this.subtopatacva = 0;

    this.totalfinanacva = 0;

    this.cajaacva = 0;
    this.currentYear = currentYear || "";
    this.cajasubtotal = 0;
    this.bancossubtotal = 0;
    this.invervitsubtotal = 0;
    this.deudorclsubtotal = 0;
    this.provisionsubtot = 0;
    this.terrenosubtot = 0;
    this.construccisubt = 0;
    this.equiofisubt = 0;
    this.equipocomsubt = 0;
    this.laborasubt = 0;
    this.flotatrasubtot = 0;
    this.depreasubt = 0;
    this.patentsubt = 0;
    this.knowsubtot = 0;
    this.diferisubt = 0;
    this.amortizasubtot = 0;
    this.inversionsubto = 0;
    this.otrosacsubt = 0;
    this.ofcbacsubt = 0;
    this.ofcoesubt = 0;
    this.obliasubt = 0;
    this.cuenpsubt = 0;
    this.cosgasubt = 0;
    this.dividensubt = 0;
    this.retenfsubt = 0;
    this.ivasubt = 0;
    this.impuestsubt = 0;
    this.oblisubt = 0;
    this.ingressubt = 0;
    this.oflpsubto = 0;
    this.oflsubt = 0;
    this.casuysubt = 0;
    this.aportsubt = 0;
    this.capesubt = 0;
    this.resersubt = 0;
    this.otrasrsubt = 0;
    this.utilisubt = 0;
    this.perdesubt = 0;
    this.utiliacsubt = 0;
    this.creditIncome = 0;
    this.cashIncome = 0;
    this.grossSales = 0;
    this.cajaac = 0;
    this.Terrenosac = 0;

    this.totalacti = 0;
    this.totalactias = 0;
    this.totalfinanas = 0;

    this.patentes = 0;
    this.subactcorr = 0;
    this.bancos = 0;
    this.inversiontv = 0;
    this.deudorclien = 0;
    this.provisiondeudor = 0;

    this.subppea = 0;
    this.construccion = 0;
    this.equiofic = 0;
    this.equipocompu = 0;
    this.laboratorio = 0;
    this.flotatransporte = 0;
    this.depreacumula = 0;

    this.subtoact = 0;
    this.knowhow = 0;
    this.diferidos = 0;
    this.amortiza = 0;
    this.invertvlargo = 0;
    this.otrosa = 0;

    this.subpascorr = 0;
    this.obficb = 0;
    this.obficonoen = 0;
    this.otrobli = 0;
    this.cuenporpa = 0;
    this.cosgasp = 0;
    this.dividenparti = 0;
    this.retenfue = 0;
    this.iva = 0;
    this.impuesto = 0;
    this.obligacionlabo = 0;
    this.ingresosrecibi = 0;

    this.operatingSalesExpenses = 0;
    this.administrativeOperatingExpenses = 0;
    this.operatingProfit = 0;

    this.financialIncome = 0;
    this.financialExpenses = 0;
    this.extraordinaryIncome = 0;
    this.extraordinaryExpenses = 0;
    this.profitBeforeTax = 0;

    this.incomeTax = 0;
    this.netIncome = 0;

    this.subpalarp = 0;
    this.oflpbanco = 0;
    this.oflpoenti = 0;

    this.subpatrim = 0;
    this.capitalsp = 0;
    this.aportess = 0;
    this.capitapn = 0;
    this.reservasl = 0;
    this.otrasres = 0;
    this.utiliejer = 0;
    this.perdidaeje = 0;
    this.utiliacumula = 0;
  }

  calculateValues() {
    this.operatingProfit =
      this.netIncome -
      this.operatingSalesExpenses -
      this.administrativeOperatingExpenses;
    this.profitBeforeTax =
      this.operatingProfit +
      this.financialIncome -
      this.financialExpenses +
      this.extraordinaryIncome -
      this.extraordinaryExpenses;
    this.incomeTax = this.profitBeforeTax * 0.35;
    this.netIncome = this.profitBeforeTax - this.incomeTax;
    this.cajaac = this.cajaac / this.totalactias;
  }
}

export class CommercialInformation implements CommercialInformationInterface {
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
  totalactiac: number;
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

  currentYear: string;
  cajasubtotal: number;
  creditIncome: number;
  cashIncome: number;
  grossSales: number;

  returnsAndDiscounts: number;
  netSales: number;

  initialInventory: number;
  finalInventory: number;
  purchasesCredit: number;
  purchasesCash: number;
  costOfSales: number;
  grossOperatingIncome: number;

  operatingSalesExpenses: number;
  administrativeOperatingExpenses: number;
  generalExpenses: number;
  operatingProfit: number;

  financialIncome: number;
  financialExpenses: number;
  extraordinaryIncome: number;
  extraordinaryExpenses: number;
  profitBeforeTax: number;

  incomeTax: number;
  netIncome: number;

  subaccomer: number;
  cajaac: number;
  bancoac: number;
  invervitvac: number;
  deudorclienac: number;
  provisiondeac: number;
  invemerac: number;

  terrenoac: number;
  construccionac: number;
  equioficac: number;
  equipocompuac: number;
  flotatranspac: number;
  depreacuac: number;
  subtppe: number;

  subtoaac: number;
  knowhowac: number;
  diferidosac: number;
  amortizacionesac: number;
  inversiontvac: number;
  otrosacac: number;

  subtopcac: number;
  ofcbac: number;
  ofcoecac: number;
  obliavac: number;
  cpcobraac: number;
  provnaac: number;
  provexac: number;
  cogaspac: number;
  dividendosac: number;
  retenfueac: number;
  ivaac: number;
  impuestorac: number;
  oblilaac: number;
  ingresoreciac: number;

  oflpbaac: number;
  oflpac: number;
  cartascac: number;
  subtoplac: number;

  subtopatac: number;
  casuypac: number;
  aportsac: number;
  caperac: number;
  reserlac: number;
  otrasresac: number;
  utiliejerac: number;
  perdejerac: number;
  utiliacumuac: number;
  totalactias: number;

  totalfinanac: number;

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

  constructor(currentYear: string) {
    this.utiliacumuacva = 0;
    this.subtopatva = 0;
    this.bancoacva = 0;
    this.invervitvacva = 0;
    this.deudorclienacva = 0;
    this.provisiondeacpa = 0;
    this.invemeracva = 0;
    this.subaccomerva = 0;
    this.terrenoacva = 0;
    this.construccionacva = 0;
    this.equioficacva = 0;
    this.equipocompuacva = 0;
    this.flotatranspacva = 0;
    this.depreacuacva = 0;
    this.subtppeva = 0;
    this.knowhowacva = 0;
    this.diferidosacva = 0;
    this.amortizacionesacva = 0;
    this.inversiontvacva = 0;
    this.otrosacacva = 0;
    this.subtoaacva = 0;
    this.totalactiacva = 0;
    this.ofcbacva = 0;
    this.ofcoecacva = 0;
    this.obliavacva = 0;
    this.cpcobraacva = 0;
    this.provnaacva = 0;
    this.provexacva = 0;
    this.cogaspacva = 0;
    this.dividendosacva = 0;
    this.retenfueacva = 0;
    this.ivaacva = 0;
    this.impuestoracva = 0;
    this.oblilaacva = 0;
    this.ingresoreciacva = 0;
    this.subtopcacva = 0;
    this.oflpbaacva = 0;
    this.oflpacva = 0;
    this.cartascacva = 0;
    this.subtoplacva = 0;
    this.casuypacva = 0;
    this.aportsacva = 0;
    this.caperacva = 0;
    this.reserlacva = 0;
    this.otrasresacva = 0;
    this.utiliejeracva = 0;
    this.perdejeracva = 0;
    this.totalfinanacva = 0;
    this.cajaacva = 0;
    this.diferisubt = 0;
    this.knowsubtot = 0;
    this.amortizasubtot = 0;
    this.inversionsubto = 0;
    this.otrosacsubt = 0;
    this.ofcbacsubt = 0;
    this.ofcoesubt = 0;
    this.obliasubt = 0;
    this.cpcobsubt = 0;
    this.provnasubto = 0;
    this.provesubt = 0;
    this.cogassubt = 0;
    this.dividesubt = 0;
    this.retensubto = 0;
    this.ivasub = 0;
    this.impuestsubt = 0;
    this.oblisubt = 0;
    this.ingressubt = 0;
    this.oflpsubto = 0;
    this.oflsubt = 0;
    this.cartasubt = 0;
    this.casuysubt = 0;
    this.aportsubt = 0;
    this.capesubt = 0;
    this.resersubt = 0;
    this.otrasrsubt = 0;
    this.utilisubt = 0;
    this.perdesubt = 0;
    this.utiliacsubt = 0;


    this.bancossubtotal = 0;
    this.invervitsubtotal = 0;
    this.deudorclsubtotal = 0;
    this.provisionsubtot = 0;
    this.invemeracsubt = 0;
    this.terrenosubtot = 0;
    this.construccisubt = 0;
    this.equiofisubt = 0;
    this.equipocomsubt = 0;
    this.flotatrasubtot = 0;
    this.depreasubt = 0;
    this.cajasubtotal = 0;
    this.iva = 0;
    this.impuesto = 0;
    this.obligacionlabo = 0;
    this.construccion = 0;
    this.deudorclien = 0;
    this.bancos = 0;
    this.inversiontv = 0;
    this.provisiondeudor = 0;
    this.subactcorr = 0;
    this.Terrenosac = 0;
    this.equiofic = 0;
    this.equipocompu = 0;
    this.laboratorio = 0;
    this.flotatransporte = 0;
    this.depreacumula = 0;
    this.subppea = 0;
    this.patentes = 0;
    this.knowhow = 0;
    this.diferidos = 0;
    this.amortiza = 0;
    this.invertvlargo = 0;
    this.otrosa = 0;
    this.subtoact = 0;
    this.obficb = 0;
    this.obficonoen = 0;
    this.otrobli = 0;
    this.cuenporpa = 0;
    this.cosgasp = 0;
    this.dividenparti = 0;
    this.retenfue = 0;
    this.ingresosrecibi = 0;
    this.subpascorr = 0;
    this.oflpbanco = 0;
    this.oflpoenti = 0;
    this.subpalarp = 0;
    this.capitalsp = 0;
    this.aportess = 0;
    this.capitapn = 0;
    this.reservasl = 0;
    this.otrasres = 0;
    this.utiliejer = 0;
    this.perdidaeje = 0;
    this.utiliacumula = 0;
    this.subpatrim = 0;
    this.totalfinanas = 0;
    this.totalactias = 0;
    this.totalactiac = 0;
    this.totalfinanac = 0;

    this.subtopatac = 0;
    this.casuypac = 0;
    this.aportsac = 0;
    this.caperac = 0;
    this.reserlac = 0;
    this.otrasresac = 0;
    this.utiliejerac = 0;
    this.perdejerac = 0;
    this.utiliacumuac = 0;

    this.oflpbaac = 0;
    this.oflpac = 0;
    this.cartascac = 0;
    this.subtoplac = 0;

    this.subtopcac = 0;
    this.ofcbac = 0;
    this.ofcoecac = 0;
    this.obliavac = 0;
    this.cpcobraac = 0;
    this.provnaac = 0;
    this.provexac = 0;
    this.cogaspac = 0;
    this.dividendosac = 0;
    this.retenfueac = 0;
    this.ivaac = 0;
    this.impuestorac = 0;
    this.oblilaac = 0;
    this.ingresoreciac = 0;

    this.subtoaac = 0;
    this.knowhowac = 0;
    this.diferidosac = 0;
    this.amortizacionesac = 0;
    this.inversiontvac = 0;
    this.otrosacac = 0;

    this.terrenoac = 0;
    this.construccionac = 0;
    this.equioficac = 0;
    this.equipocompuac = 0;
    this.flotatranspac = 0;
    this.depreacuac = 0;
    this.subtppe = 0;

    this.subaccomer = 0;
    this.cajaac = 0;
    this.bancoac = 0;
    this.invervitvac = 0;
    this.deudorclienac = 0;
    this.provisiondeac = 0;
    this.invemerac = 0;

    this.currentYear = currentYear || "";

    this.creditIncome = 0;
    this.cashIncome = 0;
    this.grossSales = 0;

    this.returnsAndDiscounts = 0;
    this.netSales = 0;

    this.initialInventory = 0;
    this.finalInventory = 0;
    this.purchasesCredit = 0;
    this.purchasesCash = 0;
    this.costOfSales = 0;
    this.grossOperatingIncome = 0;

    this.operatingSalesExpenses = 0;
    this.administrativeOperatingExpenses = 0;
    this.generalExpenses = 0;
    this.operatingProfit = 0;

    this.financialIncome = 0;
    this.financialExpenses = 0;
    this.extraordinaryIncome = 0;
    this.extraordinaryExpenses = 0;
    this.profitBeforeTax = 0;

    this.incomeTax = 0;
    this.netIncome = 0;
  }







  calculateValues() {
    this.netSales = this.grossSales - this.returnsAndDiscounts;
    this.costOfSales =
      this.initialInventory +
      this.purchasesCredit +
      this.purchasesCash -
      this.finalInventory;
    this.grossOperatingIncome = this.netSales - this.costOfSales;
    this.operatingProfit =
      this.grossOperatingIncome -
      this.operatingSalesExpenses -
      this.administrativeOperatingExpenses -
      this.generalExpenses;
    this.profitBeforeTax =
      this.operatingProfit +
      this.financialIncome -
      this.financialExpenses +
      this.extraordinaryIncome -
      this.extraordinaryExpenses;
    this.incomeTax = this.profitBeforeTax * 0.35;
    this.netIncome = this.profitBeforeTax - this.incomeTax;
  }
}
