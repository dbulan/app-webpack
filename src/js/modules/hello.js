import randomer from './randomer';

function hello(message) {

  // otlichno, hello.js znaet pro jquery iz index(bundle).js
  // takze sjuda i tolko sjuda podkljuchili unikalnij method randomer()
  $(document).ready(function() {
    
    $('body').append(`<div>hello: ${message} (`+randomer()+`)</div>`);
  });
};
 
export default hello;

/*
module.exports = function (message) {
  // otlichno, hello.js znaet pro jquery iz index(bundle).js
  // no, ne smog podkljuchit' randomer, poetomu perepisal method vishe
  $(document).ready(function() {
    $('body').append(`<div>hello: ${message}</div>`);
  });
};
*/