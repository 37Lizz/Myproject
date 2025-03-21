import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Paper,
  Grid2,
} from '@mui/material';

import moonImg from '../../../public/1b7ec3c06e43ca1169447502cbb93f2e.jpg'; // Фоновое изображение
import { useNavigate } from 'react-router';

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [birthDate, setBirthDate] = useState<string>('');
  const [birthTime, setBirthTime] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent):Promise<void> => {
    e.preventDefault();
    setLoading(true); // Включаем состояние загрузки

    // Формируем объект data
    const natal = {
      day: parseInt(birthDate.split('-')[2], 10),
      month: parseInt(birthDate.split('-')[1], 10),
      year: parseInt(birthDate.split('-')[0], 10),
      hour: parseInt(birthTime.split(':')[0], 10),
      min: parseInt(birthTime.split(':')[1], 10),
      lat: 55.75, // Широта (Москва)
      lon: 37.61, // Долгота (Москва)
      tzone: 3, // Часовой пояс
    };

    try {
      // Имитация запроса к API
      await new Promise((resolve) => {setTimeout(resolve, 1000)}); // Задержка 1 секунда
      const fakeApiResponse = {
        status: 'success',
        message: 'Данные успешно отправлены!',
      };

      setResult(JSON.stringify(fakeApiResponse, null, 2)); // Отображаем результат
      await navigate('/moon', { state: { natal } }); // Перенаправляем на страницу /natal
    } catch (error) {
      console.error('Ошибка:', error);
      setResult('Произошла ошибка при отправке данных.');
    } finally {
      setLoading(false); // Выключаем состояние загрузки
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        height: 700,
        margin: '0 auto',
    
        padding: 5,
        marginTop: 15,
        backgroundColor: '#ffffff',
        color: '#000000',
        fontFamily: '"IBM Plex Mono", monospace',
        backgroundImage: `url(${moonImg})`,
        // Растягиваем изображение на весь экран
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Typography variant="h3" align="center" gutterBottom sx={{ fontFamily: '"IBM Plex Mono", monospace', marginBottom: 10}}>
        Astro - pithecus
      </Typography>

      <Paper
        sx={{
          padding: 3,
          marginBottom: 5,
          backgroundColor: '#ffffff',
          border: '1px solid #000000',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid2 container spacing={2}>
            <Grid2 xs={12}>
              <TextField
                fullWidth
                type="date"
                label="Дата рождения"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
                sx={{
                  backgroundColor: '#ffffff',
                  borderRadius: 1,
                  fontFamily: '"IBM Plex Mono", monospace',
                }}
                inputProps={{ style: { color: '#000000', fontFamily: '"IBM Plex Mono", monospace' } }}
              />
            </Grid2>
            <Grid2 xs={12}>
              <TextField
                fullWidth
                type="time"
                label="Время рождения"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
                sx={{
                  backgroundColor: '#ffffff',
                  borderRadius: 1,
                  fontFamily: '"IBM Plex Mono", monospace',
                }}
                inputProps={{ style: { color: '#000000', fontFamily: '"IBM Plex Mono", monospace' } }}
              />
            </Grid2>
            <Grid2 xs={12}>
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
            </Grid2>
          </Grid2>
        </form>
      </Paper>

      {result && (
        <Paper
          sx={{
            padding: 3,
            marginBottom: 3,
            backgroundColor: '#ffffff',
            border: '1px solid #000000',
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ fontFamily: '"IBM Plex Mono", monospace' }}>
            Результат:
          </Typography>
          <pre style={{ color: '#000000', fontFamily: '"IBM Plex Mono", monospace' }}>{result}</pre>
        </Paper>
      )}
    </Box>
  );
};

export default MainPage;