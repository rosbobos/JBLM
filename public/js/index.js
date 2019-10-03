'use strict';

// Credit: https://css-tricks.com/snippets/jquery/simple-auto-playing-slideshow/
$('#slideshow > div:gt(0)').hide();

setInterval(function() {
  $('#slideshow > div:first')
    .fadeOut(2000)
    .next()
    .fadeIn(2000)
    .end()
    .appendTo('#slideshow');
}, 8000);

function loadData() {
  $.get('/upcoming/5', calendarItems => {
    const section = $('#upcoming');
    calendarItems.forEach(event => {
      let pEl = $('<p class="upcoming-item"></p>');
      let dateEl = $('<span class="upcoming-date"></span>');
      let titleEl = $('<span class="upcoming-title"></span>');
      dateEl.text(event.date);
      titleEl.text(event.eventTitle);
      pEl.append(dateEl);
      pEl.append(titleEl);
      section.append(pEl);
    });
  });
}

function loadNews() {
  $.get('/nytimes/news', newsArray => {
    const section = $('#news');
    newsArray.forEach(news => {
      console.log('THIS IS NEWS ARRAY =====:', news);
      let newsTitle = $('<h5></h5>');
      newsTitle.text(news.title);
      let newsUpdated = $('<p></p>');
      newsUpdated.text(news.updated);
      let newsAbstract = $('<p></p>');
      newsAbstract.text(news.abstract);
      let newsLink = news.url;
      let newsURL = $( `<a href="${newsLink}">See more about this news</a>`)
      section.append(newsTitle);
      section.append(newsUpdated);
      section.append(newsAbstract);
      section.append(newsURL);
    })
  })
}

$().ready(loadData);
$().ready(loadNews);
