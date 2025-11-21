'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  Avatar,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import {
  Factory as FactoryIcon,
  Language as LanguageIcon,
} from '@mui/icons-material';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('zh');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('帳號或密碼錯誤');
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      setError('發生錯誤，請重試');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
        position: 'relative',
      }}
    >
      {/* Language Selector - Top Right */}
      <Box
        sx={{
          position: 'absolute',
          top: 24,
          right: 24,
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          backgroundColor: 'white',
          px: 2,
          py: 1,
          borderRadius: 1,
          boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
        }}
      >
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

      {/* Login Card */}
      <Paper
        elevation={2}
        sx={{
          width: 400,
          p: 5,
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        {/* Logo */}
        <Avatar
          sx={{
            width: 64,
            height: 64,
            bgcolor: 'primary.main',
            margin: '0 auto 16px',
          }}
        >
          <FactoryIcon sx={{ fontSize: 36 }} />
        </Avatar>

        {/* Title */}
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: 'text.primary',
            mb: 1,
          }}
        >
          MES 雲端版
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Manufacturing Execution System
        </Typography>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 2, textAlign: 'left' }}>
            {error}
          </Alert>
        )}

        {/* Login Form */}
        <Box component="form" onSubmit={handleSubmit} sx={{ textAlign: 'left' }}>
          <Typography
            variant="body2"
            sx={{ mb: 0.5, fontWeight: 500, color: 'text.primary' }}
          >
            帳號
          </Typography>
          <TextField
            fullWidth
            placeholder="請輸入帳號"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
            sx={{ mb: 2 }}
          />

          <Typography
            variant="body2"
            sx={{ mb: 0.5, fontWeight: 500, color: 'text.primary' }}
          >
            密碼
          </Typography>
          <TextField
            fullWidth
            type="password"
            placeholder="請輸入密碼"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{
              height: 48,
              fontSize: '1rem',
              fontWeight: 500,
            }}
          >
            {loading ? '登入中...' : '登入'}
          </Button>
        </Box>

        {/* Footer */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 4 }}
        >
          科技行善 - Tech for Good
        </Typography>

        {/* Demo Credentials */}
        <Typography
          variant="caption"
          color="text.disabled"
          sx={{ mt: 2, display: 'block' }}
        >
          Demo: admin / admin 或 vendor001 / vendor001
        </Typography>
      </Paper>
    </Box>
  );
}
