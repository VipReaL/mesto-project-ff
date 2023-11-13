// @todo: Темплейт карточки

const template = document.querySelector('#card-template').content;

// @todo: DOM узлы

const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard (imageSrc, imageAlt, nameValue, deleteHandler) {

  const templateElement = template.querySelector('.card').cloneNode(true);

  templateElement.querySelector('.card__image').src = imageSrc;
  templateElement.querySelector('.card__image').alt = imageAlt;
  templateElement.querySelector('.card__title').textContent = nameValue;

  const deleteButton = templateElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteHandler);

  placesList.append(templateElement);
};

// @todo: Функция удаления карточки

function deleteCard (event) {
  event.target.parentElement.remove();
};

// @todo: Вывести карточки на страницу

initialCards.forEach(function (item) {
  createCard(item.link, item.name, item.name, deleteCard);
});
