import { Box, Grid, Paper, Typography, Card, CardContent } from '@mui/material';
import {
  TrendingUp,
  Assessment,
  CheckCircle,
  Settings,
  People,
  Factory,
  Inventory,
  ShoppingCart,
  Assignment,
  Engineering,
  Warehouse,
} from '@mui/icons-material';

// Hero Stats Data
const stats = [
  {
    icon: <TrendingUp sx={{ fontSize: 32 }} />,
    label: '生產效率',
    value: '95.8%',
  },
  {
    icon: <Assessment sx={{ fontSize: 32 }} />,
    label: '今日訂單',
    value: '248',
  },
  {
    icon: <CheckCircle sx={{ fontSize: 32 }} />,
    label: '品檢合格率',
    value: '98.2%',
  },
];

// System Modules Data
const modules = [
  {
    title: '基本資料設定',
    icon: <Settings sx={{ fontSize: 32, color: '#FF9800' }} />,
    borderColor: '#FF9800',
    items: ['帳號權限設定', '其他欄位設定', '單位設定'],
  },
  {
    title: '人員設定',
    icon: <People sx={{ fontSize: 32, color: '#2196F3' }} />,
    borderColor: '#2196F3',
    items: ['部門組別設定', '人員設定', '廠商設定'],
  },
  {
    title: '生產設定',
    icon: <Factory sx={{ fontSize: 32, color: '#4CAF50' }} />,
    borderColor: '#4CAF50',
    items: ['製程設定', '機台設定'],
  },
  {
    title: '貨品設定',
    icon: <Inventory sx={{ fontSize: 32, color: '#F44336' }} />,
    borderColor: '#F44336',
    items: ['產品類別設定', '貨品設定'],
  },
  {
    title: '採購管理',
    icon: <ShoppingCart sx={{ fontSize: 32, color: '#FF9800' }} />,
    borderColor: '#FF9800',
    items: ['委外代工設定', '貨品採購設定'],
  },
  {
    title: '訂單管理',
    icon: <Assignment sx={{ fontSize: 32, color: '#2196F3' }} />,
    borderColor: '#2196F3',
    items: ['訂單管理', '退貨回饋介面'],
  },
  {
    title: '生產管理',
    icon: <Engineering sx={{ fontSize: 32, color: '#9C27B0' }} />,
    borderColor: '#9C27B0',
    items: ['派工', '生產履歷'],
  },
  {
    title: '庫存管理',
    icon: <Warehouse sx={{ fontSize: 32, color: '#795548' }} />,
    borderColor: '#795548',
    items: ['產品設定', '庫存查詢'],
  },
];

export default function DashboardPage() {
  return (
    <Box>
      {/* Hero Section with Gradient */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #8A1F32 0%, #CD8B76 100%)',
          borderRadius: 3,
          p: 5,
          mb: 4,
          color: 'white',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            mb: 1,
          }}
        >
          科技行善
        </Typography>
        <Typography
          variant="h6"
          sx={{
            mb: 4,
            opacity: 0.95,
            fontWeight: 400,
          }}
        >
          Tech for Good - Manufacturing Execution System
        </Typography>

        {/* Stats Cards */}
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  border: 'none',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                }}
              >
                <CardContent>
                  <Box sx={{ mb: 1 }}>{stat.icon}</Box>
                  <Typography
                    variant="body2"
                    sx={{
                      opacity: 0.9,
                      mb: 1,
                    }}
                  >
                    {stat.label}
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 700,
                    }}
                  >
                    {stat.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* System Modules Section */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          mb: 3,
        }}
      >
        系統模組
      </Typography>

      <Grid container spacing={3}>
        {modules.map((module, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              sx={{
                p: 3,
                height: '100%',
                border: `2px solid ${module.borderColor}`,
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <Box sx={{ mb: 2 }}>{module.icon}</Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                {module.title}
              </Typography>
              <Box component="ul" sx={{ pl: 2, m: 0 }}>
                {module.items.map((item, idx) => (
                  <Typography
                    component="li"
                    variant="body2"
                    key={idx}
                    sx={{
                      color: 'text.secondary',
                      mb: 0.5,
                      listStyleType: 'disc',
                    }}
                  >
                    {item}
                  </Typography>
                ))}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
