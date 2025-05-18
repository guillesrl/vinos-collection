import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Box, 
  Pagination, 
  TextField, 
  InputAdornment, 
  IconButton, 
  ThemeProvider, 
  createTheme,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#fff',
    },
    text: {
      primary: '#fff',
    },
  },
});

export default function WineList() {
  const [wines, setWines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filterWines = (query) => {
    if (!query) return wines;
    const lowerQuery = query.toLowerCase();
    return wines.filter(wine =>
      wine.Title?.toString().toLowerCase().includes(lowerQuery) ||
      wine.Winery?.toString().toLowerCase().includes(lowerQuery) ||
      wine.Variety?.toString().toLowerCase().includes(lowerQuery) ||
      wine.Country?.toString().toLowerCase().includes(lowerQuery) ||
      wine.Vintage?.toString().toLowerCase().includes(lowerQuery) ||
      wine.Points?.toString().toLowerCase().includes(lowerQuery) ||
      wine.Price?.toString().toLowerCase().includes(lowerQuery)
    );
  };

  const getCurrentWines = () => {
    const filtered = filterWines(searchQuery);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    return {
      wines: filtered.slice(startIndex, endIndex),
      totalPages
    };
  };

  useEffect(() => {
    const fetchWines = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('vinos')
          .select('*');

        if (error) {
          console.error('Error de Supabase:', error);
          throw error;
        }
        
        console.log('Datos obtenidos:', data);
        setWines(data || []);
      } catch (err) {
        setError(`Error: ${err.message}\n\nDetalles: ${JSON.stringify(err, null, 2)}`);
      } finally {
        setLoading(false);
      }
    };

    fetchWines();
  }, []);

  useEffect(() => {
    if (searchQuery !== '') {
      setCurrentPage(1);
    }
  }, [searchQuery]);

  const { wines: currentWines, totalPages } = getCurrentWines();

  if (loading) return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Cargando...
        </Typography>
      </Box>
    </ThemeProvider>
  );

  if (error) return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Error: {error}
        </Typography>
      </Box>
    </ThemeProvider>
  );

  if (searchQuery && filterWines(searchQuery).length === 0 && !loading && !error) {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            No se encontraron resultados para "{searchQuery}"
          </Typography>
        </Box>
      </ThemeProvider>
    );
  }

  if (currentPage > totalPages) {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            No hay resultados en esta página
          </Typography>
        </Box>
      </ThemeProvider>
    );
  }

  // Si no hay vinos, mostramos un mensaje
  if (wines.length === 0 && !loading && !error) {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            No hay vinos en la colección
          </Typography>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Mi Colección de Vinos
        </Typography>
        
        <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            label="Buscar vinos"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="outlined"
          />
        </Box>

        <Card>
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Denominación</TableCell>
                    <TableCell>Bodega</TableCell>
                    <TableCell>Año</TableCell>
                    <TableCell>Varietal</TableCell>
                    <TableCell>País</TableCell>
                    <TableCell>Puntuación</TableCell>
                    <TableCell>Precio</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentWines.map((wine) => (
                    <TableRow key={wine.id}>
                      <TableCell>{wine.Title}</TableCell>
                      <TableCell>{wine.County}</TableCell>
                      <TableCell>{wine.Winery}</TableCell>
                      <TableCell>{wine.Vintage}</TableCell>
                      <TableCell>{wine.Variety}</TableCell>
                      <TableCell>{wine.Country}</TableCell>
                      <TableCell>{wine.Points}</TableCell>
                      <TableCell>{wine.Price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => setCurrentPage(page)}
            color="primary"
            size="large"
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
