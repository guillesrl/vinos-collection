import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Typography, Box, Button } from '@mui/material';

export default function CheckSupabase() {
  const [tableInfo, setTableInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkTable();
  }, []);

  const checkTable = async () => {
    try {
      // Intentamos obtener un registro de prueba
      const { data: testRow, error: testError } = await supabase
        .from('vinos')
        .select('*')
        .limit(1);

      if (testError) throw testError;

      // Si llegamos aquí, la tabla existe y podemos obtener sus columnas
      const columns = Object.keys(testRow[0]);
      
      setTableInfo({
        exists: true,
        columns,
        sampleRow: testRow[0]
      });
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return (
    <Box sx={{ p: 2 }}>
      <Typography color="error" variant="h6">
        Error al verificar la tabla
      </Typography>
      <Typography color="error">{error}</Typography>
    </Box>
  );

  if (!tableInfo) return <Typography>Verificando tabla...</Typography>;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">Información de la tabla vinos</Typography>
      <Typography>Columnas disponibles:</Typography>
      <ul>
        {tableInfo.columns.map((column) => (
          <li key={column.name}>{column.name}</li>
        ))}
      </ul>
      {tableInfo.sampleRow && (
        <Box>
          <Typography variant="h6">Ejemplo de fila:</Typography>
          <pre>{JSON.stringify(tableInfo.sampleRow, null, 2)}</pre>
        </Box>
      )}
    </Box>
  );
}
