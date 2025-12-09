import {
  ServiceInformationInterface,
  CommercialInformationInterface,
} from "@/interfaces/dataInterfaces/DataContextProps";

export type IndicatorGroupKey =
  | "Liquidez"
  | "Actividad"
  | "Endeudamiento"
  | "Rentabilidad";

export interface IndicatorResult {
  name: string;
  value: number | string;
}

type YearData = ServiceInformationInterface | CommercialInformationInterface;

const n = (value: unknown): number => {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
};

/**
 * División segura: evita división por 0.
 * Si el denominador es 0, devuelve "N/A".
 */
const safeDiv = (num: number, den: number): number | "N/A" =>
  den === 0 ? "N/A" : num / den;

/**
 * Redondea a 2 decimales cuando es número.
 */
const round2 = (value: number | string): number | string => {
  if (typeof value === "number") {
    return Number(value.toFixed(2));
  }
  return value;
};

/**
 * Helper para saber si el objeto corresponde a una empresa comercial.
 * CommercialInformationInterface tiene netSales, ServiceInformationInterface no.
 */
const isCommercial = (
  d: YearData
): d is CommercialInformationInterface => "netSales" in d;

const getFinancialDebtService = (d: ServiceInformationInterface): number => {
  return (
    n(d.obficb) + // obligaciones financieras CP con bancos
    n(d.obficonoen) + // obligaciones financieras CP otras entidades
    n(d.oflpbaac) + // obligaciones financieras LP bancos
    n(d.oflpac) + // obligaciones financieras LP otras entidades
    n(d.oflpbanco) + // LP bancos (campo alterno)
    n(d.oflpoenti) // LP otras entidades (campo alterno)
  );
};

const getFinancialDebtCommercial = (
  d: CommercialInformationInterface
): number => {
  return (
    n(d.obficb) +              
    n(d.obficonoen) +          
    n(d.oflpbaac) +            
    n(d.oflpac) +              
    n(d.oflpbanco) +           
    n(d.oflpoenti) +          
    n((d as any).cartascac)
  );
};

interface BaseVars {
  tipo: "service" | "commercial";
  activoCorriente: number;
  pasivoCorriente: number;
  pasivoLargoPlazo: number;
  pasivoTotal: number;
  cuentasPorCobrar: number;
  cuentasPorPagar: number;
  ventas: number;
  costoVentas: number;
  inventarios: number;
  utilidadOperacional: number;
  utilidadNeta: number;
  utilidadAntesImpuestos: number;
  totalActivos: number;
  patrimonio: number;
  gastosFinancieros: number;
  ingresosFinancieros: number;
  depre: number;
  amort: number;
  ebitda: number;
  deudaFinanciera: number;
  activosFijos: number;
  activosOperacionales: number;
}


