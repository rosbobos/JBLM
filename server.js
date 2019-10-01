'use strict';

// ========== Dependencies ========== //
const express = require('express');
const pg = require('pg');
const superagent = require('superagent');
const methodOverride = require('method-override');

// ========== Environment Variable ========== //
require('dotenv').config();

// ========== Server ========== //
const app = express();
const PORT = process.env.PORT || 3001;

// ========== App Middleware ========== //
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride((request, response) => {
  if (request.body && typeof request.body === 'object' && '_method' in request.body) {
    let method = request.body._method;
    delete request.body._method;
    return method;
  }
}));

// ========== Database Setup ========== //
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', error => handleError(error));
client.connect();

// ========== Set Views Engine for Templating ========== //
app.set('view engine', 'ejs');

// ========== Routes ========== //

// Routes In

// render the Home page
app.get('/', getHome);
// render the Calendar page that shows a Google Calendar API
app.get('/calendar', getCalendar);
// render the Resource page
app.get('/resources', getResources);
app.get('/calendar/:item_id', getCalendarItemDetail);

// render the Admin page
// app.get('/edit-mode/authority/admin', renderAdmin);
app.get('/admin_k6XdnVeAYtKUda2s', getAdminView);
app.get('/admin_k6XdnVeAYtKUda2s/calendar/new', getEventAdminList);
app.get('/admin_k6XdnVeAYtKUda2s/calendar/new', getNewEventView);
app.get('/admin_k6XdnVeAYtKUda2s/calendar/edit', getEditEventView);
app.get('/admin_k6XdnVeAYtKUda2s/calendar/delete', getDeleteEventView);

//Routes Out
app.post('/admin_k6XdnVeAYtKUda2s/calendar/new', postNewEvent);
app.put('/admin_k6XdnVeAYtKUda2s/calendar/edit', updateEvent);
app.delete('/admin_k6XdnVeAYtKUda2s/calendar/delete', deleteEvent);

// ========== Catch All Other Routes ========== //
app.get('*', (request, response) => response.status(404).render('pages/error'));

// ========== Home Page ========== //

function getHome(req, res) {
  res.render('pages/index');
}

function getCalendar(req, res) {
  res.render('pages/calendar');
}

function getResources(req, res) {
  res.render('pages/resources');
}

function getCalendarItemDetail(req, res) {
  res.render('pages/calendar/item');
}

function getAdminView(req, res) {
  res.render('pages/admin');
}

function getEventAdminList(req, res) {
  res.render('pages/calendar/list');
}

function getNewEventView(req, res) {
  res.render('pages/calendar/new-item');
}

function getEditEventView(req, res) {
  res.render('pages/calendar/edit-item');
}

function getDeleteEventView(req, res) {
  res.render('pages/calendar/delete-item');
}

function postNewEvent(req, res) {
  res.redirect('admin_k6XdnVeAYtKUda2s');
}

function updateEvent(req, res) {
  res.redirect('admin_k6XdnVeAYtKUda2s');
}

function deleteEvent(req, res) {
  res.redirect('admin_k6XdnVeAYtKUda2s');
}

// ========== Error Function ========== //

function handleError(err, response) {
  console.log('ERROR START ==================');
  console.error(err);
  console.log('ERROR END ====================');

  if (response) {
    response
      .status(500)
      .render('pages/error', {
        header: 'Uh Oh something went wrong :(',
        //TODO: create constructor to display JSON err obj for client
        error: JSON.stringify(err)
      });
  }
}

// ========== Listen on PORT ==========
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
