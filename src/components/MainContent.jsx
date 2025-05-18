import React from 'react';
import { Typography, Box, Paper, TextField, Button, Grid } from '@mui/material';
import { supabase } from '../utils/supabaseClient';

function MainContent() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredVinos, setFilteredVinos] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [allVinos, setAllVinos] = React.useState([]);

  // Cargar todos los vinos al inicio
  React.useEffect(() => {
    fetchAllVinos();
  }, []);

  const fetchAllVinos = async () => {
    try {
      const { data, error } = await supabase
        .from('vinos')
        .select('*')
        .order('nombre');

      if (error) throw error;
      setAllVinos(data);
    } catch (error) {
      console.error('Error fetching vinos:', error);
    }
  };

  // Manejar la búsqueda
  const handleSearch = async (term) => {
    if (!term) {
      setFilteredVinos([]);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('vinos')
        .select('*')
        .or(`nombre.ilike.%${term}%,bodega.ilike.%${term}%,region.ilike.%${term}%`)
        .order('nombre');

      if (error) throw error;
      setFilteredVinos(data);
    } catch (error) {
      console.error('Error searching vinos:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        🍷 Colección de Vinos 🍷
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Buscar Vinos
        </Typography>
        <TextField
          fullWidth
          label="Buscar por nombre, bodega o región"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleSearch(e.target.value);
          }}
          sx={{ mb: 2 }}
        />
        {loading ? (
          <Typography variant="body1">Buscando...</Typography>
        ) : filteredVinos.length > 0 ? (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Resultados encontrados ({filteredVinos.length}):
            </Typography>
            <Grid container spacing={2}>
              {filteredVinos.map((vino) => (
                <Grid item xs={12} sm={6} md={4} key={vino.id}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      {vino.nombre}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Bodega: {vino.bodega}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Región: {vino.region}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Año: {vino.anio}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : searchTerm ? (
          <Typography variant="body1" color="text.secondary">
            No se encontraron resultados
          </Typography>
        ) : null}
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Lista de Vinos
        </Typography>
        <Box sx={{ mt: 2 }}>
          {allVinos.length === 0 ? (
            <Typography variant="body1" color="text.secondary">
              No hay vinos en tu colección
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {allVinos.map((vino) => (
                <Grid item xs={12} sm={6} md={4} key={vino.id}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      {vino.nombre}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Bodega: {vino.bodega}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Región: {vino.region}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Año: {vino.anio}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Paper>
    </Box>
  );
}

export default MainContent;
