import $ from 'jquery';

window.jQuery = $;  // same thing for _lodash etc.
window.$ = $;

$(document).ready(function() {
  $('body').css('background-color', 'pink');
});