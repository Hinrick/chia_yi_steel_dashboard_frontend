# 烘解作業 (Dissolve Process) - Detailed Specification

## Overview

The Dissolve Process page allows users to manage and track dissolve operations in the steel manufacturing process. Based on the analysis of the production page at https://chia-yi-steel-dashboard-frontend.vercel.app/process/dissolve

## Page Structure

### 1. Header Section
- **Page Title**: "烘解作業" (Dissolve Process)
- **Action Buttons**:
  - **新增** (Add) - Green button with plus icon
  - **快速新增** (Quick Add) - Blue button with lightning icon
  - **篩選** (Filter) - Filter button in top right

### 2. Data Table

The main content is a data table with the following columns:

| Column | Chinese | Field Type | Description |
|--------|---------|------------|-------------|
| 操作 | Operation | Actions | Edit/Delete buttons |
| ID | ID | Text | Unique record identifier (e.g., LA-20250115-001) |
| 日期 | Date | DateTime | Operation date (e.g., 2025年10月20日 星期一) |
| 記錄人 | Recorder | Text | User who created the record (e.g., admin) |
| 爐號 | Furnace No. | Text | Furnace identifier (e.g., LA) |
| 累計爐次(自動累計) | Cumulative Batches (Auto) | Number | Auto-incremented batch counter (e.g., 37, 38) |
| 日爐次 | Daily Batch | Number | Daily batch number (e.g., 1, 2) |
| 材質 | Material | Text | Material code (e.g., FCD550, FCD600) |
| 送電 | Power On | Time | Power on time (e.g., 08:50, 09:15) |
| 關電 | Power Off | Time | Power off time (e.g., 10:16, 11:30) |
| 出爐溫度°C | Output Temperature °C | Number | Furnace output temperature (e.g., 1563°C, 1580°C) |

### 3. Sample Data

**Row 1:**
- ID: LA-20250115-001
- Date: 2025年10月20日 星期一
- Recorder: admin
- Furnace: LA
- Cumulative Batches: 37
- Daily Batch: 1
- Material: FCD550
- Power On: 08:50
- Power Off: 10:16
- Temperature: 1563°C

**Row 2:**
- ID: LA-20250116-002
- Date: 2025年10月20日 星期一
- Recorder: admin
- Furnace: LA
- Cumulative Batches: 38
- Daily Batch: 2
- Material: FCD600
- Power On: 09:15
- Power Off: 11:30
- Temperature: 1580°C

## User Interactions

### 1. View Records
- Users can view all dissolve process records in a paginated table
- Table shows key information for each operation
- Pagination controls at bottom (showing "共 2 筆" - Total 2 records)

### 2. Add New Record (新增)
When clicking the green "新增" button:
- Opens a dialog/form with the following fields:
  - **日期** (Date) - Date picker
  - **記錄人** (Recorder) - Auto-filled or dropdown
  - **爐號** (Furnace No.) - Dropdown/Input
  - **材質** (Material) - Dropdown (FCD550, FCD600, etc.)
  - **送電** (Power On) - Time picker
  - **關電** (Power Off) - Time picker
  - **出爐溫度°C** (Output Temperature) - Number input
- ID is auto-generated based on date and sequence
- 累計爐次 is auto-incremented
- 日爐次 is calculated based on daily operations

### 3. Quick Add (快速新增)
- Simplified form with fewer fields
- Pre-fills common values
- Faster data entry for routine operations

### 4. Edit Record
- Click edit icon (pencil) in 操作 column
- Opens form pre-filled with existing data
- Can modify all fields except ID and auto-calculated fields

### 5. Delete Record
- Click delete icon (trash) in 操作 column
- Shows confirmation dialog
- Removes record from database

### 6. Filter Records (篩選)
- Filter by date range
- Filter by furnace number
- Filter by material type
- Filter by recorder

## TypeScript Interfaces

```typescript
interface DissolveRecord {
  id: string;                    // Auto-generated: {furnaceNo}-{YYYYMMDD}-{sequence}
  date: Date;                    // Operation date
  recorder: string;              // User who created the record
  furnaceNo: string;             // Furnace identifier (LA, LB, etc.)
  cumulativeBatches: number;     // Auto-incremented counter
  dailyBatch: number;            // Daily batch number
  material: string;              // Material code (FCD550, FCD600, etc.)
  powerOnTime: string;           // HH:mm format
  powerOffTime: string;          // HH:mm format
  outputTemperature: number;     // Temperature in Celsius
  createdAt: Date;               // Record creation timestamp
  updatedAt: Date;               // Record update timestamp
}

interface DissolveFormData {
  date: Date;
  recorder: string;
  furnaceNo: string;
  material: string;
  powerOnTime: string;
  powerOffTime: string;
  outputTemperature: number;
}

interface FilterOptions {
  dateFrom?: Date;
  dateTo?: Date;
  furnaceNo?: string;
  material?: string;
  recorder?: string;
}
```

