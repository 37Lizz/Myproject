require('dotenv').config();
const YandexAuth = require('./YandexAuth');

// const info =
//   '{ "name": "Sun", "fullDegree": 259.3692854715937, "normDegree": 19.369285471593685, "speed": 1.0163786145803477, "isRetro": "false", "sign": "Sagittarius", "house": 11 }, { "name": "Moon", "fullDegree": 113.01532109301493, "normDegree": 23.015321093014933, "speed": 13.422889565180862, "isRetro": "false", "sign": "Cancer", "house": 7 }, { "name": "Mars", "fullDegree": 319.2803341423472, "normDegree": 19.280334142347215, "speed": 0.7621766783897992, "isRetro": "false", "sign": "Aquarius", "house": 1 }, { "name": "Mercury", "fullDegree": 267.157142291648, "normDegree": 27.157142291647972, "speed": -1.129353838866472, "isRetro": "true", "sign": "Sagittarius", "house": 12 }, { "name": "Jupiter", "fullDegree": 286.74844079893995, "normDegree": 16.748440798939953, "speed": 0.21989257845513263, "isRetro": "false", "sign": "Capricorn", "house": 12 }, { "name": "Venus", "fullDegree": 302.46109957231073, "normDegree": 2.4610995723107294, "speed": 1.1733155507134867, "isRetro": "false", "sign": "Aquarius", "house": 1 }, { "name": "Saturn", "fullDegree": 232.5728863112664, "normDegree": 22.572886311266387, "speed": 0.1112696563244877, "isRetro": "false", "sign": "Scorpio", "house": 10 }, { "name": "Uranus", "fullDegree": 254.1300701628793, "normDegree": 14.130070162879292, "speed": 0.06114507772452163, "isRetro": "false", "sign": "Sagittarius", "house": 11 }, { "name": "Pluto", "fullDegree": 213.81656661729093, "normDegree": 3.816566617290931, "speed": 0.030884363476755057, "isRetro": "false", "sign": "Scorpio", "house": 9 }, { "name": "Ascendant", "fullDegree": 288.3761917494198, "normDegree": 18.376191749419775, "speed": 0, "isRetro": "false", "sign": "Capricorn", "house": 1 }';

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
              text: req.body,
            },
          ],
        }),
      });
      const data = await response.json();
      const result = data.result.alternatives[0].message.text;

      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
}


module.exports = ApiContext;
