const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'src', 'public')));

const routes = require('./src/routes');
app.use('/', routes);

module.exports = app;
