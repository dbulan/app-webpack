import hello from './modules/hello';
require ('./modules/alerter'); // the module pattern

// ok bundee.js v index.html podjljuchen ranse
$(document).ready(function() {
  $('body').css('background-color', 'pink');

  alerter.init();
});

hello('Hi! Hi! Hi!');