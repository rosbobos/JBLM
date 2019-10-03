'use strict';


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
    calendarItems.forEach(item => {
      let el = $('<p></p>');
      el.text(item);
      section.append(el);
    });
  });
}

$().ready(loadData);
