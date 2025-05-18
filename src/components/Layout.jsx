import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Layout({ children }) {
  return (
    <div>
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Colección de Vinos 🍷
          </Typography>
          <Box>
            <Button color="inherit" component={RouterLink} to="/contacto">
              Contacto
            </Button>
            <Button color="inherit" component={RouterLink} to="/newsletter">
              Newsletter
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <div style={{ padding: '20px' }}>
        {children}
      </div>
    </div>
  );
}

export default Layout;
