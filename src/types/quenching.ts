export interface QuenchRecord {
  id: string;
  date: Date;
  recorder: string;
  ladleNo: string;                  // 鐵水包號
  castingNo: string;                // 澆注編號
  material: string;
  weight: number;                   // 重量(kg)
  temperature: number;              // 溫度(°C)
  nodulizer: string;                // 球化劑種類
  nodulizerAmount: number;          // 球化劑用量(kg)
  inoculant: string;                // 孕育劑種類
  inoculantAmount: number;          // 孕育劑用量(kg)
  reactionTime: number;             // 反應時間(秒)
  residualMg: number;               // 殘餘鎂(%)
  nodularity: number;               // 球化率(%)
  noduleCount: number;              // 球數(個/mm²)
  inspector: string;
  inspectionResult: string;
  remarks: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuenchFormData {
  date: Date;
  recorder: string;
  ladleNo: string;
  castingNo: string;
  material: string;
  weight: number;
  temperature: number;
  nodulizer: string;
  nodulizerAmount: number;
  inoculant: string;
  inoculantAmount: number;
  reactionTime: number;
  residualMg: number;
  nodularity: number;
  noduleCount: number;
  inspector: string;
  inspectionResult: string;
  remarks: string;
}

export const NODULIZER_TYPES = [
  '鎂合金',
  '稀土鎂合金',
  '鎂鐵合金',
  'FeSiMg',
];

export const INOCULANT_TYPES = [
  '75矽鐵',
  '鋇矽鐵',
  '鍶矽鐵',
  '鈣矽鐵',
];

export const QUENCH_MATERIALS = [
  'FCD450',
  'FCD500',
  'FCD550',
  'FCD600',
  'FCD700',
  'FCD800',
];
