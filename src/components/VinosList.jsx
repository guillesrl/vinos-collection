import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Typography 
} from '@mui/material';
import { supabase } from '../utils/supabaseClient';

const VinosList = () => {
  const [vinos, setVinos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVinos();
  }, []);

  const fetchVinos = async () => {
    try {
      const { data, error } = await supabase
        .from('vinos')
        .select('*');

      if (error) throw error;
      setVinos(data);
    } catch (error) {
      console.error('Error fetching vinos:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Vintage</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Province</TableCell>
            <TableCell>Winery</TableCell>
            <TableCell>Points</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vinos.map((vino) => (
            <TableRow key={vino.id}>
              <TableCell>{vino.title}</TableCell>
              <TableCell>{vino.vintage}</TableCell>
              <TableCell>{vino.country}</TableCell>
              <TableCell>{vino.province}</TableCell>
              <TableCell>{vino.winery}</TableCell>
              <TableCell>{vino.points}</TableCell>
              <TableCell>${vino.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VinosList;
