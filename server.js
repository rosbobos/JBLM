'use strict';

// ========== Dependencies ========== //
const express = require('express');
const pg = require('pg');
const superagent = require('superagent');

// ========== Environment Variable ========== //
require('dotenv').config();

// ========== Server ========== //
const app = express();
const PORT = process.env.PORT || 3001;

// ========== App Middleware ========== //
app.use(express.static('./public'));
app.use(express.urlencoded({extended:true}));

// ========== Database Setup ========== //
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', error => console.log(error));

// ========== Set Views Engine for Templating ========== //
app.set('view engine', 'ejs');

// ========== Routes ========== //
// render the Calendar page that shows a Google Calendar API
app.get('/calendar', renderCalendar);
// render the Admin page
app.get('/edit-mode/authority/admin', renderAdmin);
// render the Home page

// render the Resource page


// ========== Catch All Other Routes ========== //
app.get('*', (request, response) => response.status(404).render('pages/error'));

// ========== Home Page ========== //
function renderCalendar(request, response){

}

function renderAdmin(request, response) {

}

// ========== Error Function ========== //
function errorHandler(error, request, response){
  console.error(error);
  response.status(500).render('pages/error');
}

// ========== Listen on PORT ==========
app.listen(PORT, () => console.log(`listening on port ${PORT}`));