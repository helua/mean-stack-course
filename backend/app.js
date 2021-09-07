//express.js backend application
const express = require('express');
const bodyParser = require('body-parser');//to parse the server responses correctly, read fields of response as json file
const mongoose = require('mongoose');//mongoose to connect to mongodb and create data model
const postRoutes = require('./routes/posts');


const app = express();//main app const

mongoose.connect('mongodb+srv://helio:KhnaxK4SYeARsgg1@cluster0.dpgzm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  .then(() => {//promise
    console.log('Connected successfully to database');
  })
  .catch(() => {
    console.log('Connection failed');
  });

app.use(bodyParser.json());//użycie tego tam bodyparsera żeby sczytywać do jsona
app.use(bodyParser.urlencoded({extended: false}));


app.use((req, res, next) => {//ustawienie nagłówków pod CORS i interakcje z bazą danych
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
    );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
    );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PATCH, PUT, DELETE, OPTIONS"
    );
  next();
});

app.use('/api/posts', postRoutes);

module.exports = app; //wyeksportować appkę żeby użyć jej w server.js po stronie frontu
