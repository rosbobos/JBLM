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
