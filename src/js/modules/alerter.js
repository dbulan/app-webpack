window.alerter = (function () {
  'use strict'

  var me = {};

  me.init = function () {
    $('#app-alerter').click(function(e) { 
      e.preventDefault();

      alert('alert hello!');
    });
  };

  return me;

}());