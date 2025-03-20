class NatalApi {
  static async getNatalApi(req, res) {
    try {
      const api = 'planets/tropical';
      const userId = '638907';
      const apiKey = 'f540ff95475af08fb5c34e9235fbb30dded6c12b';
      const data = {
        day: 6,
        month: 1,
        year: 2000,
        hour: 7,
        min: 45,
        lat: 19.132,
        lon: 72.342,
        tzone: 5.5,
      };

      const auth = `Basic ${Buffer.from(`${userId}:${apiKey}`).toString('base64')}`;

      const response = await fetch(`https://json.astrologyapi.com/v1/${api}`, {
        method: 'POST',
        headers: {
          authorization: auth,
          'Content-Type': 'application/json',
          'Accept-Language': 'ru',
        },
        body: JSON.stringify(req.body),
      });
      const result = await response.json();
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }

  static async moon(req, res) {
    try {
      const api = 'moon_phase_report';
      const userId = '638907';
      const apiKey = 'f540ff95475af08fb5c34e9235fbb30dded6c12b';
      const data = {
        day: 6,
        month: 1,
        year: 2000,
        hour: 7,
        min: 45,
        lat: 19.132,
        lon: 72.342,
        tzone: 5.5,
      };

      const auth = `Basic ${Buffer.from(`${userId}:${apiKey}`).toString('base64')}`;

      const response = await fetch(`https://json.astrologyapi.com/v1/${api}`, {
        method: 'POST',
        headers: {
          authorization: auth,
          'Content-Type': 'application/json',
          'Accept-Language': 'ru',
        },
        body: JSON.stringify(req.body),
      });

      const result = await response.json();
      res.status(200).send(result.response);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }

  static async chart(req, res) {
    try {
      const api = 'natal_wheel_chart';
      const userId = '638907';
      const apiKey = 'f540ff95475af08fb5c34e9235fbb30dded6c12b';
      const data = {
        day: 6,
        month: 1,
        year: 2000,
        hour: 7,
        min: 45,
        lat: 19.132,
        lon: 72.342,
        tzone: 5.5,
      };

      const auth = `Basic ${Buffer.from(`${userId}:${apiKey}`).toString('base64')}`;
      const response = await fetch(`https://json.astrologyapi.com/v1/${api}`, {
        method: 'POST',
        headers: {
          authorization: auth,
          'Content-Type': 'application/json',
          'Accept-Language': 'en',
        },
        body: JSON.stringify(req.body),
      });

      const result = await response.json();
      console.log(result);

      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
}

NatalApi.chart();

module.exports = NatalApi;
