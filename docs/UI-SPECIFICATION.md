# UI Specification - Chia Yi Steel MES

Based on Figma design: https://glory-whole-24323768.figma.site/

## Color Palette

### Primary Colors
- **Primary Red/Burgundy**: `#8A1F32` - Used for buttons, active states, branding
- **Gradient Background**: Linear gradient from burgundy to coral/salmon
  - Start: `#8A1F32`
  - End: `#CD8B76` or similar coral
- **Text on Dark**: `#FFFFFF` white

### Neutral Colors
- **Background**: `#F5F5F5` or `#FAFAFA` light gray
- **Sidebar Background**: `#FFFFFF` white
- **Border/Divider**: `#E0E0E0` light gray
- **Text Primary**: `#333333` or `#212121` dark gray
- **Text Secondary**: `#666666` medium gray

### Status Colors
- **Success/Active**: `#4CAF50` green
- **Warning**: `#FF9800` orange
- **Error**: `#F44336` red
- **Info**: `#2196F3` blue

## Typography

- **Font Family**: System font stack or similar to Noto Sans / Inter
- **Headings**:
  - H1: 24-32px, Bold
  - H2: 20-24px, Semi-bold
  - H3: 18-20px, Semi-bold
  - H4: 16-18px, Medium
-  **Body**: 14-16px, Regular
- **Small**: 12-14px, Regular

## Layout Structure

### 1. Login Page (`/login`)

**Layout**: Centered card on light gray background

**Components**:
- **Logo**: Factory/building icon in burgundy circle (top center)
- **Title**: "MES 雲端版" (large, bold)
- **Subtitle**: "Manufacturing Execution System" (gray, smaller)
- **Language Selector**: Top right, globe icon + "中文" dropdown
- **Form Card**: White card with shadow, centered
  - Width: ~400px
  - Padding: 40px
  - Border radius: 8px
  - Shadow: subtle
- **Input Fields**:
  - Label: "帳號" (Username)
  - Label: "密碼" (Password)
  - Full width text inputs
  - Border: light gray
  - Focus: burgundy border
  - Height: ~48px
- **Login Button**:
  - Background: Burgundy `#8A1F32`
  - Text: White "登入"
  - Full width
  - Height: ~48px
  - Border radius: 4px
  - Hover: slightly darker
- **Footer Text**:
  - "科技行善 - Tech for Good" (centered, gray)
  - "Demo: admin / admin 或 vendor001 / vendor001" (bottom, smaller, gray)

### 2. Dashboard Layout (`/dashboard`)

**Structure**: Sidebar + TopBar + Main Content

#### TopBar (Fixed)
- **Height**: 64px
- **Background**: White
- **Border-bottom**: 1px solid #E0E0E0
- **Left**: Collapse sidebar button (hamburger icon or arrow)
- **Center**: Page title (large, bold) + subtitle (smaller, gray)
- **Right**:
  - Language selector (globe icon + "中文")
  - User avatar (burgundy circle with "A")
  - Username "admin"
  - Logout button (red, "登出")

#### Sidebar (Left, Fixed)
- **Width**: 240px (expanded), 64px (collapsed)
- **Background**: White
- **Border-right**: 1px solid #E0E0E0
- **Top**:
  - Logo/Brand: "MES" (bold, 20px)
- **Navigation Menu** (vertical list):
  - Each item:
    - Icon (left, 20x20px)
    - Text label
    - Expand arrow (if has sub-menu)
    - Height: ~48px
    - Padding: 12px 16px
    - Hover: Light gray background
    - Active: Burgundy background + white text

**Menu Items** (from top to bottom):
1. 🔧 烘解作業
2. 🏭 退傷作業
3. ⭕ 球化作業
4. 🔥 淬注作業
5. 🏠 首頁 (Home)
6. 📊 可視化看板
7. ⚙️ 基本資料設定
8. 👤 人員設定 (expandable)
9. 🏭 生產設定 (expandable)
10. 📦 貨品設定 (expandable)
11. 🛒 採購管理 (expandable)
12. 📋 訂單管理 (expandable)
13. 🏭 生產管理 (expandable)
14. 🔧 報工管理 (expandable)
15. 🏗️ 行動報工管理
16. 📦 庫存管理 (expandable)
17. 🔧 品檢管理 (expandable)
18. 📊 報表 (expandable)
19. 🛠️ 其他客製項目 (expandable)

#### Main Content Area
- **Padding**: 24-32px
- **Background**: #F5F5F5 or #FAFAFA

### 3. Dashboard Home Page (`/dashboard`)

**Hero Section** (Full width gradient card):
- **Background**: Linear gradient burgundy to coral
- **Padding**: 40px
- **Border radius**: 12px
- **Color**: White text
- **Content**:
  - Title: "科技行善" (large, bold)
  - Subtitle: "Tech for Good - Manufacturing Execution System"
  - **Stats Cards** (3 cards in a row):
    - Each card:
      - Semi-transparent white background
      - Icon at top
      - Metric name (e.g., "生產效率")
      - Large number (e.g., "95.8%")
      - Width: ~200px
      - Padding: 24px
      - Border radius: 8px

