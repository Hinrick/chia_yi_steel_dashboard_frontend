#!/bin/bash

# Script to generate all missing pages
# This creates placeholder pages that can be customized later

# Create directories
mkdir -p src/app/dashboard/roasting-operation
mkdir -p src/app/dashboard/defect-repair
mkdir -p src/app/dashboard/spheroidizing
mkdir -p src/app/dashboard/quenching
mkdir -p src/app/dashboard/visualization
mkdir -p src/app/dashboard/basic-data
mkdir -p src/app/dashboard/personnel/departments
mkdir -p src/app/dashboard/personnel/employees
mkdir -p src/app/dashboard/personnel/vendors
mkdir -p src/app/dashboard/production-settings/process
mkdir -p src/app/dashboard/production-settings/machines
mkdir -p src/app/dashboard/products/categories
mkdir -p src/app/dashboard/products/list
mkdir -p src/app/dashboard/purchasing/outsourcing
mkdir -p src/app/dashboard/purchasing/products
mkdir -p src/app/dashboard/orders/list
mkdir -p src/app/dashboard/orders/returns
mkdir -p src/app/dashboard/manufacturing/assignment
mkdir -p src/app/dashboard/manufacturing/history
mkdir -p src/app/dashboard/work-report
mkdir -p src/app/dashboard/mobile-work-report
mkdir -p src/app/dashboard/inventory/settings
mkdir -p src/app/dashboard/inventory/query
mkdir -p src/app/dashboard/quality
mkdir -p src/app/dashboard/reports
mkdir -p src/app/dashboard/custom

echo "✓ All directories created"

# Function to create a simple placeholder page
create_page() {
  local path=$1
  local title=$2

  cat > "$path/page.tsx" << 'EOF'
import { Box, Typography, Paper } from '@mui/material';

export default function Page() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        TITLE_PLACEHOLDER
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1" color="text.secondary">
          此頁面建置中...
        </Typography>
      </Paper>
    </Box>
  );
}
EOF

  # Replace placeholder with actual title
  sed -i '' "s/TITLE_PLACEHOLDER/$title/g" "$path/page.tsx"
  echo "✓ Created $path/page.tsx - $title"
}

# Create all pages
create_page "src/app/dashboard/roasting-operation" "烘解作業"
create_page "src/app/dashboard/defect-repair" "退傷作業"
create_page "src/app/dashboard/spheroidizing" "球化作業"
create_page "src/app/dashboard/quenching" "淬注作業"
create_page "src/app/dashboard/visualization" "可視化看板"
create_page "src/app/dashboard/basic-data" "基本資料設定"
create_page "src/app/dashboard/personnel/departments" "部門組別設定"
create_page "src/app/dashboard/personnel/employees" "人員設定"
create_page "src/app/dashboard/personnel/vendors" "廠商設定"
create_page "src/app/dashboard/production-settings/process" "製程設定"
create_page "src/app/dashboard/production-settings/machines" "機台設定"
create_page "src/app/dashboard/products/categories" "產品類別設定"
create_page "src/app/dashboard/products/list" "貨品設定"
create_page "src/app/dashboard/purchasing/outsourcing" "委外代工設定"
create_page "src/app/dashboard/purchasing/products" "貨品採購設定"
create_page "src/app/dashboard/orders/list" "訂單管理"
create_page "src/app/dashboard/orders/returns" "退貨回饋介面"
create_page "src/app/dashboard/manufacturing/assignment" "派工"
create_page "src/app/dashboard/manufacturing/history" "生產履歷"
create_page "src/app/dashboard/work-report" "報工管理"
create_page "src/app/dashboard/mobile-work-report" "行動報工管理"
create_page "src/app/dashboard/inventory/settings" "產品設定"
create_page "src/app/dashboard/inventory/query" "庫存查詢"
create_page "src/app/dashboard/quality" "品檢管理"
create_page "src/app/dashboard/reports" "報表"
create_page "src/app/dashboard/custom" "其他客製項目"

echo ""
echo "========================================="
echo "✓ All pages generated successfully!"
echo "✓ Total: 26 pages created"
echo "========================================="
