import { createTheme } from '@mui/material/styles';

export default createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#964B00',
    },
    secondary: {
      main: '#5C2D91',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#ffffff',
      secondary: '#e0e0e0',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    h4: {
      color: '#ffffff',
    },
    h6: {
      color: '#ffffff',
    },
    body1: {
      color: '#e0e0e0',
    },
    body2: {
      color: '#e0e0e0',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E1E1E',
          color: '#ffffff',
          borderRadius: 8,
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        },
      },
    },
  },
});
