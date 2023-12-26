const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-3',
  headers: {
    authorization: '780399dd-8a4c-4128-8a16-84ec09c34b7d',
    'Content-Type': 'application/json'
  }
}

// Загрузка информации о пользователе с сервера
const getUserInformation = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка загрузки информации о пользователе с сервера: ${response.status}`);
    })
    .catch((error) => {
      console.log(error);
    })
}

// Загрузка карточек с сервера
const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка загрузки карточек с сервера: ${response.status}`);
  })
  .catch((error) => {
    console.log(error);
  })
}

// Редактирование профиля
const EditingProfile = (nameInput, jobInput) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: nameInput,
      about: jobInput
    }) 
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка редактирование профиля: ${response.status}`);
  })
  .catch((error) => {
    console.log(error);
  })
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
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка добавления новой карточки: ${response.status}`);
  })
  .catch((error) => {
    console.log(error);
  })
}

// Отображение лайков
const displayingLikes = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка отображение лайков: ${response.status}`);
  })
  .catch((error) => {
    console.log(error);
  })
}

// Удаление лайков
const deleteLikes = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка удаления лайков: ${response.status}`);
  })
  .catch((error) => {
    console.log(error);
  })
}

// Удаление карточки
const userDeleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка удаления карточки: ${response.status}`);
  })
  .catch((error) => {
    console.log(error);
  })
}

export {
  getUserInformation,
  getInitialCards,
  EditingProfile,
  addNewCard,
  displayingLikes,
  deleteLikes,
  userDeleteCard
}