## Component Structure

```
DissolveProcessPage/
├── DissolveProcessPage.tsx          # Main page component
├── components/
│   ├── DissolveTable.tsx            # Data table component
│   ├── DissolveForm.tsx             # Add/Edit form
│   ├── QuickAddDialog.tsx           # Quick add dialog
│   ├── FilterPanel.tsx              # Filter controls
│   └── DissolveTableRow.tsx         # Table row with actions
├── hooks/
│   ├── useDissolveRecords.ts        # Data fetching hook
│   └── useDissolveForm.ts           # Form state management
└── utils/
    ├── generateDissolveId.ts        # ID generation logic
    └── validateDissolveForm.ts      # Form validation
```

## Validation Rules

### Date
- Required field
- Cannot be future date
- Format: YYYY-MM-DD

### Furnace No.
- Required field
- Valid furnace codes: LA, LB, LC, etc.
- 2-3 characters

### Material
- Required field
- Valid material codes from predefined list
- Common: FCD550, FCD600, FCD700

### Power On/Off Times
- Required fields
- Format: HH:mm (24-hour)
- Power Off must be after Power On
- Duration should be realistic (typically 1-4 hours)

### Output Temperature
- Required field
- Range: 1000°C - 2000°C
- Integer value

## API Endpoints (Placeholder)

```typescript
// GET all records with pagination and filters
GET /api/dissolve-records?page=1&limit=20&furnaceNo=LA

// GET single record
GET /api/dissolve-records/:id

// POST create new record
POST /api/dissolve-records
Body: DissolveFormData

// PUT update existing record
PUT /api/dissolve-records/:id
Body: DissolveFormData

// DELETE record
DELETE /api/dissolve-records/:id

// GET next cumulative batch number
GET /api/dissolve-records/next-batch/:furnaceNo
```

## Business Logic

### ID Generation
```
Format: {furnaceNo}-{YYYYMMDD}-{sequence}
Example: LA-20250115-001
```

### Cumulative Batches
- Auto-incremented counter per furnace
- Never resets
- Continues across days

### Daily Batch
- Resets to 1 each day
- Increments for each operation on the same day
- Calculated based on date and existing records

## UI/UX Features

1. **Responsive Table**: Horizontal scroll on mobile
2. **Inline Actions**: Edit/Delete in each row
3. **Loading States**: Skeleton screens while fetching data
4. **Error Handling**: Toast notifications for errors
5. **Confirmation Dialogs**: Before deleting records
6. **Form Validation**: Real-time validation with error messages
7. **Auto-save**: Optional auto-save draft functionality
8. **Export**: Export table data to Excel/CSV

## Styling Notes

- **Green Add Button**: Primary action, prominent position
- **Blue Quick Add**: Secondary action, lightning icon
- **Edit Icon**: Blue pencil icon
- **Delete Icon**: Red trash icon
- **Table Headers**: Gray background, bold text
- **Alternating Rows**: Light gray/white for better readability
- **Pagination**: Bottom right, shows total records

## Implementation Priority

1. ✅ Create TypeScript interfaces
2. ✅ Set up page layout and routing
3. ⏳ Implement data table with sample data
4. ⏳ Create Add/Edit form dialog
5. ⏳ Implement form validation
6. ⏳ Add delete functionality with confirmation
7. ⏳ Implement filter panel
8. ⏳ Add quick add dialog
9. ⏳ Implement pagination
10. ⏳ Add API integration (when backend ready)
11. ⏳ Add export functionality
12. ⏳ Responsive design optimizations

## Testing Checklist

- [ ] Can view list of records
- [ ] Can add new record with all fields
- [ ] ID is auto-generated correctly
- [ ] Cumulative batches auto-increment
- [ ] Daily batch calculates correctly
- [ ] Can edit existing record
- [ ] Can delete record with confirmation
- [ ] Form validation works for all fields
- [ ] Filter by date range works
- [ ] Filter by furnace works
- [ ] Pagination works correctly
- [ ] Quick add dialog works
- [ ] Export functionality works
- [ ] Responsive on mobile devices
- [ ] Loading states display correctly
- [ ] Error messages display correctly

## Notes

- The screenshot shows a clean, functional design with clear actions
- Data table is the primary UI element
- Form fields should match the table columns
- Auto-calculation fields (ID, cumulative batches) should be read-only in edit mode
- Consider adding a print view for records
- May need to add additional fields based on business requirements
