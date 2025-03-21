const express = require('express');
const morgan = require('morgan');


const cookieParser = require('cookie-parser');
const natalRouter = require('./routes/natalRouter');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/api', natalRouter);


module.exports = app;
