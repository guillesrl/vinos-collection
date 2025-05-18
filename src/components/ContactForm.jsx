import React, { useState } from 'react';
import { 
  TextField,
  Button,
  Box,
  Typography,
  Paper
} from '@mui/material';
import { supabase } from '../utils/supabaseClient';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase
        .from('contacts')
        .insert([{
          name: formData.name,
          email: formData.email,
          message: formData.message
        }]);

      if (error) throw error;
      setFormData({ name: '', email: '', message: '' });
      setSuccess(true);
    } catch (error) {
      console.error('Error submitting contact form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Contacto
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Nombre"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Mensaje"
          name="message"
          multiline
          rows={4}
          value={formData.message}
          onChange={handleChange}
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
          Enviar
        </Button>
      </form>
      {success && (
        <Typography color="success.main" sx={{ mt: 2 }}>
          Mensaje enviado exitosamente
        </Typography>
      )}
    </Paper>
  );
};

export default ContactForm;
