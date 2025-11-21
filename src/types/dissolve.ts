export interface DissolveRecord {
  id: string;                    // Auto-generated: {furnaceNo}-{YYYYMMDD}-{sequence}
  date: Date;                    // 日期 - Operation date
  recorder: string;              // 記錄人 - User who created the record
  furnaceNo: string;             // 爐號 - Furnace identifier (LA, LB, etc.)
  cumulativeBatches: number;     // 累計爐次(自動累計) - Auto-incremented counter
  dailyBatch: number;            // 日爐次 - Daily batch number
  material: string;              // 材質 - Material code (FCD550, FCD600, etc.)

  // Raw materials (原料)
  residualSoup: number;          // 殘湯 - Residual soup
  pigIron: number;               // 銑鐵 - Pig iron
  scrapIron: number;             // 廢鐵 - Scrap iron
  returnMaterial: number;        // 回爐料 - Return material
  carbonizer: number;            // 加碳劑 - Carbonizer
  nucleatingAgent: number;       // 增碳成核劑 - Nucleating agent
  ferrosilicon: number;          // 矽鐵 - Ferrosilicon
  sic: number;                   // SIC - Silicon carbide
  manganeseFe: number;           // 錳(Mn)鐵 - Manganese iron
  sulfurFe: number;              // 硫(S)鐵 - Sulfur iron
  copper: number;                // 銅(Cu) - Copper
  tinFe: number;                 // 錫(Sn)鐵 - Tin iron
  molybdenumFe: string;          // 鉬(Mo)鐵 - Molybdenum iron
  nickelFe: number;              // 鎳(Ni)鐵 - Nickel iron
  abnormalQitPigIron: string;    // 異常添加 QIT 銑鐵 - Abnormal QIT pig iron addition
  abnormalScrapIron: number;     // 異常添加廢鐵 - Abnormal scrap iron addition

  // Process parameters (製程參數)
  powerOnTime: string;           // 送電 - Power on time (HH:mm)
  powerOffTime: string;          // 關電 - Power off time (HH:mm)
  primaryCrystalTemp: number;    // 初晶溫度 - Primary crystal temperature
  eutecticTemp: number;          // 共晶溫度 - Eutectic temperature
  beakerUsage: number;           // 燒杯使用量 - Beaker usage
  ce: number;                    // C.E - Carbon equivalent
  carbonPercent: number;         // C% - Carbon percentage
  siliconPercent: number;        // Si % - Silicon percentage
  outputTemperature: number;     // 出爐溫度°C - Output temperature

  createdAt: Date;               // Record creation timestamp
  updatedAt: Date;               // Record update timestamp
}

export interface DissolveFormData {
  date: Date;
  recorder: string;
  furnaceNo: string;
  material: string;

  // Raw materials
  residualSoup: number;
  pigIron: number;
  scrapIron: number;
  returnMaterial: number;
  carbonizer: number;
  nucleatingAgent: number;
  ferrosilicon: number;
  sic: number;
  manganeseFe: number;
  sulfurFe: number;
  copper: number;
  tinFe: number;
  molybdenumFe: string;
  nickelFe: number;
  abnormalQitPigIron: string;
  abnormalScrapIron: number;

  // Process parameters
  powerOnTime: string;
  powerOffTime: string;
  primaryCrystalTemp: number;
  eutecticTemp: number;
  beakerUsage: number;
  ce: number;
  carbonPercent: number;
  siliconPercent: number;
  outputTemperature: number;
}

export interface FilterOptions {
  dateFrom?: Date;
  dateTo?: Date;
  furnaceNo?: string;
  material?: string;
  recorder?: string;
}

export const FURNACE_OPTIONS = ['LA', 'LB', 'LC', 'LD'];

export const MATERIAL_OPTIONS = [
  'FCD550',
  'FCD600',
  'FCD700',
  'FCD800',
  'FC200',
  'FC250',
  'FC300',
];
