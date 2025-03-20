/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useState } from 'react';
import axios from 'axios';

const CoStarApp: React.FC = () => {
  const [birthDate, setBirthDate] = useState<string>('');
  const [birthTime, setBirthTime] = useState<string>('');
  const [birthPlace, setBirthPlace] = useState<string>('');
  const [forecast, setForecast] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Обработка отправки данных
  const handleSubmit = async (): Promise<void> => {
    if (!birthDate || !birthTime || !birthPlace) return;

    setLoading(true);
    try {
      const response = await axios.post('/api/generate-forecast', {
        birthDate,
        birthTime,
        birthPlace,
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      setForecast(response.data.forecast);
    } catch (error) {
      console.error('Error generating forecast:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Астрологический прогноз</h1>
      <div>
        <label>Дата рождения:</label>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
      </div>
      <div>
        <label>Время рождения:</label>
        <input
          type="time"
          value={birthTime}
          onChange={(e) => setBirthTime(e.target.value)}
        />
      </div>
      <div>
        <label>Место рождения:</label>
        <input
          type="text"
          value={birthPlace}
          onChange={(e) => setBirthPlace(e.target.value)}
          placeholder="Город, страна"
        />
      </div>
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Генерация...' : 'Получить прогноз'}
      </button>

      {forecast && (
        <div>
          <h2>Ваш прогноз:</h2>
          <p>{forecast}</p>
        </div>
      )}
    </div>
  );
};

export default CoStarApp;