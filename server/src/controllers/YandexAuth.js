const axios = require('axios');
require('dotenv').config();
class YandexAuth {
  static async getIamToken() {
    const response = await axios.post('https://iam.api.cloud.yandex.net/iam/v1/tokens', {
      yandexPassportOauthToken: process.env.YANDEX_OAUTH_TOKEN,
    });

    return response.data.iamToken;
  }

  static async createNewApiKey() {
    const url = 'https://iam.api.cloud.yandex.net/iam/v1/apiKeys';
    const response = await axios.post(
      url,
      {
        serviceAccountId: process.env.YANDEX_FOLDER_ID,
        description: 'Auto-generated API key',
      },
      {
        headers: {
          Authorization: `Bearer ${this.getIamToken()}`,
        },
      },
    );

    return response.data.secret; // Возвращает новый API-ключ
  }
}

module.exports = YandexAuth;
