'use strict';

window.util = (function () {
  var ENTER_KEYCODE = '0D';

  return {
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
  };
})();
