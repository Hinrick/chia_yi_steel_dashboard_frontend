'use client';

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Avatar,
  Button,
  Select,
  FormControl,
} from '@mui/material';
import {
  Language as LanguageIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { signOut } from 'next-auth/react';
import { useState } from 'react';

export default function TopBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [language, setLanguage] = useState('zh');

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await signOut({ redirectTo: '/login' });
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'background.paper',
        color: 'text.primary',
        boxShadow: 'none',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
          主選單
        </Typography>
        <Typography variant="body2" component="div" sx={{ mr: 2, color: 'text.secondary' }}>
          Manufacturing Execution System
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Language Selector */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <LanguageIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
            <FormControl variant="standard" size="small">
              <Select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                disableUnderline
                sx={{
                  fontSize: '0.875rem',
                  '& .MuiSelect-select': {
                    py: 0,
                    pr: 3,
                  },
                }}
              >
                <MenuItem value="zh">中文</MenuItem>
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="vi">Tiếng Việt</MenuItem>
                <MenuItem value="id">Bahasa Indonesia</MenuItem>
                <MenuItem value="th">ไทย</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* User Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: 'primary.main',
                fontSize: '0.875rem',
                cursor: 'pointer',
              }}
              onClick={handleMenu}
            >
              A
            </Avatar>
            <Typography
              variant="body2"
              sx={{ cursor: 'pointer', fontWeight: 500 }}
              onClick={handleMenu}
            >
              admin
            </Typography>
          </Box>

          {/* Logout Button */}
          <Button
            variant="outlined"
            size="small"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              textTransform: 'none',
              borderRadius: 1,
            }}
          >
            登出
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleClose}>個人資料</MenuItem>
            <MenuItem onClick={handleClose}>我的帳號</MenuItem>
            <MenuItem onClick={handleLogout}>登出</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
