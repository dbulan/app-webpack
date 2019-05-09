import $ from 'jquery';

window.$ = window.jQuery = $; // same thing for _lodash etc.

// po suti eto vendor(bundle).js dlya podkljuchenia (jquery, bootstrap, lodash i tp)
// no eto ostavim tut dlya primera t.k. chtobi pokazatt' chto hello.js videt jquery otsjuda
$(document).ready(function() {
  $('body').css('background-color', 'pink');
});


(function () { // inace console.log ne otrabotaet -> callback v konce
  
  console.log(process.env.NODE_ENV); // current mode
  //console.log(process.env.PORT);
  //if(process.env.NODE_ENV == 'pro') {
  //console.log('index: development mode!');
  //}
}());

(function wow() { // function inside function
       
  const load = () => {
    console.log('wow index.js loaded!');
  };

  load();
})(); // vseravno sama sebja vizivaet
// wow(); // a tak nelzia // wow is not defined