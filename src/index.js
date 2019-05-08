import $ from 'jquery';

window.$ = window.jQuery = $; // same thing for _lodash etc.

// po suti eto vendor(bundle).js dlya podkljuchenia (jquery, bootstrap, lodash i tp)
// no eto ostavim tut dlya primera t.k. chtobi pokazatt' chto hello.js videt jquery otsjuda
$(document).ready(function() {
  $('body').css('background-color', 'pink');
});