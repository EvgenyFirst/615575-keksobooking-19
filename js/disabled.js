'use strict';

var getDisabledAttribute = function () {

  var adForm = document.querySelector('.ad-form');

  var mapFilters = document.querySelector('.map__filters');
  mapFilters.querySelectorAll('select').forEach(function (setAttr) {
    setAttr.setAttribute('disabled', 'disabled');
  });

  mapFilters.querySelectorAll('fieldset').forEach(function (setAttr) {
    setAttr.setAttribute('disabled', 'disabled');
  });

  adForm.querySelectorAll('fieldset').forEach(function (setAttr) {
    setAttr.setAttribute('disabled', 'disabled');
  });

};

getDisabledAttribute();
