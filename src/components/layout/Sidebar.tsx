'use client';

import { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Collapse,
  Box,
  Typography,
  Divider,
} from '@mui/material';
import {
  LocalFireDepartment,
  Widgets,
  CircleOutlined,
  WaterDrop,
  Home,
  Dashboard as DashboardIcon,
  Settings,
  People,
  Factory,
  Inventory,
  ShoppingCart,
  Assignment,
  PlayCircle,
  Report,
  MobileScreenShare,
  Warehouse,
  VerifiedUser,
  Description,
  Build,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import { usePathname, useRouter } from 'next/navigation';

const drawerWidth = 240;

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path?: string;
  children?: MenuItem[];
  isOperation?: boolean;
}

const menuItems: MenuItem[] = [
  // Operation items at top with light background
  { id: 'roasting', label: '烘解作業', icon: <LocalFireDepartment fontSize="small" />, path: '/dashboard/roasting-operation', isOperation: true },
  { id: 'defect', label: '造模作業', icon: <Widgets fontSize="small" />, path: '/dashboard/defect-repair', isOperation: true },
  { id: 'spheroidizing', label: '球化作業', icon: <CircleOutlined fontSize="small" />, path: '/dashboard/spheroidizing', isOperation: true },
  { id: 'quenching', label: '淬注作業', icon: <WaterDrop fontSize="small" />, path: '/dashboard/quenching', isOperation: true },

  // Regular menu items
  { id: 'home', label: '首頁', icon: <Home fontSize="small" />, path: '/dashboard' },
  { id: 'visualization', label: '可視化看板', icon: <DashboardIcon fontSize="small" />, path: '/dashboard/visualization' },
  { id: 'basic-data', label: '基本資料設定', icon: <Settings fontSize="small" />, path: '/dashboard/basic-data' },
  {
    id: 'personnel',
    label: '人員設定',
    icon: <People fontSize="small" />,
    children: [
      { id: 'personnel-dept', label: '部門組別設定', icon: <People fontSize="small" />, path: '/dashboard/personnel/departments' },
      { id: 'personnel-employee', label: '人員設定', icon: <People fontSize="small" />, path: '/dashboard/personnel/employees' },
      { id: 'personnel-vendor', label: '廠商設定', icon: <People fontSize="small" />, path: '/dashboard/personnel/vendors' },
    ],
  },
  {
    id: 'production-settings',
    label: '生產設定',
    icon: <Factory fontSize="small" />,
    children: [
      { id: 'production-process', label: '製程設定', icon: <Factory fontSize="small" />, path: '/dashboard/production-settings/process' },
      { id: 'production-machine', label: '機台設定', icon: <Factory fontSize="small" />, path: '/dashboard/production-settings/machines' },
    ],
  },
  {
    id: 'products',
    label: '貨品設定',
    icon: <Inventory fontSize="small" />,
    children: [
      { id: 'products-category', label: '產品類別設定', icon: <Inventory fontSize="small" />, path: '/dashboard/products/categories' },
      { id: 'products-list', label: '貨品設定', icon: <Inventory fontSize="small" />, path: '/dashboard/products/list' },
    ],
  },
  {
    id: 'purchasing',
    label: '採購管理',
    icon: <ShoppingCart fontSize="small" />,
    children: [
      { id: 'purchasing-outsource', label: '委外代工設定', icon: <ShoppingCart fontSize="small" />, path: '/dashboard/purchasing/outsourcing' },
      { id: 'purchasing-product', label: '貨品採購設定', icon: <ShoppingCart fontSize="small" />, path: '/dashboard/purchasing/products' },
    ],
  },
  {
    id: 'orders',
    label: '訂單管理',
    icon: <Assignment fontSize="small" />,
    children: [
      { id: 'orders-list', label: '訂單管理', icon: <Assignment fontSize="small" />, path: '/dashboard/orders/list' },
      { id: 'orders-return', label: '退貨回饋介面', icon: <Assignment fontSize="small" />, path: '/dashboard/orders/returns' },
    ],
  },
  {
    id: 'manufacturing',
    label: '生產管理',
    icon: <PlayCircle fontSize="small" />,
    children: [
      { id: 'manufacturing-assignment', label: '派工', icon: <PlayCircle fontSize="small" />, path: '/dashboard/manufacturing/assignment' },
      { id: 'manufacturing-history', label: '生產履歷', icon: <PlayCircle fontSize="small" />, path: '/dashboard/manufacturing/history' },
    ],
  },
  {
    id: 'work-report',
    label: '報工管理',
    icon: <Report fontSize="small" />,
    children: [
      { id: 'work-report-main', label: '報工管理', icon: <Report fontSize="small" />, path: '/dashboard/work-report' },
    ],
  },
  {
    id: 'mobile-work-report',
    label: '行動報工管理',
    icon: <MobileScreenShare fontSize="small" />,
    path: '/dashboard/mobile-work-report',
  },
  {
    id: 'inventory',
    label: '庫存管理',
    icon: <Warehouse fontSize="small" />,
    children: [
      { id: 'inventory-settings', label: '產品設定', icon: <Warehouse fontSize="small" />, path: '/dashboard/inventory/settings' },
      { id: 'inventory-query', label: '庫存查詢', icon: <Warehouse fontSize="small" />, path: '/dashboard/inventory/query' },
    ],
  },
  {
    id: 'quality',
    label: '品檢管理',
    icon: <VerifiedUser fontSize="small" />,
    children: [
      { id: 'quality-main', label: '品檢管理', icon: <VerifiedUser fontSize="small" />, path: '/dashboard/quality' },
    ],
  },
  {
    id: 'reports',
    label: '報表',
    icon: <Description fontSize="small" />,
    children: [
      { id: 'reports-main', label: '報表', icon: <Description fontSize="small" />, path: '/dashboard/reports' },
    ],
  },
  {
    id: 'custom',
    label: '其他客製項目',
    icon: <Build fontSize="small" />,
    children: [
      { id: 'custom-main', label: '其他客製項目', icon: <Build fontSize="small" />, path: '/dashboard/custom' },
    ],
  },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const handleToggle = (menuId: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const isSelected = (path?: string) => {
    if (!path) return false;
    return pathname === path;
  };

  const isParentSelected = (item: MenuItem) => {
    if (!item.children) return false;
    return item.children.some((child) => pathname === child.path);
  };

  const operationItems = menuItems.filter(item => item.isOperation);
  const regularItems = menuItems.filter(item => !item.isOperation);

  const renderMenuItem = (item: MenuItem, depth: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = openMenus[item.id];
    const selected = isSelected(item.path) || isParentSelected(item);

    return (
      <Box key={item.id}>
        <ListItemButton
          selected={selected}
          onClick={() => {
            if (hasChildren) {
              handleToggle(item.id);
            } else if (item.path) {
              handleNavigate(item.path);
            }
          }}
          sx={{
            py: 1.5,
            px: 2,
            pl: depth > 0 ? 4 : 2,
            minHeight: 48,
            backgroundColor: item.isOperation ? '#F5F5F5' : 'transparent',
            '&:hover': {
              backgroundColor: item.isOperation ? '#EEEEEE' : 'rgba(0, 0, 0, 0.04)',
            },
            '&.Mui-selected': {
              backgroundColor: item.isOperation ? '#E8E8E8' : 'transparent',
              '&:hover': {
                backgroundColor: item.isOperation ? '#E0E0E0' : 'rgba(0, 0, 0, 0.08)',
              },
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 36,
              color: 'text.secondary',
            }}
          >
            {item.icon}
          </ListItemIcon>
          <ListItemText
            primary={item.label}
            primaryTypographyProps={{
              fontSize: '0.875rem',
              fontWeight: selected ? 500 : 400,
            }}
          />
          {hasChildren && (
            isOpen ?
              <ExpandLess sx={{ fontSize: 20, color: 'text.secondary' }} /> :
              <ExpandMore sx={{ fontSize: 20, color: 'text.secondary' }} />
          )}
        </ListItemButton>
        {hasChildren && (
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children!.map((child) => renderMenuItem(child, depth + 1))}
            </List>
          </Collapse>
        )}
      </Box>
    );
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: 'background.paper',
          borderRight: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      <Toolbar sx={{ minHeight: '64px !important' }} />

      {/* Operation Items Section */}
      <Box sx={{ backgroundColor: '#FAFAFA', py: 1 }}>
        {operationItems.map((item) => renderMenuItem(item))}
      </Box>

      <Divider />

      {/* Regular Menu Items */}
      <List sx={{ px: 0, py: 1 }}>
        {regularItems.map((item) => renderMenuItem(item))}
      </List>
    </Drawer>
  );
}
