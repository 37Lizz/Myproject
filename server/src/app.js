const express = require('express');
const morgan = require('morgan');
const authRouter = require('./routes/authRouter');

const cookieParser = require('cookie-parser');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/api/natal', authRouter);


module.exports = app;
