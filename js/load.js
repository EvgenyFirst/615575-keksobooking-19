'use strict';
(function () {

  var onError = function (message) {
    // eslint-disable-next-line no-console
    console.error(message);
  };

  var onSuccess = function (data) {
    var animals = data;

    // eslint-disable-next-line no-console
    console.log(animals);
  };


  var xhr = new XMLHttpRequest();

  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    switch (xhr.status) {
      case 200:
        onSuccess(xhr.response);
        break;

      default:
        onError('Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText);
    }
  });

  xhr.addEventListener('error', function () {
    onError('Произошла ошибка соединения');
  });

  xhr.addEventListener('timeout', function () {
    onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
  });


  xhr.timeout = 1000;

  xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
  xhr.send();
})();
