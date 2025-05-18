import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Typography, Button, Paper } from '@mui/material';

function Home() {
  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Inicio
      </Typography>
      <Typography variant="body1">
        Esta es la página de inicio
      </Typography>
    </Paper>
  );
}

function Contact() {
  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Contacto
      </Typography>
      <Typography variant="body1">
        Esta es la página de contacto
      </Typography>
    </Paper>
  );
}

function FullTest() {
  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <nav>
          <Button component={Link} to="/" color="primary">
            Inicio
          </Button>
          <Button component={Link} to="/contacto" color="primary">
            Contacto
          </Button>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacto" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default FullTest;
