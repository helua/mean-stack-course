const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log('this is my first middleware');
  next();
});

app.use((req, res, next) => {
  res.send('hello express!')
});

module.exports = app;
