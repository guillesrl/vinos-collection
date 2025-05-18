import React from 'react';
import { Button, Typography } from '@mui/material';

function MuiTest() {
  const [showMessage, setShowMessage] = React.useState(false);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <Typography variant="h1" color="primary">
        Colección de Vinos 🍷
      </Typography>
      <Typography variant="h2" color="secondary" sx={{ mt: 2 }}>
        Bienvenido a tu colección de vinos 🍷
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowMessage(!showMessage)}
        sx={{ mt: 2 }}
      >
        {showMessage ? 'Ocultar' : 'Mostrar'} Mensaje
      </Button>
      {showMessage && (
        <Typography variant="h4" color="secondary" sx={{ mt: 2 }}>
          🍷 Bienvenido a tu colección de vinos 🍷
        </Typography>
      )}
    </div>
  );
}

export default MuiTest;
