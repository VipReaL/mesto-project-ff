import './pages/index.css';
import {initialCards} from './scripts/cards.js'

// @todo: Темплейт карточки

const template = document.querySelector('#card-template').content;

// @todo: DOM узлы

const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard (imageSrc, nameValue, deleteHandler) {

  const templateElement = template.querySelector('.card').cloneNode(true);

  const image = templateElement.querySelector('.card__image');
  image.src = imageSrc;
  image.alt = nameValue;
  templateElement.querySelector('.card__title').textContent = nameValue;

  const deleteButton = templateElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteHandler);

  return templateElement
}

// @todo: Функция добавления карточки в разметку

function addCard (markupCard) {
  placesList.append(markupCard);
}

// @todo: Функция удаления карточки

function deleteCard (event) {
  event.target.closest('.card').remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach(function (item) {
  addCard(createCard(item.link, item.name, deleteCard));
});