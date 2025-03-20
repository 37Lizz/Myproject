const natalRouter = require('express').Router();

const ApiContext = require('../controllers/APIcontext');
const NatalApi = require('../controllers/Apinatal');

natalRouter.post('/sfera', NatalApi.getNatalApi);

natalRouter.post('/moon', NatalApi.moon);

natalRouter.post('/natal', ApiContext.contextText);

module.exports = natalRouter;
