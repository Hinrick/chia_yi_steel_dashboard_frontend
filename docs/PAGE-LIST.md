# Complete Page List - Chia Yi Steel MES

Based on the Figma design sidebar navigation.

## Public Pages

1. **Login Page** (`/login`)
   - Username/password form
   - Language selector
   - Demo credentials display

## Dashboard Pages

### Main Navigation

2. **烘解作業** (`/dashboard/roasting-operation`)
   - Roasting/baking operations

3. **退傷作業** (`/dashboard/defect-repair`)
   - Defect repair operations

4. **球化作業** (`/dashboard/spheroidizing`)
   - Spheroidizing operations

5. **淬注作業** (`/dashboard/quenching`)
   - Quenching/hardening operations

6. **首頁 (Home)** (`/dashboard` or `/dashboard/home`)
   - Dashboard overview
   - Stats cards (生產效率, 今日訂單, 品檢合格率)
   - System modules grid

7. **可視化看板** (`/dashboard/visualization`)
   - Visual dashboard/reports
   - Charts and graphs

### 基本資料設定 (Basic Data Settings)

8. **基本資料設定** (`/dashboard/basic-data`)
   - Sub-pages:
     - 帳號權限設定 (Account permissions)
     - 其他欄位設定 (Other field settings)
     - 單位設定 (Unit settings)

### 人員設定 (Personnel Settings)

9. **人員設定** (`/dashboard/personnel`)
   - Sub-pages:
     - 部門組別設定 (Department/group settings)
     - 人員設定 (Employee settings)
     - 廠商設定 (Vendor settings)

### 生產設定 (Production Settings)

10. **生產設定** (`/dashboard/production-settings`)
    - Sub-pages:
      - 製程設定 (Process settings)
      - 機台設定 (Machine settings)

### 貨品設定 (Product Settings)

11. **貨品設定** (`/dashboard/products`)
    - Sub-pages:
      - 產品類別設定 (Product category settings)
      - 貨品設定 (Product settings)

### 採購管理 (Purchasing Management)

12. **採購管理** (`/dashboard/purchasing`)
    - Sub-pages:
      - 委外代工設定 (Outsourcing settings)
      - 貨品採購設定 (Product purchasing settings)

### 訂單管理 (Order Management)

13. **訂單管理** (`/dashboard/orders`)
    - Sub-pages:
      - 訂單管理 (Order management)
      - 退貨回饋介面 (Return feedback interface)

### 生產管理 (Manufacturing Management)

14. **生產管理** (`/dashboard/manufacturing`)
    - Sub-pages:
      - 派工 (Work assignment)
      - 生產履歷 (Production history)

### 報工管理 (Work Reporting)

15. **報工管理** (`/dashboard/work-report`)
    - Work reporting and tracking

### 行動報工管理 (Mobile Work Reporting)

16. **行動報工管理** (`/dashboard/mobile-work-report`)
    - Mobile work reporting interface

### 庫存管理 (Inventory Management)

17. **庫存管理** (`/dashboard/inventory`)
    - Sub-pages:
      - 產品設定 (Product settings)
      - 庫存查詢 (Inventory query)

### 品檢管理 (Quality Inspection)

18. **品檢管理** (`/dashboard/quality`)
    - Quality inspection and management

### 報表 (Reports)

19. **報表** (`/dashboard/reports`)
    - Various reports and analytics

### 其他客製項目 (Other Custom Items)

20. **其他客製項目** (`/dashboard/custom`)
    - Custom features and modules

## Total Pages

- **1** Public page (Login)
- **~20-30** Dashboard pages (including sub-pages)
- **Total: ~30-40** pages

## Page Templates

Based on content type, pages can be grouped into templates:

### Template 1: Data Table Page
Used for: Personnel, Products, Orders, Inventory, etc.
- Header with title and action buttons
- Filters/search bar
- Data table with pagination
- CRUD operations (Create, Read, Update, Delete)

### Template 2: Form Page
Used for: Settings pages
- Form fields organized in sections
- Save/Cancel buttons
- Validation

### Template 3: Dashboard/Overview Page
Used for: Home, Visualization
- Stats cards
- Charts and graphs
- Quick action cards

### Template 4: Operation/Process Page
Used for: 烘解作業, 退傷作業, 球化作業, 淬注作業
- Process workflow visualization
- Current status
- Action buttons
- History log

## Priority Order for Implementation

### Phase 1: Core Pages (MVP)
1. Login page
2. Dashboard home
3. Personnel settings
4. Product settings
5. Order management

### Phase 2: Operations
6. Roasting operation
7. Defect repair
8. Spheroidizing
9. Quenching
10. Work reporting

### Phase 3: Management
11. Purchasing management
12. Manufacturing management
13. Inventory management
14. Quality inspection

### Phase 4: Advanced Features
15. Visualization dashboard
16. Reports
17. Mobile work reporting
18. Custom modules
