$(function() {
  var $toc = $('#toc');

  // essentially a media query for Bootstrap's col-sm-* breakpoint – make the table of contents "sticky" on wider screen sizes
  if ($(window).width() >= 768) {
    $toc.addClass('sticky');
  }

  $('.sticky').Stickyfill();
});