const extractBaseVars = (yearData: YearData): BaseVars => {
  if (isCommercial(yearData)) {
    const d = yearData as CommercialInformationInterface;

    const activoCorriente = n(d.subaccomer || d.subactcorr);
    const pasivoCorriente = n(d.subtopcac); // pasivo corriente comercial
    const pasivoLargoPlazo = n(d.subtoplac); // pasivo LP comercial
    const pasivoTotal = pasivoCorriente + pasivoLargoPlazo;

    const ventas =
      n(d.netSales) ||
      n(d.grossSales) - n(d.returnsAndDiscounts); // ventas netas comercial

    const rawCostOfSales =
      n(d.costOfSales) ||
      (n(d.initialInventory) +
        n(d.purchasesCredit) +
        n(d.purchasesCash) -
        n(d.finalInventory));
    const costoVentas = Math.abs(rawCostOfSales);

    const inventarios = n(d.invemerac);

    const utilidadOperacional = n(d.operatingProfit);
    const utilidadNeta = n(d.netIncome);
    const utilidadAntesImpuestos = n(d.profitBeforeTax);

    const totalActivos = n(d.totalactias || d.totalactiac);
    const patrimonio = n(d.subpatrim || d.subtopatac);

    const gastosFinancieros = n(d.financialExpenses);
    const ingresosFinancieros = n(d.financialIncome);

    const depre = n(d.depreacumula);
    const amort = n(d.amortiza);
    const ebitda = utilidadOperacional + depre + amort;

    const deudaFinanciera = getFinancialDebtCommercial(d);

    const activosFijos = n(d.subppea || d.subtppe);
    const activosOperacionales = activosFijos + activoCorriente;

    const cuentasPorCobrar =
      n(d.deudorclien) || n(d.deudorclienac);
    const cuentasPorPagar = n(d.cuenporpa);

    return {
      tipo: "commercial",
      activoCorriente,
      pasivoCorriente,
      pasivoLargoPlazo,
      pasivoTotal,
      cuentasPorCobrar,
      cuentasPorPagar,
      ventas,
      costoVentas,
      inventarios,
      utilidadOperacional,
      utilidadNeta,
      utilidadAntesImpuestos,
      totalActivos,
      patrimonio,
      gastosFinancieros,
      ingresosFinancieros,
      depre,
      amort,
      ebitda,
      deudaFinanciera,
      activosFijos,
      activosOperacionales,
    };
  }

  // ============================
  //      EMPRESAS DE SERVICIO
  // ============================
  const d = yearData as ServiceInformationInterface;

  const activoCorriente = n(d.subactcorr);
  const pasivoCorriente = n(d.subpascorr);
  const pasivoLargoPlazo = n(d.subpalarp);
  const pasivoTotal = pasivoCorriente + pasivoLargoPlazo;

  const ventas = n(d.grossSales); // servicios: usamos ventas brutas

  const rawCostOfSales = n((d as any).costOfSales ?? 0);
  const costoVentas = Math.abs(rawCostOfSales);

  const inventarios = n(d.invemerac);

  const utilidadOperacional = n(d.operatingProfit);
  const utilidadNeta = n(d.netIncome);
  const utilidadAntesImpuestos = n(d.profitBeforeTax);

  const totalActivos = n(d.totalactias);
  const patrimonio = n(d.subpatrim);

  const gastosFinancieros = n(d.financialExpenses);
  const ingresosFinancieros = n(d.financialIncome);

  const depre = n(d.depreacumula);
  const amort = n(d.amortiza);
  const ebitda = utilidadOperacional + depre + amort;

  const deudaFinanciera = getFinancialDebtService(d);

  const activosFijos = n(d.subppea || d.subtppe);
  const activosOperacionales = activosFijos + activoCorriente;

  const cuentasPorCobrar = n(d.deudorclien || d.deudorclienac);
  const cuentasPorPagar = n(d.cuenporpa);

  return {
    tipo: "service",
    activoCorriente,
    pasivoCorriente,
    pasivoLargoPlazo,
    pasivoTotal,
    cuentasPorCobrar,
    cuentasPorPagar,
    ventas,
    costoVentas,
    inventarios,
    utilidadOperacional,
    utilidadNeta,
    utilidadAntesImpuestos,
    totalActivos,
    patrimonio,
    gastosFinancieros,
    ingresosFinancieros,
    depre,
    amort,
    ebitda,
    deudaFinanciera,
    activosFijos,
    activosOperacionales,
  };
};

// =========================
//  CÁLCULO POR GRUPO
// =========================

