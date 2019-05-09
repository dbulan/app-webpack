import hello from './modules/hello';
require ('./modules/alerter'); // the module pattern
let helpers = require("./modules/helpers");

// ok bundee.js v index.html podjljuchen ranse
$(document).ready(function() {
  $('body').css('background-color', 'pink');

  alerter.init();

  helpers.init(); // jquery test inside helper
  console.log(helpers.isNoU('admin'));

  // plugin kompiliruetsa, no podkluchaetsa tolko pri clicke na knopku
  document.getElementById('app-require').onclick = function () {
    // est dva sposoba require.ensure i amd -> require.ensure lutcse
    
    // v dannom primere on podgruzitsa srazu bez nazatia na knoplu
    // let btnclick = require('./modules/btnclick');
    // btnclick();
    //
    // require.ensure
    require.ensure([], function(require) { // .ensure['module1', 'module2'], ps mozno prosto ostavit' .ensure[] webpack po require pojmet che emu nuzno -> tak i sdelaem
      let btnclick = require('./modules/btnclick')['default'];
      btnclick();
    });
    //
    // amd
    //require(['./modules/btnclick'], function(btnclick) {
    //  btnclick();
    //});
    //
    // posle npm run dev pojavitsa 0.js (eto kakraz dlya btnclick)
    // esli ne zagruzaetsa to vozmozno nuzno poigratsa s output publicPath t.k. moduli tipa iz interneta podnjagivajutsa
    // osobenno esli v /public u menja ierarxia
    // kstati 0.js t.e. btnclick.js podgruzaetsa tolko pri pervom clicke
  };
});

hello('Hi! Hi! Hi!');