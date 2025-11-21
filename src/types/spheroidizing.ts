export interface SpheroRecord {
  id: string;
  date: Date;
  recorder: string;
  furnaceNo: string;
  batchNo: string;
  material: string;
  weight: number;                   // 重量
  targetTemp: number;               // 目標溫度
  actualTemp: number;               // 實際溫度
  heatingTime: number;              // 加熱時間(小時)
  holdingTime: number;              // 保溫時間(小時)
  coolingMethod: string;            // 冷卻方式
  coolingRate: number;              // 冷卻速度(°C/h)
  hardnessBefor: number;            // 處理前硬度
  hardnessAfter: number;            // 處理後硬度
  inspector: string;
  inspectionResult: string;
  remarks: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SpheroFormData {
  date: Date;
  recorder: string;
  furnaceNo: string;
  batchNo: string;
  material: string;
  weight: number;
  targetTemp: number;
  actualTemp: number;
  heatingTime: number;
  holdingTime: number;
  coolingMethod: string;
  coolingRate: number;
  hardnessBefor: number;
  hardnessAfter: number;
  inspector: string;
  inspectionResult: string;
  remarks: string;
}

export const COOLING_METHODS = [
  '爐冷',
  '空冷',
  '油冷',
  '水冷',
];

export const SPHERO_MATERIALS = [
  'FCD450',
  'FCD500',
  'FCD550',
  'FCD600',
  'FCD700',
];
