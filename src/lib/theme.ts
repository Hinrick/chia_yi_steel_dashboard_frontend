'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8A1F32', // Burgundy - main brand color
      light: '#A54256',
      dark: '#6B1825',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#CD8B76', // Coral/Salmon - gradient end color
      light: '#DAA08F',
      dark: '#B5765A',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FAFAFA', // Light gray background
      paper: '#FFFFFF', // White cards/containers
    },
    text: {
      primary: '#212121', // Dark gray for primary text
      secondary: '#666666', // Medium gray for secondary text
      disabled: '#9E9E9E',
    },
    divider: '#E0E0E0', // Light gray for borders
    error: {
      main: '#F44336',
    },
    warning: {
      main: '#FF9800',
    },
    info: {
      main: '#2196F3',
    },
    success: {
      main: '#4CAF50',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      '"Noto Sans"',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontSize: '2rem', // 32px
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '1.5rem', // 24px
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.25rem', // 20px
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.125rem', // 18px
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem', // 16px
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem', // 14px
      lineHeight: 1.43,
    },
    button: {
      fontSize: '0.875rem', // 14px
      fontWeight: 500,
      textTransform: 'none', // Don't uppercase buttons
    },
  },
  shape: {
    borderRadius: 8, // Default border radius
  },
  spacing: 8, // Base spacing unit (8px)
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: '10px 24px',
          height: 40,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 4,
            '& fieldset': {
              borderColor: '#D0D0D0',
            },
            '&:hover fieldset': {
              borderColor: '#8A1F32',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#8A1F32',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
        },
        elevation1: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
        },
        elevation2: {
          boxShadow: '0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)',
        },
        elevation3: {
          boxShadow: '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: '#F5F5F5',
          fontWeight: 700,
          color: '#333',
          borderBottom: '1px solid #E0E0E0',
        },
        body: {
          borderBottom: '1px solid #F0F0F0',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: '1px solid #E0E0E0',
          boxShadow: 'none',
        },
      },
    },
  },
});

export default theme;
