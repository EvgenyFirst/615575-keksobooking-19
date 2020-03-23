'use strict';

var LOCATION_X_MIN = 0;
var LOCATION_X_MAX = document.querySelector('.map__pins').clientWidth;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var PINS_RANDOM_OBJECTS = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MIN_PRICE = 0;
var MAX_PRICE = 1000000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 4;
var MIN_GUESTS = 1;
var MAX_GUESTS = 10;
var LEFT_MOUSE_BUTTON = 0;
var MAP_PIN_MAIN_LEFT_LOCATION = 570;
var MAP_PIN_MAIN_TOP_LOCATION = 375;
var MAP_PIN_MAIN_WIDTH = 40;
var MAP_PIN_MAIN_HEIGHT = 44;
var mapPinMain = document.querySelector('.map__pin--main');
var cityMap = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var adFormElement = document.querySelectorAll('.ad-form__element');
var mapFilter = document.querySelectorAll('.map__filter');
var addressInput = adForm.querySelector('#address');

var titlesObjects = [
  'Лучшее место отдохнуть от всех',
  'Отличный выбор для двоих',
  'Уединенное место для романтического уикенда',
  'Места хватит даже для самой большой компании',
  'Шикарные апартаменты для знающих себе цену людей',
  'Рукой подать до всех главных достопримечательностей',
  'Самый выгодный выбор за минимальные деньги'
];

var typesObjects = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var checkinsObjects = [
  '12:00',
  '13:00',
  '14:00'
];

var checkoutsObjects = [
  '12:00',
  '13:00',
  '14:00'
];

var featuresObjects = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var descriptionsObjects = [
  'Комфортное и недорогое жилье в самом центре города. В пешей достпуности находятся сразу несколько круглосуточных супермаркетов.',
  'Жилье находится на тихой улочке. Со всех сторон разбиты красивые сады.',
  'Жилье прямо у станции метро. Можно легко добраться до любого уголка города.'
];

var photosObjects = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var objectsList = [];

var createObjects = function (randpmObjects) {
  var object = [];
  for (var j = 0; j < randpmObjects; j++) {
    object[j] = j;
  }

  return object;
};

var pinsObjects = createObjects(PINS_RANDOM_OBJECTS);

var mixObjects = function (objects) {
  var l;
  var temp;
  for (var k = objects.length - 1; k > 0; k--) {
    l = Math.floor(Math.random() * (k + 1));
    temp = objects[l];
    objects[l] = objects[k];
    objects[k] = temp;
  }

  return objects;
};

var mixPinsObjects = mixObjects(pinsObjects);

var mixObjectsElement = function (object) {
  return Math.floor(Math.random() * object.length);
};

var mixIntegerInRange = function (min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
};

var makeOffer = function (randpmObjects) {
  for (var i = 0; i < randpmObjects; i++) {
    var locationX = mixIntegerInRange(LOCATION_X_MIN, LOCATION_X_MAX);
    var locationY = mixIntegerInRange(LOCATION_Y_MIN, LOCATION_Y_MAX);
    objectsList[i] = {
      author: {
        avatar: 'img/avatars/user0' + (mixPinsObjects[i] + 1) + '.png'
      },

      offer: {
        title: titlesObjects[mixObjectsElement(titlesObjects)],
        address: locationX + ', ' + locationY,
        price: mixIntegerInRange(MIN_PRICE, MAX_PRICE),
        type: typesObjects[mixObjectsElement(typesObjects)],
        rooms: mixIntegerInRange(MIN_ROOMS, MAX_ROOMS),
        guests: mixIntegerInRange(MIN_GUESTS, MAX_GUESTS),
        checkin: checkinsObjects[mixObjectsElement(checkinsObjects)],
        checkout: checkoutsObjects[mixObjectsElement(checkoutsObjects)],
        features: featuresObjects,
        description: descriptionsObjects[mixObjectsElement(descriptionsObjects)],
        photos: photosObjects[mixObjectsElement(photosObjects)]
      },

      location: {
        x: locationX,
        y: locationY
      }
    };
  }

  return objectsList;
};

var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var renderPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinImage = pinElement.querySelector('img');
  pinElement.style.left = (pin.location.x - PIN_WIDTH / 2) + 'px';
  pinElement.style.top = (pin.location.y - PIN_HEIGHT) + 'px';
  pinImage.src = pin.author.avatar;
  pinImage.alt = pin.offer.title;

  return pinElement;
};

var setStateInactive = function () {
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

setStateInactive();

var setStateActive = function () {
  cityMap.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  adFormElement.forEach(function (formElement) {
    formElement.disabled = false;
  });
  mapFilter.forEach(function (filterElement) {
    filterElement.disabled = false;
  });
  mapPins.appendChild(fragment);
};

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === LEFT_MOUSE_BUTTON) {
    setStateActive();
  }
});

var fragment = document.createDocumentFragment();
objectsList = makeOffer(PINS_RANDOM_OBJECTS);
objectsList.forEach(function (pin) {
  fragment.appendChild(renderPin(pin));
});

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


// Валидация формы

// Соответствие количества комнат и гостей
var roomNumber = adForm.querySelector('#room_number');
var capacity = adForm.querySelector('#capacity');

var checkGuestHousing = function (select) {
  var currentRoomNumber = parseInt(roomNumber.value, 10);
  var currentCapacity = parseInt(capacity.value, 10);
  roomNumber.setCustomValidity('');
  capacity.setCustomValidity('');
  if ((currentRoomNumber === 100) && (currentCapacity !== 0)) {
    select.setCustomValidity('Не для гостей');
  } else if ((currentRoomNumber !== 100) && (currentCapacity === 0)) {
    select.setCustomValidity('Минимум 1 гость');
  } else if ((currentCapacity > 0) && (currentRoomNumber < currentCapacity)) {
    select.setCustomValidity(currentRoomNumber + ' комната(ы) для ' + currentRoomNumber + ' гостя(ей)');
  } else {
    roomNumber.setCustomValidity('');
    capacity.setCustomValidity('');
  }
};
checkGuestHousing(roomNumber);
roomNumber.addEventListener('change', function () {
  checkGuestHousing(roomNumber);
});
capacity.addEventListener('change', function () {
  checkGuestHousing(capacity);
});

// Нажатие на Enter

document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    setStateActive();
  }
});

