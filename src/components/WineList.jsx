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

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 2 }}>
          <Typography variant="h4" gutterBottom>
            Mi Colección de Vinos
          </Typography>
          {searchQuery && (
            <Typography
              variant="h6"
              color="primary"
              sx={{ cursor: 'pointer' }}
              onClick={() => setSearchQuery('')}
            >
              Limpiar búsqueda
            </Typography>
          )}
        </Box>
        
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <TextField
            sx={{ width: '50%' }}
            label="Buscar vinos"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="outlined"
          />
        </Box>

        {loading ? (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              Cargando...
            </Typography>
          </Box>
        ) : error ? (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              Error: {error}
            </Typography>
          </Box>
        ) : searchQuery && filterWines(searchQuery).length === 0 ? (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              No se encontraron resultados para "{searchQuery}"
            </Typography>
          </Box>
        ) : currentPage > totalPages ? (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              No hay resultados en esta página
            </Typography>
          </Box>
        ) : wines.length === 0 ? (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              No hay vinos en la colección
            </Typography>
          </Box>
        ) : (
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
        )}

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

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 2 }}>
          <Typography variant="h4" gutterBottom>
            Mi Colección de Vinos
          </Typography>
          {searchQuery && (
            <Typography
              variant="h6"
              color="primary"
              sx={{ cursor: 'pointer' }}
              onClick={() => setSearchQuery('')}
            >
              Limpiar búsqueda
            </Typography>
          )}
        </Box>
        
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <TextField
            sx={{ width: '50%' }}
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
