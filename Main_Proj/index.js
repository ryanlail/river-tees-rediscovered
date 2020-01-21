'use strict';

const express = require('express');
const app = express();
const router = require('./routes/routes');


app.use(express.static('local'));
app.use(router.router);
module.exports = app;