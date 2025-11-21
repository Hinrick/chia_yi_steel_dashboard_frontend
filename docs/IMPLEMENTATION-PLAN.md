# Implementation Plan - Exact UI Recreation

## Summary

I've analyzed the Figma site (https://glory-whole-24323768.figma.site/) and captured screenshots of the login and dashboard pages. Based on this analysis, I've created comprehensive documentation and begun implementing the exact UI.

## Completed Steps

1. ✅ **Playwright Analysis**
   - Captured screenshots of login page and dashboard
   - Located at: `screenshots/01-login.png`, `screenshots/02-dashboard.png`

2. ✅ **UI Documentation**
   - Created `docs/UI-SPECIFICATION.md` with complete design system
   - Created `docs/PAGE-LIST.md` with all ~30-40 pages needed
   - Documented colors, typography, spacing, components

3. ✅ **Theme Update**
   - Updated `src/lib/theme.ts` with exact Figma colors:
     - Primary: #8A1F32 (burgundy)
     - Secondary: #CD8B76 (coral gradient)
     - Background: #FAFAFA
     - Text colors, shadows, borders all match

## Next Steps to Complete

### 1. Update Sidebar Component (High Priority)

**File**: `src/components/layout/Sidebar.tsx`

**Changes Needed**:
- Add brand logo "MES" at top
- Replace current 5 menu items with complete 19-item menu structure from Figma
- Add expandable sub-menus for sections like:
  - 人員設定 (Personnel)
  - 生產設定 (Production)
  - 貨品設定 (Products)
  - 採購管理 (Purchasing)
  - 訂單管理 (Orders)
  - 生產管理 (Manufacturing)
  - 報工管理 (Work Report)
  - 庫存管理 (Inventory)
  - 品檢管理 (Quality)
  - 報表 (Reports)
  - 其他客製項目 (Custom)
- Style active items with burgundy background + white text
- Add proper icons for each menu item

### 2. Update TopBar Component

**File**: `src/components/layout/TopBar.tsx`

**Changes Needed**:
- Add language selector (globe icon + "中文" dropdown) to the left of user menu
- Change user avatar to burgundy circle with initial
- Add "admin" username text next to avatar
- Style logout button in red ("登出")
- Adjust spacing and layout to match Figma exactly

### 3. Recreate Login Page

**File**: `src/app/login/page.tsx`

**Changes Needed**:
- Center the form card on light gray background
- Add factory icon logo in burgundy circle
- Title: "MES 雲端版"
- Subtitle: "Manufacturing Execution System"
- Language selector in top right
- Form fields with labels "帳號" and "密碼"
- Full-width burgundy "登入" button
- Add footer text: "科技行善 - Tech for Good"
- Add demo credentials: "Demo: admin / admin 或 vendor001 / vendor001"

### 4. Recreate Dashboard Home Page

**File**: `src/app/dashboard/page.tsx`

**Changes Needed**:
- **Hero Section** with gradient background (burgundy to coral):
  - Title: "科技行善"
  - Subtitle: "Tech for Good - Manufacturing Execution System"
  - 3 stats cards: 生產效率 95.8%, 今日訂單 248, 品檢合格率 98.2%

- **System Modules Section**:
  - Title: "系統模組"
  - 8 module cards in 4-column grid:
    1. 基本資料設定 (Basic Data) - Orange border
    2. 人員設定 (Personnel) - Blue border
    3. 生產設定 (Production) - Green border
    4. 貨品設定 (Products) - Red border
    5. 採購管理 (Purchasing) - Orange border
    6. 訂單管理 (Orders) - Blue border
    7. 生產管理 (Manufacturing) - Purple border
    8. 庫存管理 (Inventory) - Brown border
  - Each card shows icon, title, and 2-4 sub-items

### 5. Create Missing Pages

Based on `docs/PAGE-LIST.md`, create pages for:

**Operations** (use process template):
- `/dashboard/roasting-operation` - 烘解作業
- `/dashboard/defect-repair` - 退傷作業
- `/dashboard/spheroidizing` - 球化作業
- `/dashboard/quenching` - 淬注作業

**Settings** (use form template):
- `/dashboard/basic-data` - 基本資料設定
- `/dashboard/personnel` - 人員設定
- `/dashboard/production-settings` - 生產設定
- `/dashboard/products` - 貨品設定

**Management** (use table template):
- `/dashboard/purchasing` - 採購管理
- `/dashboard/orders` - 訂單管理
- `/dashboard/manufacturing` - 生產管理
- `/dashboard/work-report` - 報工管理
- `/dashboard/mobile-work-report` - 行動報工管理
- `/dashboard/inventory` - 庫存管理
- `/dashboard/quality` - 品檢管理

**Reports & Others**:
- `/dashboard/visualization` - 可視化看板
- `/dashboard/reports` - 報表
- `/dashboard/custom` - 其他客製項目

### 6. Create Reusable Page Templates

**Create**: `src/components/templates/`

**Templates to Create**:

1. **TablePageTemplate.tsx**
   - Header with title and action buttons
   - Filters section
   - Data table with pagination
   - CRUD modal dialogs

2. **FormPageTemplate.tsx**
   - Page title
   - Form sections with fields
   - Save/Cancel buttons

3. **DashboardTemplate.tsx**
   - Stats cards row
   - Content grid
   - Charts/graphs sections

4. **ProcessTemplate.tsx**
   - Process status cards
   - Workflow visualization
   - Action buttons
   - History log table

## Priority Implementation Order

### Phase 1: Core UI (Week 1)
1. Update Sidebar with full menu
2. Update TopBar with language selector
3. Recreate Login page
4. Recreate Dashboard home page

### Phase 2: Templates & Common Pages (Week 2)
5. Create TablePageTemplate
6. Update Employees page to use template
7. Create FormPageTemplate
8. Create 3-5 settings pages using form template

### Phase 3: Operations & Management (Week 3-4)
9. Create ProcessTemplate
10. Implement 4 operation pages
11. Implement 8-10 management pages using table template

### Phase 4: Advanced Features (Week 5+)
12. Create visualization dashboard with charts
13. Implement reports with filters
14. Add mobile-responsive layouts
15. Polish and testing

## Testing Checklist

- [ ] Login page matches Figma exactly
- [ ] Dashboard home matches Figma exactly
- [ ] Sidebar menu structure complete and functional
- [ ] TopBar layout and components match
- [ ] All colors match theme
- [ ] All typography matches
- [ ] Spacing and padding match
- [ ] Buttons and forms styled correctly
- [ ] Tables formatted correctly
- [ ] Responsive on mobile/tablet
- [ ] All navigation works
- [ ] All pages accessible from sidebar

## Files to Reference

- **Design Spec**: `docs/UI-SPECIFICATION.md`
- **Page List**: `docs/PAGE-LIST.md`
- **Screenshots**: `screenshots/01-login.png`, `screenshots/02-dashboard.png`
- **Theme**: `src/lib/theme.ts` (already updated)

## Command to Start Dev Server

```bash
cd /Users/hinrickchang/Code/chia_yi_steel/frontend-nextjs
pnpm dev
```

Visit http://localhost:3001 to see changes.
