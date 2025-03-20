import React from 'react';
import styles from './DailyForecastPage.module.css';

const DailyForecastPage: React.FC = () => {
  const dailyTips = [
    'Сосредоточьтесь на карьерных целях.',
    'Проведите время с близкими.',
    'Избегайте импульсивных решений.',
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Прогноз на день</h1>
      <div className={styles.content}>
        <p>Сегодня стоит обратить внимание на карьеру и финансы. Меркурий в Козероге способствует успешным переговорам.</p>
        <h2>Советы на сегодня:</h2>
        <ul className={styles.tips}>
          {dailyTips.map((tip, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index} className={styles.tip}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DailyForecastPage;