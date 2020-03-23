'use strict';

var setStateInActive = function () {
  var MAP_PIN_MAIN_LEFT_LOCATION = 570;
  var MAP_PIN_MAIN_TOP_LOCATION = 375;
  var MAP_PIN_MAIN_WIDTH = 40;
  var MAP_PIN_MAIN_HEIGHT = 44;

  var cityMap = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var adFormElement = document.querySelectorAll('.ad-form__element');
  var mapFilter = document.querySelectorAll('.map__filter');
  var addressInput = adForm.querySelector('#address');

  cityMap.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');
  adFormElement.forEach(function (formElement) {
    formElement.disabled = true;
  });
  mapFilter.forEach(function (filterElement) {
    filterElement.disabled = true;
  });
  addressInput.value = Math.round(MAP_PIN_MAIN_LEFT_LOCATION + (MAP_PIN_MAIN_WIDTH / 2)) + ', ' + Math.round(MAP_PIN_MAIN_TOP_LOCATION + (MAP_PIN_MAIN_HEIGHT / 2));
};

setStateInActive();
