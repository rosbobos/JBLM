'use strict';

// ========== Dependencies ========== //
const fs = require('fs');
const express = require('express');
const pg = require('pg');
const superagent = require('superagent');
const methodOverride = require('method-override');

const GoogleCalendarAPI = require('./googleapi');
const GCA = new GoogleCalendarAPI();

// TODO: fix to get event list properly
let eventListCache = GCA.getEventList();

// ========== Environment Variable ========== //
require('dotenv').config();

// ========== Server ========== //
const app = express();
const PORT = process.env.PORT || 3001;

// ========== App Middleware ========== //
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    let method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

// Log all invoked routes to console
app.use((req, res, next) => {
  console.log(`==>> ${req.method} ${req.originalUrl} ...`);
  next();
});

// ========== Database Setup ========== //
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', error => handleError(error));
client.connect();

// ========== Set Views Engine for Templating ========== //
app.set('view engine', 'ejs');

// ========== Routes ========== //

// render the Home page
app.get('/', getHome);
app.get('/upcoming/:count', getUpcoming);
app.get('/nytimes/news', getNews);
// render the Calendar page that shows a Google Calendar API
app.get('/calendar', getCalendar);
// render the Resource page
app.get('/resources', getResources);
// produce the email link
app.get('/email', getEmailLink);

// render the Admin pages
const adminRoute = process.env.ADMIN_ROUTE;

// Make sure we do not set up the routes if ADMIN_ROUTE is not defined.
if (adminRoute) {
  app.get(`/${adminRoute}`, getAdminView);
  app.get(`/${adminRoute}/resource`, getResourceAdminList);
  app.post(`/${adminRoute}/resource/new`, postNewResource);
  app.delete(`/${adminRoute}/resource/delete/:id`, deleteResource);
} else {
  console.log('no ADMIN_ROUTE .env value');
}

// ========== Catch All Other Routes ========== //
app.all('*', (req, res) => {
  res.status(404).send('This route does not exist.');
  console.log(`Route for ${req.method} ${req.originalUrl} does not exist.`);
});

// ========== Route Handlers ========== //

function getHome(req, res) {
  res.render('pages/index');
}

// TODO: eventList cache needs to be better managed!
function getUpcoming(req, res) {
  let eventList = GCA.getEventList();
  res.send(eventList);
}

function getNews(req, res) {
  let newsURL = `https://api.nytimes.com/svc/mostpopular/v2/shared/1/facebook.json?api-key=${process.env.NYTIMES_API_KEY}`;
  superagent.get(newsURL)
    .then(newsResults => {
      const newsParse = JSON.parse(newsResults.text);
      let newsArray = [];
      for (let i = 0; i < Math.min(5, newsParse.results.length); i++) {
        const title = newsParse.results[i].title;
        const updated = newsParse.results[i].updated;
        const abstract = newsParse.results[i].abstract;
        const url = newsParse.results[i].url;
        const newNews = new NYNews(title, updated, abstract, url);
        newsArray.push(newNews);
      }
      res.send(newsArray);
    })
    .catch(err => handleError(err, res));
}

function getCalendar(req, res) {
  res.render('pages/calendar');
}

function getResources(req, res) {
  const sql = 'SELECT id, title, description, resource_url, logo_png FROM resource ORDER BY title DESC;';

  client
    .query(sql)
    .then(sqlResults => {
      res.render('pages/resources', { resource: sqlResults.rows });
    })
    .catch(err => handleError(err, res));
}

function getEmailLink(req, res) {
  res.redirect(`${process.env.EMAIL}`);
}

function getAdminView(req, res) {
  const sql = 'SELECT id, title, description, resource_url, logo_png FROM resource ORDER BY title DESC;';

  client
    .query(sql)
    .then(sqlResults => {
      res.render('pages/admin', {
        adminRoute: adminRoute,
        resource: sqlResults.rows
      });
    })
    .catch(err => handleError(err, res));
}

function getResourceAdminList(req, res) {
  const sql = 'SELECT id, title, description, resource_url, logo_png FROM resource ORDER BY title DESC;';

  client
    .query(sql)
    .then(sqlResults => {
      res.render('pages/resource/list', {
        adminRoute: adminRoute,
        resource: sqlResults.rows
      });
    })
    .catch(err => handleError(err, res));
}

function postNewResource(req, res) {
  let { title, description, resource_url } = req.body;
  let values = [title, description, resource_url];

  let sql = 'INSERT INTO resource (title, description, resource_url) VALUES($1, $2, $3);';
  client
    .query(sql, values)
    .then(sqlResults => {
      res.redirect(303, `/${adminRoute}/resource`);
      // getResourceAdminList(req, res);
    })
    .catch(err => handleError(err, res));
}

function deleteResource(req, res) {
  let values = [req.params.id];
  let sql = 'DELETE FROM resource WHERE id = $1;';
  client
    .query(sql, values)
    .then(sqlResults => {
      res.redirect(303, `/${adminRoute}/resource`);
    })
    .catch(err => handleError(err, res));
}

// ========== News Constructor Object ========== //
function NYNews(title, updated, abstract, url) {
  this.title = title;
  this.updated = updated;
  this.summary = abstract;
  this.url = url;
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
        error: err.toString()
      });
  }
}

// ========== Listen on PORT ==========
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
