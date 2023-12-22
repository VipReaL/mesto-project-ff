const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-3',
  headers: {
    authorization: '780399dd-8a4c-4128-8a16-84ec09c34b7d',
    'Content-Type': 'application/json'
  }
}

const getUserInformation = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    })
    .catch((error) => {
      console.log(error);
    })
}

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  })
  .catch((error) => {
    console.log(error);
  })
}

export { getUserInformation, getInitialCards }




/*
в файле api.js описаны функции для взаимодействия с сервером;

ответ сервера всегда проверяется на корректность проверкой res.ok;

действия с DOM-элементами на странице производятся только после завершения запроса;

в конце цепочки обработки каждого промиса обращения к серверу есть обработка ошибок;

базовый адрес сервера и ключ авторизации вынесены отдельно и переиспользуются;

функция создания карточки принимает в качестве параметров данные карточки,
функции обработки её событий и id текущего пользователя;
*/

/*
12. Требования к коду интеграции с API
Для работы с API создайте файл api.js.
Все запросы присвойте переменным и экспортируйте их.
В других модулях вы сможете импортировать эти функции и вызывать их.
Вот небольшой пример того, как можно обустроить код в файле api.js:

const config = {
  baseUrl: 'https://nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
    'Content-Type': 'application/json'
  }
}

export const getInitialCards = () => {
    return fetch('', {})
    // ...
}
*/

/*
13. Общие комментарии
1. Не забывайте проверять, всё ли в порядке с ответом.
Для этого можно использовать res.ok или res.status:

2. Учитывайте случай, когда сервер вернул ошибку:

const config = {
  baseUrl: 'https://nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
    'Content-Type': 'application/json'
  }
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

3. Обрабатывайте ошибки, которые попадают в catch.
Если запрос не ушёл на сервер или тот не ответил, сработает блок catch.
Обрабатывайте ошибку внутри этого блока.
Если нет времени писать сложную логику, просто выведите ошибку в консоль:

  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  }); 
*/