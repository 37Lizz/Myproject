
import axios from 'axios';

class YandexAuth {
  static async getIamToken(): Promise<string> {

    const response = await axios.post('https://iam.api.cloud.yandex.net/iam/v1/tokens', {
      yandexPassportOauthToken: process.env.YANDEX_OAUTH_TOKEN,
    });

    return response.data.iamToken;
  }

  static async createNewApiKey(): Promise<string> {

    const url = 'https://iam.api.cloud.yandex.net/iam/v1/apiKeys';
    const response = await axios.post(
      'https://iam.api.cloud.yandex.net/iam/v1/apiKeys',
      url,
      {
        serviceAccountId: process.env.YANDEX_FOLDER_ID,
        description: 'Auto-generated API key',
      },
      {
        headers: {
          Authorization: `Bearer ${await this.getIamToken()}`,
        },
      },
    );

    return response.data.secret; // Returns a new API key
  }
}

export default YandexAuth;


