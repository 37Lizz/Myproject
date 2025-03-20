import React, { useState } from 'react';

import styles from './MainPage.module.css';
import { useNavigate } from 'react-router';

const MainPage: React.FC = () => {
  const [birthDate, setBirthDate] = useState<string>('');
  const [birthTime, setBirthTime] = useState<string>('');
  const [birthPlace, setBirthPlace] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = ():void => {
    // Сохраняем данные в localStorage
    localStorage.setItem('birthDate', birthDate);
    localStorage.setItem('birthTime', birthTime);
    localStorage.setItem('birthPlace', birthPlace);

    // Переходим на страницу с натальной картой
    void navigate('/natal-chart');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Добро пожаловать!</h1>
      <p className={styles.subtitle}>Введите свои данные для генерации натальной карты и прогноза.</p>
      <div className={styles.form}>
        <label className={styles.label}>Дата рождения:</label>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className={styles.input}
        />
        <label className={styles.label}>Время рождения:</label>
        <input
          type="time"
          value={birthTime}
          onChange={(e) => setBirthTime(e.target.value)}
          className={styles.input}
        />
        <label className={styles.label}>Место рождения:</label>
        <input
          type="text"
          value={birthPlace}
          onChange={(e) => setBirthPlace(e.target.value)}
          placeholder="Город, страна"
          className={styles.input}
        />
        <button onClick={handleSubmit} className={styles.button}>
          Продолжить
        </button>
      </div>
    </div>
  );
};

export default MainPage;