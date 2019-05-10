import $ from 'jquery';
import moment from 'moment';

// css (without sass)
//import '../style/css/custom.css';

// css + sass
import '../style/scss/app.scss';

window.$ = window.jQuery = $; // same thing for _lodash etc. 
// a mozno v  plugins -> ProvidePlugin
// no togda jquery budet 2 raza v bilde index.js i game.js
// poetomu ostavljaem etot variant (on menj poka ustraivaet) t.e. jquery tolka v index.js a game.js vseravno ego ponimaet

// po suti eto vendor(bundle).js dlya podkljuchenia (jquery, bootstrap, lodash i tp)
// no eto ostavim tut dlya primera t.k. chtobi pokazatt' chto hello.js videt jquery otsjuda
$(document).ready(function() {
  $('body').css('background-color', 'pink');

  let today = moment(new Date()).locale('ru');
  $('body').append(`<div>${today.format('MMMM Do YYYY, h:mm:ss a')}</div>`);
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