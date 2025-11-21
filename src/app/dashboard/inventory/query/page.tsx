import { Box, Typography, Paper } from '@mui/material';

export default function Page() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        庫存查詢
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1" color="text.secondary">
          此頁面建置中...
        </Typography>
      </Paper>
    </Box>
  );
}
