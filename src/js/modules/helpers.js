module.exports = {
  isNoU: function(val) { // is null or undefined
    //debugger;
    return val === null || val === undefined;
  },

  init: function() {
    // jquery test inside module
    $(document).ready(function() {
        console.log('helper->init succeess!')
    });
  },
};