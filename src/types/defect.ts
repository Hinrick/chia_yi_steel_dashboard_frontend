export interface DefectRecord {
  id: string;
  date: Date;
  recorder: string;
  defectType: string;              // 缺陷類型
  location: string;                 // 位置
  severity: string;                 // 嚴重程度
  description: string;              // 描述
  repairMethod: string;             // 修補方法
  materialUsed: string;             // 使用材料
  quantityUsed: number;             // 使用量
  repairStartTime: string;          // 修補開始時間
  repairEndTime: string;            // 修補結束時間
  inspector: string;                // 檢驗人員
  inspectionResult: string;         // 檢驗結果
  remarks: string;                  // 備註
  createdAt: Date;
  updatedAt: Date;
}

export interface DefectFormData {
  date: Date;
  recorder: string;
  defectType: string;
  location: string;
  severity: string;
  description: string;
  repairMethod: string;
  materialUsed: string;
  quantityUsed: number;
  repairStartTime: string;
  repairEndTime: string;
  inspector: string;
  inspectionResult: string;
  remarks: string;
}

export const DEFECT_TYPES = [
  '砂眼',
  '氣孔',
  '裂紋',
  '夾渣',
  '縮孔',
  '變形',
  '其他',
];

export const SEVERITY_LEVELS = [
  '輕微',
  '中等',
  '嚴重',
  '致命',
];

export const REPAIR_METHODS = [
  '焊接修補',
  '打磨修補',
  '填補修補',
  '更換',
  '其他',
];

export const INSPECTION_RESULTS = [
  '合格',
  '不合格',
  '待複檢',
];
