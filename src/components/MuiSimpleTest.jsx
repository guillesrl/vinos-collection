import React from 'react';
import { Button, Typography, Box, Paper } from '@mui/material';

function MuiSimpleTest() {
  const [message, setMessage] = React.useState('');

  const handleClick = () => {
    setMessage('¡Has hecho clic en el botón Material-UI! 🎉');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        🍷 Colección de Vinos 🍷
      </Typography>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="body1">
          Bienvenido a tu colección de vinos 🍷
        </Typography>
      </Paper>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClick}
          sx={{
            px: 4,
            py: 2,
            borderRadius: 2,
            '&:hover': {
              backgroundColor: '#7a3700'
            }
          }}
        >
          Prueba Material-UI
        </Button>
      </Box>
      {message && (
        <Typography
          variant="h6"
          color="success.main"
          align="center"
          sx={{ mb: 2 }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
}

export default MuiSimpleTest;
