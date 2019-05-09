import hello from './modules/hello';
require ('./modules/alerter'); // the module pattern
let helpers = require("./modules/helpers");

// ok bundee.js v index.html podjljuchen ranse
$(document).ready(function() {
  $('body').css('background-color', 'pink');

  alerter.init();

  helpers.init(); // jquery test inside helper
  console.log(helpers.isNoU('admin'));
});

hello('Hi! Hi! Hi!');