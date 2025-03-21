const natalRouter = require('express').Router();

const ApiContext = require('../controllers/APIcontext');
const NatalApi = require('../controllers/Apinatal');

natalRouter.post('/sfera', NatalApi.getNatalApi);

natalRouter.post('/moon', NatalApi.moon);

natalRouter.post('/chart', NatalApi.chart);


natalRouter.post('/natal', ApiContext.contextText);
natalRouter.get('/meditation', ApiContext.meditation);
natalRouter.post('/moonRussia', ApiContext.moon);

module.exports = natalRouter;
