import YandexAuth from "./YandexAuth";



class ApiContext {
  static async generateSentenceWithWord(word) {
    const url = 'https://llm.api.cloud.yandex.net/foundationModels/v1/completion';
    const folderId = process.env.YANDEX_FOLDER_ID;
    const requestHeaders = {
      Authorization: `Bearer ${await YandexAuth.getIamToken()}`,
      'Content-Type': 'application/json',
    };
    const requestBody = {
      modelUri: `gpt://${folderId}/yandexgpt/latest`,
      completionOptions: {
        stream: false,
        temperature: 0.6,
        maxTokens: 100,
      },
      messages: [
        {
          role: 'user',
          text: `Create a sentence with the word "${word}" and translate it.`,
        },
      ],
    };
    const response = await fetch(url, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(requestBody),
    });
    const data = await response.json();
    const result = data.result.alternatives[0].message.text;
    // Check if result contains the word
    if (result.toLowerCase().includes(word.toLowerCase())) {
      return result;
    } 
      throw new Error(`"${word}" not found in the generated sentence`);
    
  }
}

export default ApiContext;

