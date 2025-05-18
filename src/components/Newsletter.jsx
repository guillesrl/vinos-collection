import React, { useState } from 'react';
import { 
  TextField,
  Button,
  Box,
  Typography,
  Paper
} from '@mui/material';
import { supabase } from '../utils/supabaseClient';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase
        .from('newsletter')
        .insert([{
          email
        }]);

      if (error) throw error;
      setEmail('');
      setSuccess(true);
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Newsletter
      </Typography>
      <Box component="form" onSubmit={handleSubscribe}>
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ mt: 2 }}
        >
          Suscribirse
        </Button>
      </Box>
      {success && (
        <Typography color="success.main" sx={{ mt: 2 }}>
          ¡Te has suscrito exitosamente!
        </Typography>
      )}
    </Paper>
  );
};

export default Newsletter;
