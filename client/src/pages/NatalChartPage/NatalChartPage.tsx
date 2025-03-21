import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button, Modal, Skeleton } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';

import UrlImg from '../../../public/25b6350f2604a65763fc9fceee6d85ad.jpg'; // Фоновое изображение
import MeditationButton from '../../components/MedutationButton';


const MoonPage = () => {
  const [svgUrl, setSvgUrl] = useState('');
  const [forecast, setForecast] = useState({});
  const [philosophy, setPhilosophy] = useState('');
  const [moonAdvice, setMoonAdvice] = useState('');
  const [meditation, setMeditation] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const { natal } = location.state;
const navigate = useNavigate()

  useEffect(() => {
  
    axios
      .post('/api/moon', natal)
      .then(({ data }) => axios.post('/api/moonRussia', {text: data}). then(({data})=> setMoonAdvice(data)))
      .catch((error) => console.log(error));

 
    axios
      .post('/api/chart', natal)
      .then(({ data }) => setSvgUrl(data))
      .catch((error) => console.log(error));

      axios
      .get('/api/meditation')
      .then(({ data }) => setMeditation(data))
      .catch((error) => console.log(error)).finally(() => setIsLoading(false));;

    axios
      .post('/api/sfera', natal)
      .then(({ data }) => axios.post('/api/natal', data))
      .then(({ data }) => {
        setForecast(data); // Устанавливаем прогноз
        setPhilosophy(data['Философия дня']); // Устанавливаем философскую фразу
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false)); // Завершаем загрузку
 
  }, [natal]);


  const handleLogout = ():void => {
   void navigate('/'); // Переход на главную страницу
  };
 
  // Открытие модального окна
  const handleOpenModal = (): void => {
    setIsModalOpen(true);
  };

  // Закрытие модального окна
  const handleCloseModal = (): void => {
    setIsModalOpen(false);
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: '0 auto',
        padding: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        color: '#000000',
        borderRadius: 2,
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        fontFamily: '"IBM Plex Mono", monospace',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      {/* Заголовок страницы */}
      <Typography variant="h5" gutterBottom  sx={{
        fontFamily: '"IBM Plex Mono", monospace',
      }}>
        Прогноз на день
      </Typography>

      {/* Отображение SVG */}
      {isLoading ? (
        <Skeleton variant="rectangular" width={500} height={300} />
      ) : (
        <Box
          sx={{
            width: '100%',
            filter: 'grayscale(100%)', // Черно-белый фильтр
            borderRadius: 2,
            mb: 3,
          }}
        >
          <img src={svgUrl} alt="moon" style={{ width: '100%', height: 'auto', maxWidth: '400px' }}/>
        </Box>
      )}

      {/* Прогноз на день */}
      <Typography variant="h6" gutterBottom style = {{fontFamily: '"IBM Plex Mono", monospace'}}>
        Прогноз:
      </Typography>
      {isLoading ? (
        <Skeleton variant="text" width={200} height={30} />
      ) : (
        <ul style={{ textAlign: 'left', paddingLeft: 20 }}>
          {Object.entries(forecast).map(([key, value]) => {
            if (key !== 'Философия дня') {
              return (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              );
            }
            return null;
          })}
        </ul>
      )}

      {/* Философская фраза */}
      <Typography variant="body1" sx={{ mt: 2, fontStyle: 'italic' }}>
        {isLoading ? <Skeleton variant="text" width={300} height={24} /> : philosophy}
      </Typography>

      {/* Кнопка "Moon Advice" */}
      <Button
  variant="contained"
  sx={{
    mt: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', 
    backgroundImage: `url(${UrlImg})`, 
    position: 'relative',
    backgroundPosition: 'center',
    zIndex: 2,
    color: 'black', 
    overflow: 'hidden',

  }}
  onClick={handleOpenModal}
>
        Moon Advice
      </Button>

      <MeditationButton meditation={ meditation}/>


      <Button
        variant="contained"
        sx={{ mt: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.5)', 
          backgroundImage: `url(${UrlImg})`, 
          position: 'relative',
          backgroundPosition: 'center',
          zIndex: 2,
          color: 'black', 
          overflow: 'hidden', }}
        onClick={handleLogout} // Обработчик для выхода
      >
        Выход
      </Button>

      {/* Модальное окно с советом */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="moon-advice-modal"
        aria-describedby="moon-advice-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" id="moon-advice-modal" gutterBottom style = {{fontFamily: '"IBM Plex Mono", monospace'}}>
          Moon Advice
          </Typography>
          <Typography variant="body1" id="moon-advice-description">
            {moonAdvice}
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 3,
              backgroundColor: 'rgba(255, 255, 255, 0.5)', 
              backgroundImage: `url(${UrlImg})`, 
              position: 'relative',
              backgroundPosition: 'center',
              zIndex: 2,
              color: 'black', 
              overflow: 'hidden', }}
            onClick={handleCloseModal}
          >
            Закрыть
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};


export default MoonPage;