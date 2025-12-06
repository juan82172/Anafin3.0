import { HorizontalAnalyticsClassByYearInterface } from "@/interfaces/analyticsInterfaces/AnalyticsProps";
import {
  ServiceInformationInterface,
  CommercialInformationInterface,
} from "@/interfaces/dataInterfaces/DataContextProps";
import {
  CommercialInformation,
  ServiceInformation,
} from "../dataClasses/DataClass";

export class HorizontalAnalyticsClassByYear
  implements HorizontalAnalyticsClassByYearInterface
{
  dataInformationByYear:
    | ServiceInformationInterface
    | CommercialInformationInterface;
  dataInformationBaseYear:
    | ServiceInformationInterface
    | CommercialInformationInterface;
  type: "service" | "commercial" | null;

  constructor(
    dataInformationByYear:
      | ServiceInformationInterface
      | CommercialInformationInterface,
    dataInformationBaseYear:
      | ServiceInformationInterface
      | CommercialInformationInterface,
    type: "service" | "commercial" | null
  ) {
    this.dataInformationBaseYear = dataInformationBaseYear;
    this.dataInformationByYear = dataInformationByYear;
    this.type = type;
  }

  generateHorizontalAnalysis() {
    if (this.type === "service") {
      return this.generateServiceHorizontalAnalysis();
    } else if (this.type === "commercial") {
      return this.generateCommercialHorizontalAnalysis();
    } else {
      return null;
    }
  }
  generateServiceHorizontalAnalysis() {
    const horizontalAnalysisObject = new ServiceInformation(
      `${this.dataInformationBaseYear.currentYear} - ${this.dataInformationByYear.currentYear}`
    );
    horizontalAnalysisObject.creditIncome = this.calculateValue(
      this.dataInformationBaseYear.creditIncome,
      this.dataInformationByYear.creditIncome
    );
    horizontalAnalysisObject.cashIncome = this.calculateValue(
      this.dataInformationBaseYear.cashIncome,
      this.dataInformationByYear.cashIncome
    );
    horizontalAnalysisObject.grossSales = this.calculateValue(
      this.dataInformationBaseYear.grossSales,
      this.dataInformationByYear.grossSales
    );
    horizontalAnalysisObject.operatingSalesExpenses = this.calculateValue(
      this.dataInformationBaseYear.operatingSalesExpenses,
      this.dataInformationByYear.operatingSalesExpenses
    );
    horizontalAnalysisObject.administrativeOperatingExpenses =
      this.calculateValue(
        this.dataInformationBaseYear.administrativeOperatingExpenses,
        this.dataInformationByYear.administrativeOperatingExpenses
      );
    horizontalAnalysisObject.operatingProfit = this.calculateValue(
      this.dataInformationBaseYear.operatingProfit,
      this.dataInformationByYear.operatingProfit
    );
    horizontalAnalysisObject.financialIncome = this.calculateValue(
      this.dataInformationBaseYear.financialIncome,
      this.dataInformationByYear.financialIncome
    );
    horizontalAnalysisObject.financialExpenses = this.calculateValue(
      this.dataInformationBaseYear.financialExpenses,
      this.dataInformationByYear.financialExpenses
    );
    horizontalAnalysisObject.extraordinaryIncome = this.calculateValue(
      this.dataInformationBaseYear.extraordinaryIncome,
      this.dataInformationByYear.extraordinaryIncome
    );
    horizontalAnalysisObject.extraordinaryExpenses = this.calculateValue(
      this.dataInformationBaseYear.extraordinaryExpenses,
      this.dataInformationByYear.extraordinaryExpenses
    );
    horizontalAnalysisObject.profitBeforeTax = this.calculateValue(
      this.dataInformationBaseYear.profitBeforeTax,
      this.dataInformationByYear.profitBeforeTax
    );
    horizontalAnalysisObject.incomeTax = this.calculateValue(
      this.dataInformationBaseYear.incomeTax,
      this.dataInformationByYear.incomeTax
    );
    horizontalAnalysisObject.netIncome = this.calculateValue(
      this.dataInformationBaseYear.netIncome,
      this.dataInformationByYear.netIncome
    );

    //balance general

    horizontalAnalysisObject.cajaacva = this.calculateValue(
      this.dataInformationBaseYear.cajaac,
      this.dataInformationByYear.cajaac
    );
    horizontalAnalysisObject.cajaac = this.calculateValue2(
      this.dataInformationBaseYear.cajaac,
      this.dataInformationByYear.cajaac
    );
    horizontalAnalysisObject.bancos = this.calculateValue(
      this.dataInformationBaseYear.bancos,
      this.dataInformationByYear.bancos
    );
      horizontalAnalysisObject.bancosva = this.calculateValue2(
      this.dataInformationBaseYear.bancos,
      this.dataInformationByYear.bancos
    );
    horizontalAnalysisObject.inversiontv = this.calculateValue(
      this.dataInformationBaseYear.inversiontv,
      this.dataInformationByYear.inversiontv
    );
    horizontalAnalysisObject.inversiontvva = this.calculateValue2(
      this.dataInformationBaseYear.inversiontv,
      this.dataInformationByYear.inversiontv
    );
    horizontalAnalysisObject.deudorclien = this.calculateValue(
      this.dataInformationBaseYear.deudorclien,
      this.dataInformationByYear.deudorclien
    );
    horizontalAnalysisObject.deudorclienva = this.calculateValue2(
      this.dataInformationBaseYear.deudorclien,
      this.dataInformationByYear.deudorclien
    );
    horizontalAnalysisObject.provisiondeudor = this.calculateValue(
      this.dataInformationBaseYear.provisiondeudor,
      this.dataInformationByYear.provisiondeudor
    );
     horizontalAnalysisObject.provisiondeudorva = this.calculateValue2(
      this.dataInformationBaseYear.provisiondeudor,
      this.dataInformationByYear.provisiondeudor
    );
    horizontalAnalysisObject.subactcorr = this.calculateValue(
      this.dataInformationBaseYear.subactcorr,
      this.dataInformationByYear.subactcorr
    );
    horizontalAnalysisObject.subactcorrva = this.calculateValue2(
      this.dataInformationBaseYear.subactcorr,
      this.dataInformationByYear.subactcorr
    );
    horizontalAnalysisObject.Terrenosac = this.calculateValue(
      this.dataInformationBaseYear.Terrenosac,
      this.dataInformationByYear.Terrenosac
    );
     horizontalAnalysisObject.Terrenosacva = this.calculateValue2(
      this.dataInformationBaseYear.Terrenosac,
      this.dataInformationByYear.Terrenosac
    );
    horizontalAnalysisObject.construccion = this.calculateValue(
      this.dataInformationBaseYear.construccion,
      this.dataInformationByYear.construccion
    );
    horizontalAnalysisObject.construccionva = this.calculateValue2(
      this.dataInformationBaseYear.construccion,
      this.dataInformationByYear.construccion
    );
    horizontalAnalysisObject.equiofic = this.calculateValue(
      this.dataInformationBaseYear.equiofic,
      this.dataInformationByYear.equiofic
    );
     horizontalAnalysisObject.equioficva = this.calculateValue2(
      this.dataInformationBaseYear.equiofic,
      this.dataInformationByYear.equiofic
    );
    horizontalAnalysisObject.equipocompu = this.calculateValue(
      this.dataInformationBaseYear.equipocompu,
      this.dataInformationByYear.equipocompu
    );
     horizontalAnalysisObject.equipocompuva = this.calculateValue2(
      this.dataInformationBaseYear.equipocompu,
      this.dataInformationByYear.equipocompu
    );
    horizontalAnalysisObject.laboratorio = this.calculateValue(
      this.dataInformationBaseYear.laboratorio,
      this.dataInformationByYear.laboratorio
    );
    horizontalAnalysisObject.laboratoriova = this.calculateValue2(
      this.dataInformationBaseYear.laboratorio,
      this.dataInformationByYear.laboratorio
    );
    horizontalAnalysisObject.flotatransporte = this.calculateValue(
      this.dataInformationBaseYear.flotatransporte,
      this.dataInformationByYear.flotatransporte
    );
    horizontalAnalysisObject.flotatransporteva = this.calculateValue2(
      this.dataInformationBaseYear.flotatransporte,
      this.dataInformationByYear.flotatransporte
    );
    horizontalAnalysisObject.depreacumula = this.calculateValue(
      this.dataInformationBaseYear.depreacumula,
      this.dataInformationByYear.depreacumula
    );
     horizontalAnalysisObject.depreacumulava = this.calculateValue2(
      this.dataInformationBaseYear.depreacumula,
      this.dataInformationByYear.depreacumula
    );
    horizontalAnalysisObject.subppea = this.calculateValue(
      this.dataInformationBaseYear.subppea,
      this.dataInformationByYear.subppea
    );
    horizontalAnalysisObject.subppeava = this.calculateValue2(
      this.dataInformationBaseYear.subppea,
      this.dataInformationByYear.subppea
    );
    horizontalAnalysisObject.patentes = this.calculateValue(
      this.dataInformationBaseYear.patentes,
      this.dataInformationByYear.patentes
    );
     horizontalAnalysisObject.patentesva = this.calculateValue2(
      this.dataInformationBaseYear.patentes,
      this.dataInformationByYear.patentes
    );
    horizontalAnalysisObject.knowhow = this.calculateValue(
      this.dataInformationBaseYear.knowhow,
      this.dataInformationByYear.knowhow
    );
    horizontalAnalysisObject.knowhowva = this.calculateValue2(
      this.dataInformationBaseYear.knowhow,
      this.dataInformationByYear.knowhow
    );
    horizontalAnalysisObject.diferidos = this.calculateValue(
      this.dataInformationBaseYear.diferidos,
      this.dataInformationByYear.diferidos
    );
    horizontalAnalysisObject.diferidosva = this.calculateValue2(
      this.dataInformationBaseYear.diferidos,
      this.dataInformationByYear.diferidos
    );
    horizontalAnalysisObject.amortiza = this.calculateValue(
      this.dataInformationBaseYear.amortiza,
      this.dataInformationByYear.amortiza
    );
     horizontalAnalysisObject.amortizava = this.calculateValue2(
      this.dataInformationBaseYear.amortiza,
      this.dataInformationByYear.amortiza
    );
    horizontalAnalysisObject.invertvlargo = this.calculateValue(
      this.dataInformationBaseYear.invertvlargo,
      this.dataInformationByYear.invertvlargo
    );
    horizontalAnalysisObject.invertvlargova = this.calculateValue2(
      this.dataInformationBaseYear.invertvlargo,
      this.dataInformationByYear.invertvlargo
    );
    horizontalAnalysisObject.otrosa = this.calculateValue(
      this.dataInformationBaseYear.otrosa,
      this.dataInformationByYear.otrosa
    );
    horizontalAnalysisObject.otrosava = this.calculateValue2(
      this.dataInformationBaseYear.otrosa,
      this.dataInformationByYear.otrosa
    );
    horizontalAnalysisObject.subtoact = this.calculateValue(
      this.dataInformationBaseYear.subtoact,
      this.dataInformationByYear.subtoact
    );
    horizontalAnalysisObject.subtoactva = this.calculateValue2(
      this.dataInformationBaseYear.subtoact,
      this.dataInformationByYear.subtoact
    );
    horizontalAnalysisObject.totalactias = this.calculateValue(
      this.dataInformationBaseYear.totalactias,
      this.dataInformationByYear.totalactias
    );
    horizontalAnalysisObject.totalactiasva = this.calculateValue2(
      this.dataInformationBaseYear.totalactias,
      this.dataInformationByYear.totalactias
    );
    horizontalAnalysisObject.obficb = this.calculateValue(
      this.dataInformationBaseYear.obficb,
      this.dataInformationByYear.obficb
    );
      horizontalAnalysisObject.obficbva = this.calculateValue2(
      this.dataInformationBaseYear.obficb,
      this.dataInformationByYear.obficb
    );
    horizontalAnalysisObject.obficonoen = this.calculateValue(
      this.dataInformationBaseYear.obficonoen,
      this.dataInformationByYear.obficonoen
    );
    horizontalAnalysisObject.obficonoenva = this.calculateValue2(
      this.dataInformationBaseYear.obficonoen,
      this.dataInformationByYear.obficonoen
    );
    horizontalAnalysisObject.otrobli = this.calculateValue(
      this.dataInformationBaseYear.otrobli,
      this.dataInformationByYear.otrobli
    );
     horizontalAnalysisObject.otrobliva = this.calculateValue2(
      this.dataInformationBaseYear.otrobli,
      this.dataInformationByYear.otrobli
    );
    horizontalAnalysisObject.cuenporpa = this.calculateValue(
      this.dataInformationBaseYear.cuenporpa,
      this.dataInformationByYear.cuenporpa
    );
    horizontalAnalysisObject.cuenporpava = this.calculateValue2(
      this.dataInformationBaseYear.cuenporpa,
      this.dataInformationByYear.cuenporpa
    );
    horizontalAnalysisObject.cosgasp = this.calculateValue(
      this.dataInformationBaseYear.cosgasp,
      this.dataInformationByYear.cosgasp
    );
     horizontalAnalysisObject.cosgaspva = this.calculateValue2(
      this.dataInformationBaseYear.cosgasp,
      this.dataInformationByYear.cosgasp
    );
    horizontalAnalysisObject.dividenparti = this.calculateValue(
      this.dataInformationBaseYear.dividenparti,
      this.dataInformationByYear.dividenparti
    );
     horizontalAnalysisObject.dividenpartiva = this.calculateValue2(
      this.dataInformationBaseYear.dividenparti,
      this.dataInformationByYear.dividenparti
    );
     horizontalAnalysisObject.retenfue = this.calculateValue(
      this.dataInformationBaseYear.retenfue,
      this.dataInformationByYear.retenfue
    );
     horizontalAnalysisObject.retenfueva = this.calculateValue2(
      this.dataInformationBaseYear.retenfue,
      this.dataInformationByYear.retenfue
    );
     horizontalAnalysisObject.iva = this.calculateValue(
      this.dataInformationBaseYear.iva,
      this.dataInformationByYear.iva
    );
    horizontalAnalysisObject.ivava = this.calculateValue2(
      this.dataInformationBaseYear.iva,
      this.dataInformationByYear.iva
    );
     horizontalAnalysisObject.impuesto = this.calculateValue(
      this.dataInformationBaseYear.impuesto,
      this.dataInformationByYear.impuesto
    );
    horizontalAnalysisObject.impuestova = this.calculateValue2(
      this.dataInformationBaseYear.impuesto,
      this.dataInformationByYear.impuesto
    );
     horizontalAnalysisObject.obligacionlabo = this.calculateValue(
      this.dataInformationBaseYear.obligacionlabo,
      this.dataInformationByYear.obligacionlabo
    );
     horizontalAnalysisObject.obligacionlabova = this.calculateValue2(
      this.dataInformationBaseYear.obligacionlabo,
      this.dataInformationByYear.obligacionlabo
    );
    horizontalAnalysisObject.ingresosrecibi = this.calculateValue(
      this.dataInformationBaseYear.ingresosrecibi,
      this.dataInformationByYear.ingresosrecibi
    );
    horizontalAnalysisObject.ingresosrecibiva = this.calculateValue2(
      this.dataInformationBaseYear.ingresosrecibi,
      this.dataInformationByYear.ingresosrecibi
    );
    horizontalAnalysisObject.subpascorr = this.calculateValue(
      this.dataInformationBaseYear.subpascorr,
      this.dataInformationByYear.subpascorr
    );
     horizontalAnalysisObject.subpascorrva = this.calculateValue2(
      this.dataInformationBaseYear.subpascorr,
      this.dataInformationByYear.subpascorr
    );
    horizontalAnalysisObject.oflpbanco = this.calculateValue(
      this.dataInformationBaseYear.oflpbanco,
      this.dataInformationByYear.oflpbanco
    );
    horizontalAnalysisObject.oflpbancova = this.calculateValue2(
      this.dataInformationBaseYear.oflpbanco,
      this.dataInformationByYear.oflpbanco
    );
    horizontalAnalysisObject.oflpoenti = this.calculateValue(
      this.dataInformationBaseYear.oflpoenti,
      this.dataInformationByYear.oflpoenti
    );
    horizontalAnalysisObject.oflpoentiva = this.calculateValue2(
      this.dataInformationBaseYear.oflpoenti,
      this.dataInformationByYear.oflpoenti
    );
    horizontalAnalysisObject.subpalarp = this.calculateValue(
      this.dataInformationBaseYear.subpalarp,
      this.dataInformationByYear.subpalarp
    );
    horizontalAnalysisObject.subpalarpva = this.calculateValue2(
      this.dataInformationBaseYear.subpalarp,
      this.dataInformationByYear.subpalarp
    );
    horizontalAnalysisObject.capitalsp = this.calculateValue(
      this.dataInformationBaseYear.capitalsp,
      this.dataInformationByYear.capitalsp
    );
     horizontalAnalysisObject.capitalspva = this.calculateValue2(
      this.dataInformationBaseYear.capitalsp,
      this.dataInformationByYear.capitalsp
    );
    horizontalAnalysisObject.aportess = this.calculateValue(
      this.dataInformationBaseYear.aportess,
      this.dataInformationByYear.aportess
    );
     horizontalAnalysisObject.aportessva = this.calculateValue2(
      this.dataInformationBaseYear.aportess,
      this.dataInformationByYear.aportess
    );
    horizontalAnalysisObject.capitapn = this.calculateValue(
      this.dataInformationBaseYear.capitapn,
      this.dataInformationByYear.capitapn
    );
    horizontalAnalysisObject.capitapnva = this.calculateValue2(
      this.dataInformationBaseYear.capitapn,
      this.dataInformationByYear.capitapn
    );
    horizontalAnalysisObject.reservasl = this.calculateValue(
      this.dataInformationBaseYear.reservasl,
      this.dataInformationByYear.reservasl
    );
     horizontalAnalysisObject.reservaslva = this.calculateValue2(
      this.dataInformationBaseYear.reservasl,
      this.dataInformationByYear.reservasl
    );
    horizontalAnalysisObject.otrasres = this.calculateValue(
      this.dataInformationBaseYear.otrasres,
      this.dataInformationByYear.otrasres
    );
     horizontalAnalysisObject.otrasresva = this.calculateValue2(
      this.dataInformationBaseYear.otrasres,
      this.dataInformationByYear.otrasres
    );
    horizontalAnalysisObject.utiliejer = this.calculateValue(
      this.dataInformationBaseYear.utiliejer,
      this.dataInformationByYear.utiliejer
    );
     horizontalAnalysisObject.utiliejerva = this.calculateValue2(
      this.dataInformationBaseYear.utiliejer,
      this.dataInformationByYear.utiliejer
    );
    horizontalAnalysisObject.perdidaeje = this.calculateValue(
      this.dataInformationBaseYear.perdidaeje,
      this.dataInformationByYear.perdidaeje
    );
    horizontalAnalysisObject.perdidaejeva = this.calculateValue2(
      this.dataInformationBaseYear.perdidaeje,
      this.dataInformationByYear.perdidaeje
    );
    horizontalAnalysisObject.utiliacumula = this.calculateValue(
      this.dataInformationBaseYear.utiliacumula,
      this.dataInformationByYear.utiliacumula
    );
    horizontalAnalysisObject.utiliacumulava = this.calculateValue2(
      this.dataInformationBaseYear.utiliacumula,
      this.dataInformationByYear.utiliacumula
    );
    horizontalAnalysisObject.subpatrim = this.calculateValue(
      this.dataInformationBaseYear.subpatrim,
      this.dataInformationByYear.subpatrim
    );
    horizontalAnalysisObject.subpatrimva = this.calculateValue2(
      this.dataInformationBaseYear.subpatrim,
      this.dataInformationByYear.subpatrim
    );
    horizontalAnalysisObject.totalfinanas = this.calculateValue(
      this.dataInformationBaseYear.totalfinanas,
      this.dataInformationByYear.totalfinanas
    );
     horizontalAnalysisObject.totalfinanasva = this.calculateValue2(
      this.dataInformationBaseYear.totalfinanas,
      this.dataInformationByYear.totalfinanas
    );
    return horizontalAnalysisObject;
  }
  generateCommercialHorizontalAnalysis() {
    const dataInformationValueParse = this
      .dataInformationByYear as CommercialInformationInterface;
    const dataInformationValueParseBase = this
      .dataInformationBaseYear as CommercialInformationInterface;
    const horizontalAnalysisObject = new CommercialInformation(
      `${this.dataInformationBaseYear.currentYear} - ${this.dataInformationByYear.currentYear}`
    );
    horizontalAnalysisObject.creditIncome = this.calculateValue(
      dataInformationValueParseBase.creditIncome,
      dataInformationValueParse.creditIncome
    );
    horizontalAnalysisObject.cashIncome = this.calculateValue(
      dataInformationValueParseBase.cashIncome,
      dataInformationValueParse.cashIncome
    );
    horizontalAnalysisObject.grossSales = this.calculateValue(
      dataInformationValueParseBase.grossSales,
      dataInformationValueParse.grossSales
    );
    horizontalAnalysisObject.returnsAndDiscounts = this.calculateValue(
      dataInformationValueParseBase.returnsAndDiscounts,
      dataInformationValueParse.returnsAndDiscounts
    );
    horizontalAnalysisObject.netSales = this.calculateValue(
      dataInformationValueParseBase.netSales,
      dataInformationValueParse.netSales
    );
    horizontalAnalysisObject.initialInventory = this.calculateValue(
      dataInformationValueParseBase.initialInventory,
      dataInformationValueParse.initialInventory
    );
    horizontalAnalysisObject.finalInventory = this.calculateValue(
      dataInformationValueParseBase.finalInventory,
      dataInformationValueParse.finalInventory
    );
    horizontalAnalysisObject.purchasesCredit = this.calculateValue(
      dataInformationValueParseBase.purchasesCredit,
      dataInformationValueParse.purchasesCredit
    );
    horizontalAnalysisObject.purchasesCash = this.calculateValue(
      dataInformationValueParseBase.purchasesCash,
      dataInformationValueParse.purchasesCash
    );
    horizontalAnalysisObject.costOfSales = this.calculateValue(
      dataInformationValueParseBase.costOfSales,
      dataInformationValueParse.costOfSales
    );
    horizontalAnalysisObject.grossOperatingIncome = this.calculateValue(
      dataInformationValueParseBase.grossOperatingIncome,
      dataInformationValueParse.grossOperatingIncome
    );
    horizontalAnalysisObject.operatingSalesExpenses = this.calculateValue(
      dataInformationValueParseBase.operatingSalesExpenses,
      dataInformationValueParse.operatingSalesExpenses
    );
    horizontalAnalysisObject.administrativeOperatingExpenses =
      this.calculateValue(
        dataInformationValueParseBase.administrativeOperatingExpenses,
        dataInformationValueParse.administrativeOperatingExpenses
      );
    horizontalAnalysisObject.generalExpenses = this.calculateValue(
      dataInformationValueParseBase.generalExpenses,
      dataInformationValueParse.generalExpenses
    );
    horizontalAnalysisObject.operatingProfit = this.calculateValue(
      dataInformationValueParseBase.operatingProfit,
      dataInformationValueParse.operatingProfit
    );
    horizontalAnalysisObject.financialIncome = this.calculateValue(
      dataInformationValueParseBase.financialIncome,
      dataInformationValueParse.financialIncome
    );
    horizontalAnalysisObject.financialExpenses = this.calculateValue(
      dataInformationValueParseBase.financialExpenses,
      dataInformationValueParse.financialExpenses
    );
    horizontalAnalysisObject.extraordinaryIncome = this.calculateValue(
      dataInformationValueParseBase.extraordinaryIncome,
      dataInformationValueParse.extraordinaryIncome
    );
    horizontalAnalysisObject.extraordinaryExpenses = this.calculateValue(
      dataInformationValueParseBase.extraordinaryExpenses,
      dataInformationValueParse.extraordinaryExpenses
    );
    horizontalAnalysisObject.profitBeforeTax = this.calculateValue(
      dataInformationValueParseBase.profitBeforeTax,
      dataInformationValueParse.profitBeforeTax
    );
    horizontalAnalysisObject.incomeTax = this.calculateValue(
      dataInformationValueParseBase.incomeTax,
      dataInformationValueParse.incomeTax
    );
    horizontalAnalysisObject.netIncome = this.calculateValue(
      dataInformationValueParseBase.netIncome,
      dataInformationValueParse.netIncome
    );
    horizontalAnalysisObject.netIncome = this.calculateValue(
      dataInformationValueParseBase.netIncome,
      dataInformationValueParse.netIncome
    );
    horizontalAnalysisObject.netIncome = this.calculateValue(
      dataInformationValueParseBase.netIncome,
      dataInformationValueParse.netIncome
    );

    //balance general comercial
    
    horizontalAnalysisObject.cajaac = this.calculateValue(
      dataInformationValueParseBase.cajaac,
      dataInformationValueParse.cajaac
    );
     horizontalAnalysisObject.cajaacva = this.calculateValue2(
      dataInformationValueParseBase.cajaac,
      dataInformationValueParse.cajaac
    );
    horizontalAnalysisObject.bancoac = this.calculateValue(
      dataInformationValueParseBase.bancoac,
      dataInformationValueParse.bancoac
    );
    horizontalAnalysisObject.bancoacva = this.calculateValue2(
      dataInformationValueParseBase.bancoac,
      dataInformationValueParse.bancoac
    );
    horizontalAnalysisObject.invervitvac = this.calculateValue(
      dataInformationValueParseBase.invervitvac,
      dataInformationValueParse.invervitvac
    );
    horizontalAnalysisObject.invervitvacva = this.calculateValue2(
      dataInformationValueParseBase.invervitvac,
      dataInformationValueParse.invervitvac
    );
    horizontalAnalysisObject.deudorclienac = this.calculateValue(
      dataInformationValueParseBase.deudorclienac,
      dataInformationValueParse.deudorclienac
    );
     horizontalAnalysisObject.deudorclienacva = this.calculateValue2(
      dataInformationValueParseBase.deudorclienac,
      dataInformationValueParse.deudorclienac
    );
    horizontalAnalysisObject.provisiondeac = this.calculateValue(
      dataInformationValueParseBase.provisiondeac,
      dataInformationValueParse.provisiondeac
    );
    horizontalAnalysisObject.provisiondeac = this.calculateValue2(
      dataInformationValueParseBase.provisiondeacpa,
      dataInformationValueParse.provisiondeac
    );
    horizontalAnalysisObject.invemerac = this.calculateValue(
      dataInformationValueParseBase.invemerac,
      dataInformationValueParse.invemerac
    );
    horizontalAnalysisObject.invemeracva = this.calculateValue2(
      dataInformationValueParseBase.invemerac,
      dataInformationValueParse.invemerac
    );
    horizontalAnalysisObject.subaccomer = this.calculateValue(
      dataInformationValueParseBase.subaccomer,
      dataInformationValueParse.subaccomer
    );
    horizontalAnalysisObject.subaccomerva = this.calculateValue2(
      dataInformationValueParseBase.subaccomer,
      dataInformationValueParse.subaccomer
    );
    horizontalAnalysisObject.terrenoac = this.calculateValue(
      dataInformationValueParseBase.terrenoac,
      dataInformationValueParse.terrenoac
    );
    horizontalAnalysisObject.terrenoacva = this.calculateValue2(
      dataInformationValueParseBase.terrenoac,
      dataInformationValueParse.terrenoac
    );
    horizontalAnalysisObject.construccionac = this.calculateValue(
      dataInformationValueParseBase.construccionac,
      dataInformationValueParse.construccionac
    );
     horizontalAnalysisObject.construccionacva = this.calculateValue2(
      dataInformationValueParseBase.construccionac,
      dataInformationValueParse.construccionac
    );
    horizontalAnalysisObject.equioficac = this.calculateValue(
      dataInformationValueParseBase.equioficac,
      dataInformationValueParse.equioficac
    );
     horizontalAnalysisObject.equioficac = this.calculateValue2(
      dataInformationValueParseBase.equioficacva,
      dataInformationValueParse.equioficac
    );
    horizontalAnalysisObject.equipocompuac = this.calculateValue(
      dataInformationValueParseBase.equipocompuac,
      dataInformationValueParse.equipocompuac
    );
     horizontalAnalysisObject.equipocompuac = this.calculateValue2(
      dataInformationValueParseBase.equipocompuacva,
      dataInformationValueParse.equipocompuac
    );
    horizontalAnalysisObject.flotatranspac = this.calculateValue(
      dataInformationValueParseBase.flotatranspac,
      dataInformationValueParse.flotatranspac
    );
     horizontalAnalysisObject.flotatranspacva = this.calculateValue2(
      dataInformationValueParseBase.flotatranspac,
      dataInformationValueParse.flotatranspac
    );
    horizontalAnalysisObject.depreacuac = this.calculateValue(
      dataInformationValueParseBase.depreacuac,
      dataInformationValueParse.depreacuac
    );
    horizontalAnalysisObject.depreacuacva = this.calculateValue2(
      dataInformationValueParseBase.depreacuac,
      dataInformationValueParse.depreacuac
    );
    horizontalAnalysisObject.subtppe = this.calculateValue(
      dataInformationValueParseBase.subtppe,
      dataInformationValueParse.subtppe
    );
      horizontalAnalysisObject.subtppeva = this.calculateValue2(
      dataInformationValueParseBase.subtppe,
      dataInformationValueParse.subtppe
    );
    horizontalAnalysisObject.knowhowac = this.calculateValue(
      dataInformationValueParseBase.knowhowac,
      dataInformationValueParse.knowhowac
    );
    horizontalAnalysisObject.knowhowacva = this.calculateValue2(
      dataInformationValueParseBase.knowhowac,
      dataInformationValueParse.knowhowac
    );
    horizontalAnalysisObject.diferidosac = this.calculateValue(
      dataInformationValueParseBase.diferidosac,
      dataInformationValueParse.diferidosac
    );
    horizontalAnalysisObject.diferidosacva = this.calculateValue2(
      dataInformationValueParseBase.diferidosac,
      dataInformationValueParse.diferidosac
    );
    horizontalAnalysisObject.amortizacionesac = this.calculateValue(
      dataInformationValueParseBase.amortizacionesac,
      dataInformationValueParse.amortizacionesac
    );
    horizontalAnalysisObject.amortizacionesacva = this.calculateValue2(
      dataInformationValueParseBase.amortizacionesac,
      dataInformationValueParse.amortizacionesac
    );
    horizontalAnalysisObject.inversiontvac = this.calculateValue(
      dataInformationValueParseBase.inversiontvac,
      dataInformationValueParse.inversiontvac
    );
    horizontalAnalysisObject.inversiontvacva = this.calculateValue2(
      dataInformationValueParseBase.inversiontvac,
      dataInformationValueParse.inversiontvac
    );
    horizontalAnalysisObject.otrosacac = this.calculateValue(
      dataInformationValueParseBase.otrosacac,
      dataInformationValueParse.otrosacac
    );
     horizontalAnalysisObject.otrosacacva = this.calculateValue2(
      dataInformationValueParseBase.otrosacac,
      dataInformationValueParse.otrosacac
    );
    horizontalAnalysisObject.subtoaac = this.calculateValue(
      dataInformationValueParseBase.subtoaac,
      dataInformationValueParse.subtoaac
    );
    horizontalAnalysisObject.subtoaacva = this.calculateValue2(
      dataInformationValueParseBase.subtoaac,
      dataInformationValueParse.subtoaac
    );
    horizontalAnalysisObject.totalactiac = this.calculateValue(
      dataInformationValueParseBase.totalactiac,
      dataInformationValueParse.totalactiac
    );
    horizontalAnalysisObject.totalactiacva = this.calculateValue2(
      dataInformationValueParseBase.totalactiac,
      dataInformationValueParse.totalactiac
    );
    horizontalAnalysisObject.ofcbac = this.calculateValue(
      dataInformationValueParseBase.ofcbac,
      dataInformationValueParse.ofcbac
    );
     horizontalAnalysisObject.ofcbacva = this.calculateValue2(
      dataInformationValueParseBase.ofcbac,
      dataInformationValueParse.ofcbac
    );
    horizontalAnalysisObject.ofcoecac = this.calculateValue(
      dataInformationValueParseBase.ofcoecac,
      dataInformationValueParse.ofcoecac
    );
    horizontalAnalysisObject.ofcoecacva = this.calculateValue2(
      dataInformationValueParseBase.ofcoecac,
      dataInformationValueParse.ofcoecac
    );
    horizontalAnalysisObject.obliavac = this.calculateValue(
      dataInformationValueParseBase.obliavac,
      dataInformationValueParse.obliavac
    );
    horizontalAnalysisObject.obliavacva = this.calculateValue2(
      dataInformationValueParseBase.obliavac,
      dataInformationValueParse.obliavac
    );
    horizontalAnalysisObject.cpcobraac = this.calculateValue(
      dataInformationValueParseBase.cpcobraac,
      dataInformationValueParse.cpcobraac
    );
    horizontalAnalysisObject.cpcobraacva = this.calculateValue2(
      dataInformationValueParseBase.cpcobraac,
      dataInformationValueParse.cpcobraac
    );
    horizontalAnalysisObject.provnaac = this.calculateValue(
      dataInformationValueParseBase.provnaac,
      dataInformationValueParse.provnaac
    );
    horizontalAnalysisObject.provnaacva = this.calculateValue2(
      dataInformationValueParseBase.provnaac,
      dataInformationValueParse.provnaac
    );
    horizontalAnalysisObject.provexac = this.calculateValue(
      dataInformationValueParseBase.provexac,
      dataInformationValueParse.provexac
    );
    horizontalAnalysisObject.provexacva = this.calculateValue2(
      dataInformationValueParseBase.provexac,
      dataInformationValueParse.provexac
    );
    horizontalAnalysisObject.cogaspac = this.calculateValue(
      dataInformationValueParseBase.cogaspac,
      dataInformationValueParse.cogaspac
    );
      horizontalAnalysisObject.cogaspacva = this.calculateValue2(
      dataInformationValueParseBase.cogaspac,
      dataInformationValueParse.cogaspac
    );
    horizontalAnalysisObject.dividendosac = this.calculateValue(
      dataInformationValueParseBase.dividendosac,
      dataInformationValueParse.dividendosac
    );
    horizontalAnalysisObject.dividendosacva = this.calculateValue2(
      dataInformationValueParseBase.dividendosac,
      dataInformationValueParse.dividendosac
    );
    horizontalAnalysisObject.retenfueac = this.calculateValue(
      dataInformationValueParseBase.retenfueac,
      dataInformationValueParse.retenfueac
    );
      horizontalAnalysisObject.retenfueacva = this.calculateValue2(
      dataInformationValueParseBase.retenfueac,
      dataInformationValueParse.retenfueac
    );
    horizontalAnalysisObject.ivaac = this.calculateValue(
      dataInformationValueParseBase.ivaac,
      dataInformationValueParse.ivaac
    );
     horizontalAnalysisObject.ivaacva = this.calculateValue2(
      dataInformationValueParseBase.ivaac,
      dataInformationValueParse.ivaac
    );
    horizontalAnalysisObject.impuestorac = this.calculateValue(
      dataInformationValueParseBase.impuestorac,
      dataInformationValueParse.impuestorac
    );
    horizontalAnalysisObject.impuestoracva = this.calculateValue2(
      dataInformationValueParseBase.impuestorac,
      dataInformationValueParse.impuestorac
    );
    horizontalAnalysisObject.oblilaac = this.calculateValue(
      dataInformationValueParseBase.oblilaac,
      dataInformationValueParse.oblilaac
    );
    horizontalAnalysisObject.oblilaacva = this.calculateValue2(
      dataInformationValueParseBase.oblilaac,
      dataInformationValueParse.oblilaac
    );
    horizontalAnalysisObject.ingresoreciac = this.calculateValue(
      dataInformationValueParseBase.ingresoreciac,
      dataInformationValueParse.ingresoreciac
    );
    horizontalAnalysisObject.ingresoreciacva = this.calculateValue2(
      dataInformationValueParseBase.ingresoreciac,
      dataInformationValueParse.ingresoreciac
    );
    horizontalAnalysisObject.subtopcac = this.calculateValue(
      dataInformationValueParseBase.subtopcac,
      dataInformationValueParse.subtopcac
    );
     horizontalAnalysisObject.subtopcacva = this.calculateValue2(
      dataInformationValueParseBase.subtopcac,
      dataInformationValueParse.subtopcac
    );
    horizontalAnalysisObject.oflpbaac = this.calculateValue(
      dataInformationValueParseBase.oflpbaac,
      dataInformationValueParse.oflpbaac
    );
    horizontalAnalysisObject.oflpbaacva = this.calculateValue2(
      dataInformationValueParseBase.oflpbaac,
      dataInformationValueParse.oflpbaac
    );
    horizontalAnalysisObject.oflpac = this.calculateValue(
      dataInformationValueParseBase.oflpac,
      dataInformationValueParse.oflpac
    );
    horizontalAnalysisObject.oflpacva = this.calculateValue2(
      dataInformationValueParseBase.oflpac,
      dataInformationValueParse.oflpac
    );
     horizontalAnalysisObject.cartascac = this.calculateValue(
      dataInformationValueParseBase.cartascac,
      dataInformationValueParse.cartascac
    );
    horizontalAnalysisObject.cartascacva = this.calculateValue2(
      dataInformationValueParseBase.cartascac,
      dataInformationValueParse.cartascac
    );
     horizontalAnalysisObject.subtoplac = this.calculateValue(
      dataInformationValueParseBase.subtoplac,
      dataInformationValueParse.subtoplac
    );
     horizontalAnalysisObject.subtoplacva = this.calculateValue2(
      dataInformationValueParseBase.subtoplac,
      dataInformationValueParse.subtoplac
    );
     horizontalAnalysisObject.casuypac = this.calculateValue(
      dataInformationValueParseBase.casuypac,
      dataInformationValueParse.casuypac
    );
    horizontalAnalysisObject.casuypacva = this.calculateValue2(
      dataInformationValueParseBase.casuypac,
      dataInformationValueParse.casuypac
    );
     horizontalAnalysisObject.aportsac = this.calculateValue(
      dataInformationValueParseBase.aportsac,
      dataInformationValueParse.aportsac
    );
    horizontalAnalysisObject.aportsacva = this.calculateValue2(
      dataInformationValueParseBase.aportsac,
      dataInformationValueParse.aportsac
    );
     horizontalAnalysisObject.caperac = this.calculateValue(
      dataInformationValueParseBase.caperac,
      dataInformationValueParse.caperac
    );
     horizontalAnalysisObject.caperacva = this.calculateValue2(
      dataInformationValueParseBase.caperac,
      dataInformationValueParse.caperac
    );
    horizontalAnalysisObject.reserlac = this.calculateValue(
      dataInformationValueParseBase.reserlac,
      dataInformationValueParse.reserlac
    );
    horizontalAnalysisObject.reserlacva = this.calculateValue2(
      dataInformationValueParseBase.reserlac,
      dataInformationValueParse.reserlac
    );
    horizontalAnalysisObject.otrasresac = this.calculateValue(
      dataInformationValueParseBase.otrasresac,
      dataInformationValueParse.otrasresac
    );
    horizontalAnalysisObject.otrasresacva = this.calculateValue2(
      dataInformationValueParseBase.otrasresac,
      dataInformationValueParse.otrasresac
    );
    horizontalAnalysisObject.utiliejerac = this.calculateValue(
      dataInformationValueParseBase.utiliejerac,
      dataInformationValueParse.utiliejerac
    );
    horizontalAnalysisObject.utiliejeracva = this.calculateValue2(
      dataInformationValueParseBase.utiliejerac,
      dataInformationValueParse.utiliejerac
    );
    horizontalAnalysisObject.perdejerac = this.calculateValue(
      dataInformationValueParseBase.perdejerac,
      dataInformationValueParse.perdejerac
    );
    horizontalAnalysisObject.perdejeracva = this.calculateValue2(
      dataInformationValueParseBase.perdejerac,
      dataInformationValueParse.perdejerac
    );
    horizontalAnalysisObject.utiliacumuac = this.calculateValue(
      dataInformationValueParseBase.utiliacumuac,
      dataInformationValueParse.utiliacumuac
    );
    horizontalAnalysisObject.utiliacumuacva = this.calculateValue2(
      dataInformationValueParseBase.utiliacumuac,
      dataInformationValueParse.utiliacumuac
    );
    horizontalAnalysisObject.subtopatac = this.calculateValue(
      dataInformationValueParseBase.subtopatac,
      dataInformationValueParse.subtopatac
    );
     horizontalAnalysisObject.subtopatva = this.calculateValue2(
      dataInformationValueParseBase.subtopatac,
      dataInformationValueParse.subtopatac
    );
    horizontalAnalysisObject.totalfinanac = this.calculateValue(
      dataInformationValueParseBase.totalfinanac,
      dataInformationValueParse.totalfinanac
    );
    horizontalAnalysisObject.totalfinanacva = this.calculateValue2(
      dataInformationValueParseBase.totalfinanac,
      dataInformationValueParse.totalfinanac
    );
    return horizontalAnalysisObject;
  }
  calculateValue(baseValue: number, newValue: number) {
    if (baseValue === 0) return 0;
    const result =
      parseFloat((((newValue - baseValue) / baseValue) * 100).toFixed(1)) ?? 0;
    return isNaN(result) ? 0 : result;
  }
  calculateValue2(baseValue: number, newValue: number) {
    if (baseValue === 0) return 0;
    const result =
      parseFloat((newValue - baseValue).toFixed(1)) ?? 0;
    return isNaN(result) ? 0 : result;
  }
}
