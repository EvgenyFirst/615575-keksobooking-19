'use strict';

// Валидация формы

// Соответствие количества комнат и гостей
var calculateGuestsAndRooms = function () {
  var adForm = document.querySelector('.ad-form');
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
};

calculateGuestsAndRooms();