**System Modules Section**:
- **Title**: "系統模組" (section heading)
- **Grid Layout**: 4 columns responsive
- **Module Cards**:
  - White background
  - Border: 2px solid (colored based on module type)
  - Border radius: 8px
  - Padding: 24px
  - Shadow: subtle on hover
  - **Content**:
    - Icon (top, colored, 32x32px)
    - Module name (bold, 18px)
    - Sub-items list (gray, 14px):
      - Bulleted list
      - 2-4 items per module

**Module Border Colors**:
- Basic Data (基本資料設定): Orange
- Personnel (人員設定): Blue
- Production (生產設定): Green
- Products (貨品設定): Red
- Purchasing (採購管理): Orange
- Orders (訂單管理): Blue
- Manufacturing (生產管理): Purple
- Warehouse (庫存管理): Brown

### 4. Table Pages (Generic)

**Structure**:
- **Header Section**:
  - Page title (H1)
  - Action buttons (right aligned):
    - Primary: "+ 新增" (Add) - Burgundy button
    - Secondary: "匯出" (Export), "篩選" (Filter) - Gray outline buttons
- **Filters Section** (Optional):
  - Inline filters
  - Date range pickers
  - Dropdowns
  - Search input
- **Table**:
  - **Container**: White card with shadow
  - **Border radius**: 8px
  - **Headers**:
    - Background: #F5F5F5
    - Text: Bold, #333
    - Height: 48px
    - Padding: 12px 16px
    - Border-bottom: 1px solid #E0E0E0
  - **Rows**:
    - Height: 56px
    - Padding: 12px 16px
    - Border-bottom: 1px solid #F0F0F0
    - Hover: #FAFAFA background
  - **Action Column** (last column):
    - Icon buttons: Edit (pencil), Delete (trash), View (eye), QR Code
    - Color: Gray by default, burgundy on hover
    - Size: 32x32px
- **Pagination**:
  - Bottom of table
  - Centered or right-aligned
  - Shows: Page numbers, Previous/Next
  - Burgundy color for active page

### 5. Form Pages / Dialogs

**Dialog/Modal**:
- **Background**: Semi-transparent black overlay (50%)
- **Modal Container**:
  - Background: White
  - Width: 600px (medium), 800px (large)
  - Border radius: 8px
  - Shadow: Large shadow
  - Padding: 0
- **Header**:
  - Padding: 24px
  - Border-bottom: 1px solid #E0E0E0
  - Title: Bold, 20px
  - Close button: Top right (X icon)
- **Content**:
  - Padding: 24px
  - Form fields:
    - Label: Above input, bold, 14px
    - Input height: 40px
    - Input border: 1px solid #D0D0D0
    - Input border radius: 4px
    - Input padding: 0 12px
    - Focus: Burgundy border
    - Error: Red border + error message below
    - Margin between fields: 16px
  - Field types:
    - Text input
    - Number input
    - Date picker
    - Dropdown/Select
    - Textarea (height: 100px)
    - Checkbox
    - Radio buttons
- **Footer**:
  - Padding: 16px 24px
  - Border-top: 1px solid #E0E0E0
  - Buttons: Right-aligned
    - Cancel: Gray outline button
    - Submit: Burgundy filled button
    - Spacing: 12px apart

### 6. Card Components

**Stat Card**:
- Background: White (or semi-transparent white on gradient)
- Border radius: 8px
- Padding: 20px
- Shadow: Subtle
- Icon: Top or left, 24x24px or 32x32px
- Title: Gray, 14px
- Value: Large, bold, 32px, burgundy or dark

**Info Card**:
- Similar to stat card
- May include description text
- May include action button at bottom

### 7. Buttons

**Primary Button**:
- Background: #8A1F32
- Color: White
- Padding: 10px 24px
- Border radius: 4px
- Height: 40px
- Font: 14px, medium
- Hover: Darker shade
- Active: Even darker
- Disabled: Gray background, gray text

**Secondary Button** (Outline):
- Background: Transparent or white
- Border: 1px solid #8A1F32
- Color: #8A1F32
- Same sizing as primary
- Hover: Light burgundy background

**Icon Button**:
- Size: 32x32px or 40x40px
- Border radius: 4px or circular
- Background: Transparent
- Hover: Light gray background
- Icon size: 20x20px

### 8. Icons

Use **Material Icons** or **Font Awesome** for consistency:
- Edit: pencil/edit icon
- Delete: trash icon
- View: eye icon
- QR Code: qr_code icon
- Add: plus icon
- Export: download icon
- Filter: filter icon
- Search: search/magnifying glass
- User: person icon
- Logout: exit_to_app icon
- Menu: menu/hamburger icon
- Expand: expand_more/chevron_down
- Collapse: expand_less/chevron_up

### 9. Spacing System

- **XXS**: 4px
- **XS**: 8px
- **SM**: 12px
- **MD**: 16px
- **LG**: 24px
- **XL**: 32px
- **XXL**: 48px

### 10. Shadows

- **Small**: `0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)`
- **Medium**: `0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)`
- **Large**: `0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)`

## Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## Animation/Transitions

- **Duration**: 200-300ms
- **Easing**: ease-in-out or cubic-bezier(0.4, 0, 0.2, 1)
- Apply to:
  - Button hover
  - Menu item hover
  - Modal open/close
  - Dropdown expand/collapse
