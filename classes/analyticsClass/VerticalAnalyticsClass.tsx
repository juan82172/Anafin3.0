import {
  CommercialInformationInterface,
  ServiceInformationInterface,
} from "@/interfaces/dataInterfaces/DataContextProps";
import {
  CommercialInformation,
  ServiceInformation,
} from "../dataClasses/DataClass";
import { VerticalAnalyticsClassByYearInterface } from "@/interfaces/analyticsInterfaces/AnalyticsProps";

export class VerticalAnalyticsClassByYear
  implements VerticalAnalyticsClassByYearInterface
{
  baseValue: number;
  dataInformationByYear:
    | ServiceInformationInterface
    | CommercialInformationInterface;
  type: "service" | "commercial" | null;

  constructor(
    dataInformationByYear:
      | ServiceInformationInterface
      | CommercialInformationInterface,
    type: "service" | "commercial" | null
  ) {
    this.baseValue = dataInformationByYear.grossSales;
    this.dataInformationByYear = dataInformationByYear;
    this.type = type;
  }

  generateVerticalAnalysis() {
    if (this.type === "service") {
      return this.generateServiceVerticalAnalysis();
    } else if (this.type === "commercial") {
      return this.generateCommercialVerticalAnalysis();
    } else {
      return null;
    }
  }

  generateServiceVerticalAnalysis() {
    
    const verticalAnalysisObject = new ServiceInformation(
      this.dataInformationByYear.currentYear
    );
    console.log("valor creditIncome sin recuperar:",verticalAnalysisObject.creditIncome);
    verticalAnalysisObject.creditIncome = this.calculateValue(
      this.dataInformationByYear.creditIncome
    );
    console.log("valor creditIncome recuperado:",verticalAnalysisObject.creditIncome);
    verticalAnalysisObject.cashIncome = this.calculateValue(
      this.dataInformationByYear.cashIncome
    );
    verticalAnalysisObject.grossSales = this.calculateValue(
      this.dataInformationByYear.grossSales
    );
    verticalAnalysisObject.operatingSalesExpenses = this.calculateValue(
      this.dataInformationByYear.operatingSalesExpenses
    );
    verticalAnalysisObject.administrativeOperatingExpenses =
      this.calculateValue(
        this.dataInformationByYear.administrativeOperatingExpenses
      );
    verticalAnalysisObject.operatingProfit = this.calculateValue(
      this.dataInformationByYear.operatingProfit
    );
    verticalAnalysisObject.financialIncome = this.calculateValue(
      this.dataInformationByYear.financialIncome
    );
    verticalAnalysisObject.financialExpenses = this.calculateValue(
      this.dataInformationByYear.financialExpenses
    );
    verticalAnalysisObject.extraordinaryIncome = this.calculateValue(
      this.dataInformationByYear.extraordinaryIncome
    );
    verticalAnalysisObject.extraordinaryExpenses = this.calculateValue(
      this.dataInformationByYear.extraordinaryExpenses
    );
    verticalAnalysisObject.profitBeforeTax = this.calculateValue(
      this.dataInformationByYear.profitBeforeTax
    );
    verticalAnalysisObject.incomeTax = this.calculateValue(
      this.dataInformationByYear.incomeTax
    );
    verticalAnalysisObject.netIncome = this.calculateValue(
      this.dataInformationByYear.netIncome
    );
    console.log("valor caja sin dividir:",verticalAnalysisObject.cajaac);
    verticalAnalysisObject.cajaac = this.calculateValue2(
      this.dataInformationByYear.cajaac
    );
    console.log("valor caja dividido:",verticalAnalysisObject.cajaac);
    verticalAnalysisObject.bancos = this.calculateValue2(
      this.dataInformationByYear.bancos
    );
    verticalAnalysisObject.inversiontv = this.calculateValue2(
      this.dataInformationByYear.inversiontv
    );
    verticalAnalysisObject.deudorclien = this.calculateValue2(
      this.dataInformationByYear.deudorclien
    );
    verticalAnalysisObject.provisiondeudor = this.calculateValue2(
      this.dataInformationByYear.provisiondeudor
    );
    verticalAnalysisObject.subactcorr = this.calculateValue2(
      this.dataInformationByYear.subactcorr
    );
    verticalAnalysisObject.Terrenosac = this.calculateValue2(
      this.dataInformationByYear.Terrenosac
    );
    verticalAnalysisObject.construccion = this.calculateValue2(
      this.dataInformationByYear.construccion
    );
    verticalAnalysisObject.equiofic = this.calculateValue2(
      this.dataInformationByYear.equiofic
    );
    verticalAnalysisObject.equipocompu = this.calculateValue2(
      this.dataInformationByYear.equipocompu
    );
    verticalAnalysisObject.laboratorio = this.calculateValue2(
      this.dataInformationByYear.laboratorio
    );
    verticalAnalysisObject.flotatransporte = this.calculateValue2(
      this.dataInformationByYear.flotatransporte
    );
    verticalAnalysisObject.depreacumula = this.calculateValue2(
      this.dataInformationByYear.depreacumula
    );
    verticalAnalysisObject.subppea = this.calculateValue2(
      this.dataInformationByYear.subppea
    );
    verticalAnalysisObject.patentes = this.calculateValue2(
      this.dataInformationByYear.patentes
    );
    verticalAnalysisObject.knowhow = this.calculateValue2(
      this.dataInformationByYear.knowhow
    );
    verticalAnalysisObject.diferidos = this.calculateValue2(
      this.dataInformationByYear.diferidos
    );
    verticalAnalysisObject.amortiza = this.calculateValue2(
      this.dataInformationByYear.amortiza
    );
    verticalAnalysisObject.invertvlargo = this.calculateValue2(
      this.dataInformationByYear.invertvlargo
    );
    verticalAnalysisObject.otrosa = this.calculateValue2(
      this.dataInformationByYear.otrosa
    );
    verticalAnalysisObject.subtoact = this.calculateValue2(
      this.dataInformationByYear.subtoact
    );
    verticalAnalysisObject.totalactias = this.calculateValue2(
      this.dataInformationByYear.totalactias
    );
    // calculovalue 3 con campo totalfinanas
    verticalAnalysisObject.obficb = this.calculateValue3(
      this.dataInformationByYear.obficb
    );
    verticalAnalysisObject.obficonoen = this.calculateValue2(
      this.dataInformationByYear.obficonoen
    );
    verticalAnalysisObject.otrobli = this.calculateValue2(
      this.dataInformationByYear.otrobli
    );
    verticalAnalysisObject.cuenporpa = this.calculateValue2(
      this.dataInformationByYear.cuenporpa
    );
    verticalAnalysisObject.cosgasp = this.calculateValue2(
      this.dataInformationByYear.cosgasp
    );
    verticalAnalysisObject.dividenparti = this.calculateValue2(
      this.dataInformationByYear.dividenparti
    );
    verticalAnalysisObject.retenfue = this.calculateValue2(
      this.dataInformationByYear.retenfue
    );
    verticalAnalysisObject.iva = this.calculateValue2(
      this.dataInformationByYear.iva
    );
    verticalAnalysisObject.impuesto = this.calculateValue2(
      this.dataInformationByYear.impuesto
    );
    verticalAnalysisObject.obligacionlabo = this.calculateValue2(
      this.dataInformationByYear.obligacionlabo
    );
    verticalAnalysisObject.ingresosrecibi = this.calculateValue2(
      this.dataInformationByYear.ingresosrecibi
    );
    verticalAnalysisObject.subpascorr = this.calculateValue2(
      this.dataInformationByYear.subpascorr
    );
    verticalAnalysisObject.oflpbanco = this.calculateValue2(
      this.dataInformationByYear.oflpbanco
    );
    verticalAnalysisObject.oflpoenti = this.calculateValue2(
      this.dataInformationByYear.oflpoenti
    );
    verticalAnalysisObject.subpalarp = this.calculateValue2(
      this.dataInformationByYear.subpalarp
    );
    verticalAnalysisObject.capitalsp = this.calculateValue2(
      this.dataInformationByYear.capitalsp
    );
    verticalAnalysisObject.aportess = this.calculateValue2(
      this.dataInformationByYear.aportess
    );
    verticalAnalysisObject.capitapn = this.calculateValue2(
      this.dataInformationByYear.capitapn
    );
    verticalAnalysisObject.reservasl = this.calculateValue2(
      this.dataInformationByYear.reservasl
    );
    verticalAnalysisObject.otrasres = this.calculateValue2(
      this.dataInformationByYear.otrasres
    );
    verticalAnalysisObject.utiliejer = this.calculateValue2(
      this.dataInformationByYear.utiliejer
    );
    verticalAnalysisObject.perdidaeje = this.calculateValue2(
      this.dataInformationByYear.perdidaeje
    );
    verticalAnalysisObject.utiliacumula = this.calculateValue2(
      this.dataInformationByYear.utiliacumula
    );
    verticalAnalysisObject.subpatrim = this.calculateValue2(
      this.dataInformationByYear.subpatrim
    );
    verticalAnalysisObject.totalfinanas = this.calculateValue2(
      this.dataInformationByYear.totalfinanas
    );


    //calcular subtotales 
     verticalAnalysisObject.cajasubtotal = this.calculateValue12(
      this.dataInformationByYear.cajaac
    );
    verticalAnalysisObject.bancossubtotal = this.calculateValue12(
      this.dataInformationByYear.bancos
    );
     verticalAnalysisObject.invervitsubtotal = this.calculateValue12(
      this.dataInformationByYear.inversiontv
    );
     verticalAnalysisObject.deudorclsubtotal = this.calculateValue12(
      this.dataInformationByYear.deudorclien
    );
     verticalAnalysisObject.provisionsubtot = this.calculateValue12(
      this.dataInformationByYear.provisiondeudor
    );

    verticalAnalysisObject.terrenosubtot = this.calculateValue13(
      this.dataInformationByYear.Terrenosac
    );
    verticalAnalysisObject.construccisubt = this.calculateValue13(
      this.dataInformationByYear.construccion
    );
    verticalAnalysisObject.equiofisubt = this.calculateValue13(
      this.dataInformationByYear.equiofic
    );
    verticalAnalysisObject.equipocomsubt = this.calculateValue13(
      this.dataInformationByYear.equipocompu
    );
    verticalAnalysisObject.laborasubt = this.calculateValue13(
      this.dataInformationByYear.laboratorio
    );
    verticalAnalysisObject.flotatrasubtot = this.calculateValue13(
      this.dataInformationByYear.flotatransporte
    );
    verticalAnalysisObject.depreasubt = this.calculateValue13(
      this.dataInformationByYear.depreacumula
    );

    verticalAnalysisObject.patentsubt = this.calculateValue14(
      this.dataInformationByYear.patentes
    );
    verticalAnalysisObject.knowsubtot = this.calculateValue14(
      this.dataInformationByYear.knowhow
    );
    verticalAnalysisObject.diferisubt = this.calculateValue14(
      this.dataInformationByYear.diferidos
    );
    verticalAnalysisObject.amortizasubtot = this.calculateValue14(
      this.dataInformationByYear.amortiza
    );
     verticalAnalysisObject.inversionsubto = this.calculateValue14(
      this.dataInformationByYear.invertvlargo
    );
     verticalAnalysisObject.otrosacsubt = this.calculateValue14(
      this.dataInformationByYear.otrosa
    );

    verticalAnalysisObject.ofcbacsubt = this.calculateValue15(
      this.dataInformationByYear.obficb
    );
    verticalAnalysisObject.ofcoesubt = this.calculateValue15(
      this.dataInformationByYear.obficonoen
    );
    verticalAnalysisObject.obliasubt = this.calculateValue15(
      this.dataInformationByYear.otrobli
    );
    verticalAnalysisObject.cuenpsubt = this.calculateValue15(
      this.dataInformationByYear.cuenporpa
    );
    verticalAnalysisObject.cosgasubt = this.calculateValue15(
      this.dataInformationByYear.cosgasp
    );
    verticalAnalysisObject.dividensubt = this.calculateValue15(
      this.dataInformationByYear.dividenparti
    );
    verticalAnalysisObject.retenfsubt = this.calculateValue15(
      this.dataInformationByYear.retenfue
    );
    verticalAnalysisObject.ivasubt = this.calculateValue15(
      this.dataInformationByYear.iva
    );
    verticalAnalysisObject.impuestsubt = this.calculateValue15(
      this.dataInformationByYear.impuesto
    );
    verticalAnalysisObject.oblisubt = this.calculateValue15(
      this.dataInformationByYear.obligacionlabo
    );
    verticalAnalysisObject.ingressubt = this.calculateValue15(
      this.dataInformationByYear.ingresosrecibi
    );


    verticalAnalysisObject.oflpsubto = this.calculateValue16(
      this.dataInformationByYear.oflpbanco
    );
    verticalAnalysisObject.oflsubt = this.calculateValue16(
      this.dataInformationByYear.oflpoenti
    );

    verticalAnalysisObject.casuysubt = this.calculateValue17(
      this.dataInformationByYear.capitalsp
    );
    verticalAnalysisObject.aportsubt = this.calculateValue17(
      this.dataInformationByYear.aportess
    );
    verticalAnalysisObject.capesubt = this.calculateValue17(
      this.dataInformationByYear.capitapn
    );
     verticalAnalysisObject.resersubt = this.calculateValue17(
      this.dataInformationByYear.reservasl
    );
    verticalAnalysisObject.otrasrsubt = this.calculateValue17(
      this.dataInformationByYear.otrasres
    );
    verticalAnalysisObject.utilisubt = this.calculateValue17(
      this.dataInformationByYear.utiliejer
    );
    verticalAnalysisObject.perdesubt = this.calculateValue17(
      this.dataInformationByYear.perdidaeje
    );
    verticalAnalysisObject.utiliacsubt = this.calculateValue17(
      this.dataInformationByYear.utiliacumula
    );

    return verticalAnalysisObject;
  }

  generateCommercialVerticalAnalysis() {
    const dataInformationValueParse = this
      .dataInformationByYear as CommercialInformationInterface;
    const verticalAnalysisObject = new CommercialInformation(
      this.dataInformationByYear.currentYear
    );
    verticalAnalysisObject.creditIncome = this.calculateValue(
      dataInformationValueParse.creditIncome
    );
    verticalAnalysisObject.cashIncome = this.calculateValue(
      dataInformationValueParse.cashIncome
    );
    verticalAnalysisObject.grossSales = this.calculateValue(
      dataInformationValueParse.grossSales
    );
    verticalAnalysisObject.returnsAndDiscounts = this.calculateValue(
      dataInformationValueParse.returnsAndDiscounts
    );
    verticalAnalysisObject.netSales = this.calculateValue(
      dataInformationValueParse.netSales
    );
    verticalAnalysisObject.initialInventory = this.calculateValue(
      dataInformationValueParse.initialInventory
    );
    verticalAnalysisObject.finalInventory = this.calculateValue(
      dataInformationValueParse.finalInventory
    );
    verticalAnalysisObject.purchasesCredit = this.calculateValue(
      dataInformationValueParse.purchasesCredit
    );
    verticalAnalysisObject.purchasesCash = this.calculateValue(
      dataInformationValueParse.purchasesCash
    );
    verticalAnalysisObject.costOfSales = this.calculateValue(
      dataInformationValueParse.costOfSales
    );
    verticalAnalysisObject.grossOperatingIncome = this.calculateValue(
      dataInformationValueParse.grossOperatingIncome
    );
    verticalAnalysisObject.operatingSalesExpenses = this.calculateValue(
      dataInformationValueParse.operatingSalesExpenses
    );
    verticalAnalysisObject.administrativeOperatingExpenses =
      this.calculateValue(
        dataInformationValueParse.administrativeOperatingExpenses
      );
    verticalAnalysisObject.generalExpenses = this.calculateValue(
      dataInformationValueParse.generalExpenses
    );
    verticalAnalysisObject.operatingProfit = this.calculateValue(
      dataInformationValueParse.operatingProfit
    );
    verticalAnalysisObject.financialIncome = this.calculateValue(
      dataInformationValueParse.financialIncome
    );
    verticalAnalysisObject.financialExpenses = this.calculateValue(
      dataInformationValueParse.financialExpenses
    );
    verticalAnalysisObject.extraordinaryIncome = this.calculateValue(
      dataInformationValueParse.extraordinaryIncome
    );
    verticalAnalysisObject.extraordinaryExpenses = this.calculateValue(
      dataInformationValueParse.extraordinaryExpenses
    );
    verticalAnalysisObject.profitBeforeTax = this.calculateValue(
      dataInformationValueParse.profitBeforeTax
    );
    verticalAnalysisObject.incomeTax = this.calculateValue(
      dataInformationValueParse.incomeTax
    );
    verticalAnalysisObject.netIncome = this.calculateValue(
      dataInformationValueParse.netIncome
    );
    verticalAnalysisObject.cajaac = this.calculateValue4(
      dataInformationValueParse.cajaac
    );
    verticalAnalysisObject.bancoac = this.calculateValue4(
      dataInformationValueParse.bancoac
    );
    verticalAnalysisObject.invervitvac = this.calculateValue4(
      dataInformationValueParse.invervitvac
    );
    verticalAnalysisObject.deudorclienac = this.calculateValue4(
      dataInformationValueParse.deudorclienac
    );
    verticalAnalysisObject.provisiondeac = this.calculateValue4(
      dataInformationValueParse.provisiondeac
    );
    verticalAnalysisObject.invemerac = this.calculateValue4(
      dataInformationValueParse.invemerac
    );
    verticalAnalysisObject.subaccomer = this.calculateValue4(
      dataInformationValueParse.subaccomer
    );
    verticalAnalysisObject.terrenoac = this.calculateValue4(
      dataInformationValueParse.terrenoac
    );
     verticalAnalysisObject.construccionac = this.calculateValue4(
      dataInformationValueParse.construccionac
    );
     verticalAnalysisObject.equioficac = this.calculateValue4(
      dataInformationValueParse.equioficac
    );
     verticalAnalysisObject.equipocompuac = this.calculateValue4(
      dataInformationValueParse.equipocompuac
    );
     verticalAnalysisObject.flotatranspac = this.calculateValue4(
      dataInformationValueParse.flotatranspac
    );
    verticalAnalysisObject.depreacuac = this.calculateValue4(
      dataInformationValueParse.depreacuac
    );
    verticalAnalysisObject.subtppe = this.calculateValue4(
      dataInformationValueParse.subtppe
    );
    verticalAnalysisObject.knowhowac = this.calculateValue4(
      dataInformationValueParse.knowhowac
    );
    verticalAnalysisObject.diferidosac = this.calculateValue4(
      dataInformationValueParse.diferidosac
    );
      verticalAnalysisObject.amortizacionesac = this.calculateValue4(
      dataInformationValueParse.amortizacionesac
    );
      verticalAnalysisObject.inversiontvac = this.calculateValue4(
      dataInformationValueParse.inversiontvac
    );
      verticalAnalysisObject.otrosacac = this.calculateValue4(
      dataInformationValueParse.otrosacac
    );
      verticalAnalysisObject.subtoaac = this.calculateValue4(
      dataInformationValueParse.subtoaac
    );
      verticalAnalysisObject.totalactiac = this.calculateValue4(
      dataInformationValueParse.totalactiac
    );
      verticalAnalysisObject.ofcbac = this.calculateValue5(
      dataInformationValueParse.ofcbac
    );
    verticalAnalysisObject.ofcoecac = this.calculateValue5(
      dataInformationValueParse.ofcoecac
    );
    verticalAnalysisObject.obliavac = this.calculateValue5(
      dataInformationValueParse.obliavac
    );
    verticalAnalysisObject.cpcobraac = this.calculateValue5(
      dataInformationValueParse.cpcobraac
    );
    verticalAnalysisObject.provnaac = this.calculateValue5(
      dataInformationValueParse.provnaac
    );
    verticalAnalysisObject.provexac = this.calculateValue5(
      dataInformationValueParse.provexac
    );
     verticalAnalysisObject.cogaspac = this.calculateValue5(
      dataInformationValueParse.cogaspac
    );
     verticalAnalysisObject.dividendosac = this.calculateValue5(
      dataInformationValueParse.dividendosac
    );
     verticalAnalysisObject.retenfueac = this.calculateValue5(
      dataInformationValueParse.retenfueac
    );
    verticalAnalysisObject.ivaac = this.calculateValue5(
      dataInformationValueParse.ivaac
    );
    verticalAnalysisObject.impuestorac = this.calculateValue5(
      dataInformationValueParse.impuestorac
    );
    verticalAnalysisObject.oblilaac = this.calculateValue5(
      dataInformationValueParse.oblilaac
    );
    verticalAnalysisObject.ingresoreciac = this.calculateValue5(
      dataInformationValueParse.ingresoreciac
    );
    verticalAnalysisObject.subtopcac = this.calculateValue5(
      dataInformationValueParse.subtopcac
    );
    verticalAnalysisObject.oflpbaac = this.calculateValue5(
      dataInformationValueParse.oflpbaac
    );
    verticalAnalysisObject.oflpac = this.calculateValue5(
      dataInformationValueParse.oflpac
    );
    verticalAnalysisObject.cartascac = this.calculateValue5(
      dataInformationValueParse.cartascac
    );
    verticalAnalysisObject.subtoplac = this.calculateValue5(
      dataInformationValueParse.subtoplac
    );
    verticalAnalysisObject.casuypac = this.calculateValue5(
      dataInformationValueParse.casuypac
    );
    verticalAnalysisObject.aportsac = this.calculateValue5(
      dataInformationValueParse.aportsac
    );
    verticalAnalysisObject.caperac = this.calculateValue5(
      dataInformationValueParse.caperac
    );
    verticalAnalysisObject.reserlac = this.calculateValue5(
      dataInformationValueParse.reserlac
    );
    verticalAnalysisObject.otrasresac = this.calculateValue5(
      dataInformationValueParse.otrasresac
    );
     verticalAnalysisObject.utiliejerac = this.calculateValue5(
      dataInformationValueParse.utiliejerac
    );
     verticalAnalysisObject.perdejerac = this.calculateValue5(
      dataInformationValueParse.perdejerac
    );
     verticalAnalysisObject.utiliacumuac = this.calculateValue5(
      dataInformationValueParse.utiliacumuac
    );
    verticalAnalysisObject.subtopatac = this.calculateValue5(
      dataInformationValueParse.subtopatac
    );
    verticalAnalysisObject.totalfinanac = this.calculateValue5(
      dataInformationValueParse.totalfinanac
    );
     verticalAnalysisObject.cajasubtotal = this.calculateValue6(
      dataInformationValueParse.cajaac
    );
    verticalAnalysisObject.bancossubtotal = this.calculateValue6(
      dataInformationValueParse.bancoac
    );
    verticalAnalysisObject.invervitsubtotal = this.calculateValue6(
      dataInformationValueParse.invervitvac
    );
    verticalAnalysisObject.deudorclsubtotal = this.calculateValue6(
      dataInformationValueParse.deudorclienac
    );
    verticalAnalysisObject.provisionsubtot = this.calculateValue6(
      dataInformationValueParse.provisiondeac
    );
    verticalAnalysisObject.invemeracsubt = this.calculateValue6(
      dataInformationValueParse.invemerac
    );


    verticalAnalysisObject.terrenosubtot = this.calculateValue7(
      dataInformationValueParse.terrenoac
    );
    verticalAnalysisObject.construccisubt = this.calculateValue7(
      dataInformationValueParse.construccionac
    );
    verticalAnalysisObject.equiofisubt = this.calculateValue7(
      dataInformationValueParse.equioficac
    );
    verticalAnalysisObject.equipocomsubt = this.calculateValue7(
      dataInformationValueParse.equipocompuac
    );
    verticalAnalysisObject.flotatrasubtot = this.calculateValue7(
      dataInformationValueParse.flotatranspac
    );
    verticalAnalysisObject.depreasubt = this.calculateValue7(
      dataInformationValueParse.depreacuac
    );



    verticalAnalysisObject.knowsubtot = this.calculateValue8(
      dataInformationValueParse.knowhowac
    );
    verticalAnalysisObject.diferisubt = this.calculateValue8(
      dataInformationValueParse.diferidosac
    );
    verticalAnalysisObject.amortizasubtot = this.calculateValue8(
      dataInformationValueParse.amortizacionesac
    );
    verticalAnalysisObject.inversionsubto = this.calculateValue8(
      dataInformationValueParse.inversiontvac
    );
    verticalAnalysisObject.otrosacsubt = this.calculateValue8(
      dataInformationValueParse.otrosacac
    );



    verticalAnalysisObject.ofcbacsubt = this.calculateValue9(
      dataInformationValueParse.ofcbac
    );
    verticalAnalysisObject.ofcoesubt = this.calculateValue9(
      dataInformationValueParse.ofcoecac
    );
    verticalAnalysisObject.obliasubt = this.calculateValue9(
      dataInformationValueParse.obliavac
    );
    verticalAnalysisObject.cpcobsubt = this.calculateValue9(
      dataInformationValueParse.cpcobraac
    );
    verticalAnalysisObject.provnasubto = this.calculateValue9(
      dataInformationValueParse.provnaac
    );
    verticalAnalysisObject.provesubt = this.calculateValue9(
      dataInformationValueParse.provexac
    );
    verticalAnalysisObject.cogassubt = this.calculateValue9(
      dataInformationValueParse.cogaspac
    );
    verticalAnalysisObject.dividesubt = this.calculateValue9(
      dataInformationValueParse.dividendosac
    );
    verticalAnalysisObject.retensubto = this.calculateValue9(
      dataInformationValueParse.retenfueac
    );
    verticalAnalysisObject.ivasub = this.calculateValue9(
      dataInformationValueParse.ivaac
    );
    verticalAnalysisObject.impuestsubt = this.calculateValue9(
      dataInformationValueParse.impuestorac
    );
    verticalAnalysisObject.oblisubt = this.calculateValue9(
      dataInformationValueParse.oblilaac
    );
    verticalAnalysisObject.ingressubt = this.calculateValue9(
      dataInformationValueParse.ingresoreciac
    );

    verticalAnalysisObject.oflpsubto = this.calculateValue10(
      dataInformationValueParse.oflpbaac
    );
    verticalAnalysisObject.oflsubt = this.calculateValue10(
      dataInformationValueParse.oflpac
    );
    verticalAnalysisObject.cartasubt = this.calculateValue10(
      dataInformationValueParse.cartascac
    );


    verticalAnalysisObject.casuysubt = this.calculateValue11(
      dataInformationValueParse.casuypac
    );
    verticalAnalysisObject.aportsubt = this.calculateValue11(
      dataInformationValueParse.aportsac
    );
    verticalAnalysisObject.capesubt = this.calculateValue11(
      dataInformationValueParse.caperac
    );
     verticalAnalysisObject.resersubt = this.calculateValue17(
      this.dataInformationByYear.reserlac
    );
    verticalAnalysisObject.otrasrsubt = this.calculateValue11(
      dataInformationValueParse.otrasresac
    );
    verticalAnalysisObject.utilisubt = this.calculateValue11(
      dataInformationValueParse.utiliejerac
    );
    verticalAnalysisObject.perdesubt = this.calculateValue11(
      dataInformationValueParse.perdejerac
    );
    verticalAnalysisObject.utiliacsubt = this.calculateValue11(
      dataInformationValueParse.utiliacumuac
    );

    return verticalAnalysisObject;
  }

  calculateValue(value: number) {
    //console.log("calculateValue value :",value);
    //console.log("calculateValue baseValue:",this.baseValue);
    const result = parseFloat(((value / this.baseValue) * 100).toFixed(1)) ?? 0;
    //console.log("calculateValue result :",result);
    return isNaN(result) ? 0 : result;
  }
  calculateValue2(value: number) {
    //console.log("calculateValue2 value :",value);
    //console.log("calculateValue2 totalactias:",this.dataInformationByYear.totalactias);
    const result = parseFloat(((value / this.dataInformationByYear.totalactias) * 100).toFixed(1)) ?? 0;
    //console.log("calculateValue2 result :",result);
    return isNaN(result) ? 0 : result;
  }
  calculateValue3(value: number) {
    //console.log("calculateValue2 value :",value);
    //console.log("calculateValue2 totalactias:",this.dataInformationByYear.totalfinanas);
    const result = parseFloat(((value / this.dataInformationByYear.totalfinanas) * 100).toFixed(1)) ?? 0;
    //console.log("calculateValue2 result :",result);
    return isNaN(result) ? 0 : result;
  }
  calculateValue4(value: number) {
    //console.log("calculateValue2 value :",value);
    //console.log("calculateValue2 totalactias:",this.dataInformationByYear.totalactiac);
    const result = parseFloat(((value / this.dataInformationByYear.totalactiac) * 100).toFixed(1)) ?? 0;
    //console.log("calculateValue2 result :",result);
    return isNaN(result) ? 0 : result;
  }
  calculateValue5(value: number) {
    //console.log("calculateValue2 value :",value);
    //console.log("calculateValue2 totalactias:",this.dataInformationByYear.totalfinanac);
    const result = parseFloat(((value / this.dataInformationByYear.totalfinanac) * 100).toFixed(1)) ?? 0;
    //console.log("calculateValue2 result :",result);
    return isNaN(result) ? 0 : result;
  }

  calculateValue6(value: number) {
    //console.log("calculateValue6 value :",value);
    const result = parseFloat(((value / this.dataInformationByYear.subaccomer) * 100).toFixed(1)) ?? 0;
    return isNaN(result) ? 0 : result;
  }
  calculateValue7(value: number) {
    //console.log("calculateValue7 value :",value);
    const result = parseFloat(((value / this.dataInformationByYear.subtppe) * 100).toFixed(1)) ?? 0;
    return isNaN(result) ? 0 : result;
  }
  calculateValue8(value: number) {
    //console.log("calculateValue8 value :",value);
    const result = parseFloat(((value / this.dataInformationByYear.subtoaac) * 100).toFixed(1)) ?? 0;
    return isNaN(result) ? 0 : result;
  }

  calculateValue9(value: number) {
    //console.log("calculateValue9 value :",value);
    const result = parseFloat(((value / this.dataInformationByYear.subtopcac) * 100).toFixed(1)) ?? 0;
    return isNaN(result) ? 0 : result;
  }
  calculateValue10(value: number) {
    //console.log("calculateValue10 value :",value);
    const result = parseFloat(((value / this.dataInformationByYear.subtoplac) * 100).toFixed(1)) ?? 0;
    return isNaN(result) ? 0 : result;
  }
  calculateValue11(value: number) {
    //console.log("calculateValue10 value :",value);
    const result = parseFloat(((value / this.dataInformationByYear.subtopatac) * 100).toFixed(1)) ?? 0;
    return isNaN(result) ? 0 : result;
  }
  calculateValue12(value: number) {  
    //console.log("calculateValue10 value :",value);
    const result = parseFloat(((value / this.dataInformationByYear.subactcorr) * 100).toFixed(1)) ?? 0;
    return isNaN(result) ? 0 : result;
  }
  calculateValue13(value: number) {
    // console.log("calculateValue10 value :",value);
    const result = parseFloat(((value / this.dataInformationByYear.subppea) * 100).toFixed(1)) ?? 0;
    return isNaN(result) ? 0 : result;
  }
   calculateValue14(value: number) {
    // console.log("calculateValue10 value :",value);
    const result = parseFloat(((value / this.dataInformationByYear.subtoact) * 100).toFixed(1)) ?? 0;
    return isNaN(result) ? 0 : result;
  }
   calculateValue15(value: number) {
    //console.log("calculateValue10 value :",value);
    const result = parseFloat(((value / this.dataInformationByYear.subpascorr) * 100).toFixed(1)) ?? 0;
    return isNaN(result) ? 0 : result;
  }
  calculateValue16(value: number) {
    //console.log("calculateValue10 value :",value);
    const result = parseFloat(((value / this.dataInformationByYear.subpalarp) * 100).toFixed(1)) ?? 0;
    return isNaN(result) ? 0 : result;
  }
  calculateValue17(value: number) {
   // console.log("calculateValue10 value :",value);
    const result = parseFloat(((value / this.dataInformationByYear.subpatrim) * 100).toFixed(1)) ?? 0;
    return isNaN(result) ? 0 : result;
  }
}
