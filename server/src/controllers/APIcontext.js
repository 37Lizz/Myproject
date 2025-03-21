require('dotenv').config();
const YandexAuth = require('./YandexAuth');



class ApiContext {
  static async contextText(req, res) {
    try {
      const API_URL = 'https://llm.api.cloud.yandex.net/foundationModels/v1/completion';
      const FOLDER_ID = process.env.YANDEX_FOLDER_ID;
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${await YandexAuth.getIamToken()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          modelUri: `gpt://${FOLDER_ID}/yandexgpt/rc`,
          completionOptions: {
            stream: false,
            temperature: 0,
            maxTokens: 1000,
          },
          messages: [
            {
              role: 'system',
              text: 'Ты рассказываешь о натальной карте пользователя, тебе известны данные о позициях планет пользователя. Выведи прогноз на текущую дату по сферам жизни. И какую-то философскую цитату для пользователя олицетворяющую его день. Как результат верни объект с ключами - сферами и философской фразой',
            },
            {
              role: 'user',
              text: JSON.stringify(req.body),
            },
          ],
        }),
      });
      const data = await response.json();
      
      const cleanedData = data.result.alternatives[0].message.text.replace(/```/g, '').replace(/\\"/g, '"').trim();
     const result =  JSON.parse(cleanedData)

      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }

  static async meditation(req, res) {
    try {
      const API_URL = 'https://llm.api.cloud.yandex.net/foundationModels/v1/completion';
      const FOLDER_ID = process.env.YANDEX_FOLDER_ID;
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${await YandexAuth.getIamToken()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          modelUri: `gpt://${FOLDER_ID}/yandexgpt/rc`,
          completionOptions: {
            stream: false,
            temperature: 0,
            maxTokens: 1000,
          },
          messages: [
            {
              role: 'system',
              text: 'Напиши текст для медитации на 1 минуту',
            }
          ],
        }),
      });
      const data = await response.json();
    
      res.status(200).json(data.result.alternatives[0].message.text);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }

  static async moon(req, res) {
    try {
      const API_URL = 'https://llm.api.cloud.yandex.net/foundationModels/v1/completion';
      const FOLDER_ID = process.env.YANDEX_FOLDER_ID;
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${await YandexAuth.getIamToken()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          modelUri: `gpt://${FOLDER_ID}/yandexgpt/rc`,
          completionOptions: {
            stream: false,
            temperature: 0,
            maxTokens: 1000,
          },
          messages: [
            {
              role: 'system',
              text: 'Ты переводчик с английского на русский, переведи введенный текст',
            },
            {
              role: 'user',
              text: req.body.text,
            },
          ],
        }),
      });
      const data = await response.json();
    
      res.status(200).send(data.result.alternatives[0].message.text);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
}

module.exports = ApiContext;
