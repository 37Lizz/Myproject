class NatalApi {
  static async getNatalApi(req, res) {
    try {
      const api = 'planets/tropical';
      const userId = '638937';
      const apiKey = 'b966d3d8d34927d2a4496ba5678d84d910c16a69';
  
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
   console.log(req.body)
      const api = 'moon_phase_report';
      const userId = '638937';
      const apiKey = 'b966d3d8d34927d2a4496ba5678d84d910c16a69';
  

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
      res.status(200).send(result.report);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }

  static async chart(req, res) {
    try {
   
      const api = 'natal_wheel_chart';
      const userId = '638937';
      const apiKey = 'b966d3d8d34927d2a4496ba5678d84d910c16a69';
  
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

      res.status(200).send(result.chart_url);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
}



module.exports = NatalApi;
