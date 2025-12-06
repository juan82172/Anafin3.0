// app/database/indicatorsRepository.ts
import * as SQLite from "expo-sqlite";

export type IndicatorGroupKey =
  | "Liquidez"
  | "Actividad"
  | "Endeudamiento"
  | "Rentabilidad";

export interface SavedIndicator {
  name: string;
  value: number | string | null;
}
export interface SaveIndicatorsPayload {
  companyName: string;
  year: string;
  enterpriseType: string;
  indicatorsByGroup: {
    groupKey: IndicatorGroupKey;
    indicators: SavedIndicator[];
  }[];
}

export interface HistoricalHeader {
  companyName: string;
  year: string;
  enterpriseType: string;
  createdAt: string;
}

const dbPromise = SQLite.openDatabaseAsync("anafin.db");

export const initIndicatorsTable = async (): Promise<void> => {
  const db = await dbPromise;

  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS indicators (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      companyName TEXT NOT NULL,
      year TEXT NOT NULL,
      enterpriseType TEXT,
      groupKey TEXT NOT NULL,
      indicatorName TEXT NOT NULL,
      indicatorValue REAL,
      createdAt TEXT DEFAULT (datetime('now'))
    );
  `);
};

export const saveIndicatorsForYear = async (
  payload: SaveIndicatorsPayload
): Promise<void> => {
  const db = await dbPromise;

  await db.withTransactionAsync(async () => {
    const stmt = await db.prepareAsync(
      `INSERT INTO indicators 
        (companyName, year, enterpriseType, groupKey, indicatorName, indicatorValue)
       VALUES ($companyName, $year, $enterpriseType, $groupKey, $indicatorName, $indicatorValue);`
    );

    try {
      for (const groupBlock of payload.indicatorsByGroup) {
        for (const ind of groupBlock.indicators) {
          const numericValue =
            typeof ind.value === "number"
              ? ind.value
              : ind.value === "N/A" ||
                ind.value === null ||
                ind.value === undefined ||
                ind.value === ""
              ? null
              : Number(ind.value);

          await stmt.executeAsync({
            $companyName: payload.companyName,
            $year: payload.year,
            $enterpriseType: payload.enterpriseType,
            $groupKey: groupBlock.groupKey,
            $indicatorName: ind.name,
            $indicatorValue: numericValue,
          });
        }
      }
    } finally {
      await stmt.finalizeAsync();
    }
  });

  console.log("✅ Indicadores guardados en SQLite");
};

export const getIndicatorsHistory = async (): Promise<HistoricalHeader[]> => {
  const db = await dbPromise;

  return await db.getAllAsync(`
    SELECT 
      companyName,
      year,
      CASE 
        WHEN enterpriseType = 'services' THEN 'Servicios'
        WHEN enterpriseType = 'commerce' THEN 'Comercial'
        ELSE enterpriseType
      END AS enterpriseType,
      MIN(createdAt) as createdAt
    FROM indicators
    GROUP BY companyName, year, enterpriseType
    ORDER BY createdAt DESC;
  `);
};

export const getIndicatorsByCompanyAndYear = async (companyName: string, year: string) => {
  const db = await dbPromise;

  return await db.getAllAsync(`
    SELECT
      groupKey,
      indicatorName,
      indicatorValue,
      createdAt
    FROM indicators
    WHERE companyName = ? AND year = ?
    ORDER BY groupKey ASC, indicatorName ASC;
  `, [companyName, year]);
};
