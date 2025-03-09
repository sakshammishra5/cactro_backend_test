const express = require('express');
const app = express();
require('dotenv').config();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'hbs');
app.use(express.static('public'));
const hbs = require('hbs');
const path=require('path')

hbs.registerPartials(path.join(__dirname + '/views/partials'))

app.use('/', require('./routes/github'));


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
