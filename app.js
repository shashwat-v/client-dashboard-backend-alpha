const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const AdsRoute = require('./routes/AdsRoute');
const UsersRoute = require('./routes/UsersRoute');
const SurveyRoute = require('./routes/SurveyRoute');
const AuthRoute = require('./routes/AuthRoute');
const ProfileRoute = require('./routes/ImageRoute');
const path = require('path');

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(express.json());
app.use(
  helmet({
    frameguard: {
      action: 'deny',
    },
    hidePoweredBy: true,
    xssFilter: true,
    noSniff: true,
    ieNoOpen: true,
    hsts: {
      maxAge: 7776000,
      force: true,
    },
  }),
);
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

// Set up routes
app.use('/ads', AdsRoute);
app.use('/users', UsersRoute);
app.use('/survey', SurveyRoute);
app.use('/auth', AuthRoute);
app.use('/uploads', express.static('uploads'), ProfileRoute);


module.exports = { app };
