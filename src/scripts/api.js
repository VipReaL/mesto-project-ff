const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-3',
  headers: {
    authorization: '780399dd-8a4c-4128-8a16-84ec09c34b7d',
    'Content-Type': 'application/json'
  }
}

function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
} 

// Загрузка информации о пользователе с сервера
const getUserInformation = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => getResponseData(res))
}

// Загрузка карточек с сервера
const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => getResponseData(res))
}

// Редактирование профиля
const editingProfile = (nameInput, jobInput) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: nameInput,
      about: jobInput
    }) 
  })
  .then(res => getResponseData(res))
}

// Добавление новой карточки
const addNewCard = (placeName, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: placeName,
      link: link
    })
  })
  .then(res => getResponseData(res))
}

// Отображение лайков
const displayingLikes = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(res => getResponseData(res))
}

// Удаление лайков
const deleteLikes = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => getResponseData(res))
}

// Удаление карточки
const userDeleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => getResponseData(res))
}

// Обновление аватара пользователя
const updatingUserAvatar = (urlAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: urlAvatar
    }) 
  })
  .then(res => getResponseData(res))
}

export {
  getUserInformation,
  getInitialCards,
  editingProfile,
  addNewCard,
  displayingLikes,
  deleteLikes,
  userDeleteCard,
  updatingUserAvatar
}