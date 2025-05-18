import React from 'react';
import { Box, Typography, Paper, TextField, Button } from '@mui/material';
import { supabase } from '../utils/supabaseClient';

// Componente de búsqueda
function VinosSearch() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredVinos, setFilteredVinos] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

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
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 2 }}>
            {filteredVinos.map((vino) => (
              <Paper key={vino.id} sx={{ p: 2 }}>
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
            ))}
          </Box>
        </Box>
      ) : searchTerm ? (
        <Typography variant="body1" color="text.secondary">
          No se encontraron resultados
        </Typography>
      ) : null}
    </Paper>
  );
}

// Componente de lista de vinos
function VinosList() {
  const [vinos, setVinos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchVinos();
  }, []);

  const fetchVinos = async () => {
    try {
      const { data, error } = await supabase
        .from('vinos')
        .select('*')
        .order('nombre');

      if (error) throw error;
      setVinos(data);
    } catch (error) {
      console.error('Error fetching vinos:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Lista de Vinos
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <Typography variant="body1">Cargando vinos...</Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Lista de Vinos
      </Typography>
      <Box sx={{ mt: 2 }}>
        {vinos.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            No hay vinos en tu colección
          </Typography>
        ) : (
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 3 }}>
            {vinos.map((vino) => (
              <Paper key={vino.id} sx={{ p: 2 }}>
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
            ))}
          </Box>
        )}
      </Box>
    </Paper>
  );
}

// Componente de formulario de contacto
function ContactForm() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Contacto
      </Typography>
      <Box sx={{ mt: 2 }}>
        <TextField fullWidth label="Nombre" sx={{ mb: 2 }} />
        <TextField fullWidth label="Email" sx={{ mb: 2 }} />
        <TextField fullWidth label="Mensaje" multiline rows={4} sx={{ mb: 2 }} />
        <Button variant="contained" color="primary">
          Enviar
        </Button>
      </Box>
    </Paper>
  );
}

// Componente de newsletter
function Newsletter() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Newsletter
      </Typography>
      <Box sx={{ mt: 2 }}>
        <TextField fullWidth label="Email" sx={{ mb: 2 }} />
        <Button variant="contained" color="primary">
          Suscribirse
        </Button>
      </Box>
    </Paper>
  );
}

function AllComponentsTest() {
  return (
    <Box sx={{ p: 4 }}>
      <VinosSearch />
      <VinosList />
    </Box>
  );
}

export { VinosSearch, VinosList, ContactForm, Newsletter, AllComponentsTest };
