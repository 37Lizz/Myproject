import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Paper,
} from '@mui/material';


import moonImg from '../../../public/1b7ec3c06e43ca1169447502cbb93f2e.jpg'

const AstroForm: React.FC = () => {
  const [birthDate, setBirthDate] = useState<string>('');
  const [birthTime, setBirthTime] = useState<string>('');
  const [birthPlace, setBirthPlace] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      day: parseInt(birthDate.split('-')[2], 10),
      month: parseInt(birthDate.split('-')[1], 10),
      year: parseInt(birthDate.split('-')[0], 10),
      hour: parseInt(birthTime.split(':')[0], 10),
      minute: parseInt(birthTime.split(':')[1], 10),
      latitude: 55.7558, // Широта Москвы
      longitude: 37.6173, // Долгота Москвы
      timezone: 3, // Часовой пояс Москвы
    };

    // Имитация запроса к API
    setTimeout(() => {
      setResult(JSON.stringify(data, null, 2));
      setLoading(false);
    }, 1000);
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: '0 auto',
        padding: 3,
        backgroundColor: '#ffffff',
        color: '#000000',
        fontFamily: '"IBM Plex Mono", monospace',
        backgroundImage: `url(${moonImg})`, // Фоновое изображение
        backgroundPosition: 'center', // Центрировать изображение
        backgroundRepeat: 'no-repeat', // Не повторять изображение
      }}
    >
      <Typography variant="h4" align="center" gutterBottom sx={{ fontFamily: '"IBM Plex Mono", monospace' }}>
        Astro - pithecus
      </Typography>
    

      <Paper sx={{ padding: 3, marginBottom: 3, backgroundColor: '#ffffff', border: '1px solid #000000' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="date"
                label="Дата рождения"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
                sx={{ backgroundColor: '#ffffff', borderRadius: 1, fontFamily: '"IBM Plex Mono", monospace' }}
                inputProps={{ style: { color: '#000000', fontFamily: '"IBM Plex Mono", monospace' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="time"
                label="Время рождения"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
                sx={{ backgroundColor: '#ffffff', borderRadius: 1, fontFamily: '"IBM Plex Mono", monospace' }}
                inputProps={{ style: { color: '#000000', fontFamily: '"IBM Plex Mono", monospace' } }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  fontFamily: '"IBM Plex Mono", monospace',
                  '&:hover': {
                    backgroundColor: '#ffffff',
                    color: '#000000',
                    border: '1px solid #000000',
                  },
                }}
              >
                {loading ? <CircularProgress size={24} /> : 'Получить прогноз'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {result && (
        <Paper sx={{ padding: 3, marginBottom: 3, backgroundColor: '#ffffff', border: '1px solid #000000' }}>
          <Typography variant="h6" gutterBottom sx={{ fontFamily: '"IBM Plex Mono", monospace' }}>
            Результат:
          </Typography>
          <pre style={{ color: '#000000', fontFamily: '"IBM Plex Mono", monospace' }}>{result}</pre>
        </Paper>
      )}

    </Box>
  );
};

export default AstroForm;