export const calculateIndicatorsForYear = (
  yearData: YearData,
  group: IndicatorGroupKey
): IndicatorResult[] => {
  const results: IndicatorResult[] = [];

  // 🔹 Tomamos TODAS las variables ya limpias por tipo (service / commercial)
  const {
    tipo,
    activoCorriente,
    pasivoCorriente,
    pasivoLargoPlazo,
    pasivoTotal,
    cuentasPorCobrar,
    cuentasPorPagar,
    ventas,
    costoVentas,
    inventarios,
    utilidadOperacional,
    utilidadNeta,
    utilidadAntesImpuestos,
    totalActivos,
    patrimonio,
    gastosFinancieros,
    ingresosFinancieros,
    depre,
    amort,
    ebitda,
    deudaFinanciera,
    activosFijos,
    activosOperacionales,
  } = extractBaseVars(yearData);

  // 🔹 Solo agrega si el valor es numérico válido
  const pushIfValid = (name: string, value: number | "N/A") => {
    if (value === "N/A") return;
    if (typeof value === "number" && Number.isFinite(value)) {
      results.push({ name, value: round2(value) });
    }
  };

  // ========================
  //        LIQUIDEZ
  // ========================
  if (group === "Liquidez") {
    pushIfValid("Razón Corriente", safeDiv(activoCorriente, pasivoCorriente));

    pushIfValid(
      "Prueba Ácida",
      safeDiv(activoCorriente - inventarios, pasivoCorriente)
    );

    // Capital de trabajo neto
    results.push({
      name: "Capital de Trabajo Neto",
      value: round2(activoCorriente - pasivoCorriente),
    });

    // Capital de trabajo neto operativo
    results.push({
      name: "Capital de Trabajo Neto Operativo",
      value: round2(cuentasPorCobrar - cuentasPorPagar),
    });
  }

  // ========================
  //      ENDEUDAMIENTO
  // ========================
  if (group === "Endeudamiento") {
    pushIfValid(
      "Nivel de Endeudamiento",
      safeDiv(pasivoTotal, totalActivos)
    );

    pushIfValid(
      "Endeudamiento Corto Plazo",
      safeDiv(pasivoCorriente, pasivoTotal)
    );

    if (gastosFinancieros !== 0) {
      pushIfValid(
        "Veces que se gana el interés",
        utilidadAntesImpuestos / gastosFinancieros
      );
    }

    pushIfValid(
      "Endeudamiento Financiero",
      safeDiv(deudaFinanciera, totalActivos)
    );

    if (utilidadOperacional !== 0) {
      pushIfValid(
        "Impacto de la carga financiera",
        gastosFinancieros / utilidadOperacional
      );
    }

    pushIfValid("Leverage Total", safeDiv(pasivoTotal, patrimonio));

    pushIfValid(
      "Leverage Corto Plazo",
      safeDiv(pasivoCorriente, patrimonio)
    );

    pushIfValid(
      "Leverage Financiero Total",
      safeDiv(deudaFinanciera, patrimonio)
    );
  }

  // ========================
  //        ACTIVIDAD
  // ========================
  if (group === "Actividad") {
    // Rotación cartera
    if (ventas > 0 && cuentasPorCobrar > 0) {
      pushIfValid("Rotación Cartera", ventas / cuentasPorCobrar);
    }

    // Rotación inventarios
    if (inventarios > 0 && costoVentas > 0) {
      pushIfValid("Rotación Inventarios", costoVentas / inventarios);
    }

    // Rotación proveedores
    if (costoVentas > 0 && cuentasPorPagar > 0) {
      pushIfValid("Rotación Proveedores", costoVentas / cuentasPorPagar);
    }

    // Ciclo operacional
    if (ventas > 0 && cuentasPorCobrar > 0) {
      pushIfValid("Ciclo Operacional", cuentasPorCobrar / ventas);
    }

    // Rotación activos fijos
    if (ventas > 0 && activosFijos > 0) {
      pushIfValid("Rotación Activos Fijos", ventas / activosFijos);
    }

    // Rotación activos operacionales
    if (ventas > 0 && activosOperacionales > 0) {
      pushIfValid(
        "Rotación Activos Operacionales",
        ventas / activosOperacionales
      );
    }

    // Rotación activo total
    if (ventas > 0 && totalActivos > 0) {
      pushIfValid("Rotación Activo Total", ventas / totalActivos);
    }

    // Importancia del activo corriente
    if (totalActivos > 0 && activoCorriente > 0) {
      pushIfValid(
        "Importancia del Activo Corriente",
        safeDiv(activoCorriente, totalActivos)
      );
    }
  }

  // ========================
  //      RENTABILIDAD
  // ========================
  if (group === "Rentabilidad") {
    // Margen bruto
    if (ventas > 0 && costoVentas > 0) {
      pushIfValid("Margen Bruto", (ventas - costoVentas) / ventas);
    }

    // Margen operacional
    if (ventas > 0) {
      pushIfValid("Margen Operacional", utilidadOperacional / ventas);
    }

    // Margen neto
    if (ventas > 0) {
      pushIfValid("Margen Neto", utilidadNeta / ventas);
    }

    // ROE
    pushIfValid(
      "ROE (Rendimiento del Patrimonio)",
      safeDiv(utilidadNeta, patrimonio)
    );

    // ROA
    pushIfValid(
      "ROA (Rendimiento del Activo Total)",
      safeDiv(utilidadNeta, totalActivos)
    );

    // OBF
    results.push({
      name: "OBF (Operación Bruta Financiera)",
      value: round2(
        utilidadOperacional + ingresosFinancieros - gastosFinancieros
      ),
    });

    // EBITDA
    results.push({
      name: "EBITDA",
      value: round2(ebitda),
    });
  }

  return results;
};

export const indicatorList: Record<IndicatorGroupKey, string[]> = {
  Liquidez: [
    "Razón Corriente",
    "Prueba Ácida",
    "Capital de Trabajo Neto",
    "Capital de Trabajo Neto Operativo",
  ],
  Actividad: [
    "Rotación Cartera",
    "Rotación Inventarios",
    "Rotación Proveedores",
    "Ciclo Operacional",
    "Rotación Activos Fijos",
    "Rotación Activos Operacionales",
    "Rotación Activo Total",
    "Importancia del Activo Corriente",
  ],
  Endeudamiento: [
    "Nivel de Endeudamiento",
    "Endeudamiento Corto Plazo",
    "Veces que se gana el interés",
    "Endeudamiento Financiero",
    "Impacto de la carga financiera",
    "Leverage Total",
    "Leverage Corto Plazo",
    "Leverage Financiero Total",
  ],
  Rentabilidad: [
    "Margen Bruto",
    "Margen Operacional",
    "Margen Neto",
    "ROE (Rendimiento del Patrimonio)",
    "ROA (Rendimiento del Activo Total)",
    "OBF (Operación Bruta Financiera)",
    "EBITDA",
  ],
};
