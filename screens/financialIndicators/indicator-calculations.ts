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

// =========================
//  CÁLCULO POR GRUPO
// =========================

export const calculateIndicatorsForYear = (
  yearData: YearData,
  group: IndicatorGroupKey
): IndicatorResult[] => {
  const results: IndicatorResult[] = [];

  const activoCorriente = n((yearData as any).subactcorr ?? (yearData as any).subaccomer);
  const pasivoCorriente = n((yearData as any).subpascorr ?? (yearData as any).subtopcac);

  const cuentasPorCobrar = n((yearData as any).deudorclien ?? (yearData as any).deudorclienac);
  const cuentasPorPagar = n((yearData as any).cuenporpa);

  const ventas = n((yearData as any).grossSales);

  const rawCostOfSales = n((yearData as any).costOfSales);
  const costoVentas = Math.abs(rawCostOfSales);

  const inventarios = n((yearData as any).invemerac ?? (yearData as any).inventarios);

  const utilidadOperacional = n((yearData as any).operatingProfit);
  const utilidadNeta = n((yearData as any).netIncome);
  const utilidadAntesImpuestos = n((yearData as any).profitBeforeTax);

  const totalActivos = n((yearData as any).totalactias ?? (yearData as any).totalactiac);
  const patrimonio = n((yearData as any).subpatrim ?? (yearData as any).subtopatac);

  const pasivoLargoPlazo = n((yearData as any).subpalarp ?? (yearData as any).subtoplac);
  const pasivoTotal = pasivoCorriente + pasivoLargoPlazo;

  const gastosFinancieros = n((yearData as any).financialExpenses);
  const ingresosFinancieros = n((yearData as any).financialIncome);

  const depre = n((yearData as any).depreacumula ?? (yearData as any).depreacuac);
  const amort = n((yearData as any).amortiza ?? (yearData as any).amortizacionesac);
  const ebitda = utilidadOperacional + depre + amort;

  const deudaFinanciera =
    n((yearData as any).obficb ?? (yearData as any).ofcbac ?? 0) +
    n((yearData as any).obficonoen ?? (yearData as any).ofcoecac ?? 0) +
    n((yearData as any).oflpbaac ?? 0) +
    n((yearData as any).oflpac ?? 0);

  const activosFijos = n((yearData as any).subppea ?? (yearData as any).subtppe);
  const activosOperacionales = activosFijos + activoCorriente;

  // ========================
  //        LIQUIDEZ
  // ========================
  if (group === "Liquidez") {
    results.push(
      {
        name: "Razón Corriente",
        value: safeDiv(activoCorriente, pasivoCorriente),
      },
      {
        name: "Prueba Ácida",
        value: safeDiv(activoCorriente - inventarios, pasivoCorriente),
      },
      {
        name: "Capital de Trabajo Neto",
        value: activoCorriente - pasivoCorriente,
      },
      {
        name: "Capital de Trabajo Neto Operativo",
        value: cuentasPorCobrar - cuentasPorPagar,
      }
    );
  }

  // ========================
  //      ENDEUDAMIENTO
  // ========================
  if (group === "Endeudamiento") {
    results.push(
      {
        name: "Nivel de Endeudamiento",
        value: safeDiv(pasivoTotal, totalActivos),
      },
      {
        name: "Endeudamiento Corto Plazo",
        value: safeDiv(pasivoCorriente, pasivoTotal),
      },
      {
        name: "Veces que se gana el interés",
        value:
          gastosFinancieros === 0
            ? "N/A"
            : utilidadAntesImpuestos / gastosFinancieros,
      },
      {
        name: "Endeudamiento Financiero",
        value: safeDiv(deudaFinanciera, totalActivos),
      },
      {
        name: "Impacto de la carga financiera",
        value:
          utilidadOperacional === 0
            ? "N/A"
            : gastosFinancieros / utilidadOperacional,
      },
      {
        name: "Leverage Total",
        value: safeDiv(pasivoTotal, patrimonio),
      },
      {
        name: "Leverage Corto Plazo",
        value: safeDiv(pasivoCorriente, patrimonio),
      },
      {
        name: "Leverage Financiero Total",
        value: safeDiv(deudaFinanciera, patrimonio),
      }
    );
  }

  // ========================
  //        ACTIVIDAD
  // ========================
  if (group === "Actividad") {
    if (!(ventas === 0 && cuentasPorCobrar === 0)) {
      results.push({
        name: "Rotación Cartera",
        value: cuentasPorCobrar === 0 ? "N/A" : ventas / cuentasPorCobrar,
      });
    }

    if (inventarios > 0 && costoVentas > 0) {
      results.push({
        name: "Rotación Inventarios",
        value: costoVentas / inventarios,
      });
    }

    if (costoVentas > 0 && cuentasPorPagar > 0) {
      results.push({
        name: "Rotación Proveedores",
        value: costoVentas / cuentasPorPagar,
      });
    }

    if (!(ventas === 0 && cuentasPorCobrar === 0)) {
      results.push({
        name: "Ciclo Operacional",
        value: ventas === 0 ? "N/A" : cuentasPorCobrar / ventas,
      });
    }

    if (ventas > 0 && activosFijos > 0) {
      results.push({
        name: "Rotación Activos Fijos",
        value: ventas / activosFijos,
      });
    }

    if (ventas > 0 && activosOperacionales > 0) {
      results.push({
        name: "Rotación Activos Operacionales",
        value: ventas / activosOperacionales,
      });
    }

    if (ventas > 0 && totalActivos > 0) {
      results.push({
        name: "Rotación Activo Total",
        value: safeDiv(ventas, totalActivos),
      });
    }

    if (totalActivos > 0 && activoCorriente > 0) {
      results.push({
        name: "Importancia del Activo Corriente",
        value: safeDiv(activoCorriente, totalActivos),
      });
    }
  }

  // ========================
  //      RENTABILIDAD
  // ========================
  if (group === "Rentabilidad") {
    if (ventas > 0 && costoVentas > 0) {
      results.push({
        name: "Margen Bruto",
        value: (ventas - costoVentas) / ventas,
      });
    }

    if (ventas > 0) {
      results.push({
        name: "Margen Operacional",
        value: utilidadOperacional / ventas,
      });
    }

    if (ventas > 0) {
      results.push({
        name: "Margen Neto",
        value: utilidadNeta / ventas,
      });
    }

    if (patrimonio !== 0) {
      results.push({
        name: "ROE (Rendimiento del Patrimonio)",
        value: safeDiv(utilidadNeta, patrimonio),
      });
    }

    if (totalActivos !== 0) {
      results.push({
        name: "ROA (Rendimiento del Activo Total)",
        value: safeDiv(utilidadNeta, totalActivos),
      });
    }

    results.push(
      {
        name: "OBF (Operación Bruta Financiera)",
        value: utilidadOperacional + ingresosFinancieros - gastosFinancieros,
      },
      {
        name: "EBITDA",
        value: ebitda,
      }
    );
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