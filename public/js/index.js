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

$().ready(loadData);
