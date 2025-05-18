import React, { useState, useEffect } from 'react';
import { 
  TextField,
  Button,
  Box,
  Typography
} from '@mui/material';
import { supabase } from '../utils/supabaseClient';

const VinosSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('vinos')
        .select('*')
        .or(`
          title.ilike.%${searchTerm}%,
          winery.ilike.%${searchTerm}%,
          province.ilike.%${searchTerm}%
        `);

      if (error) throw error;
      setSearchResults(data);
      onSearch(data);
    } catch (error) {
      console.error('Error searching vinos:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Buscar Vinos
      </Typography>
      <form onSubmit={handleSearch}>
        <TextField
          fullWidth
          label="Buscar por nombre, bodega o región"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="outlined"
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          Buscar
        </Button>
      </form>
    </Box>
  );
};

export default VinosSearch;
