import { Box, Container, Typography } from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Chia Yi Steel MES
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Manufacturing Execution System
        </Typography>
      </Box>
    </Container>
  );
}
