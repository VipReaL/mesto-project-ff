import { displayingLikes, deleteLikes } from './api.js'

//Функция создания карточки
function createCard (imageSrc, nameValue, deleteHandler, likeButton, cardId, likeCount, openImage) {
  const template = document.querySelector('#card-template').content;
  const templateElement = template.querySelector('.card').cloneNode(true);

  const image = templateElement.querySelector('.card__image');
  image.src = imageSrc;
  image.alt = nameValue;
  templateElement.querySelector('.card__title').textContent = nameValue;

  const deleteButton = templateElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteHandler);

  const cardLikeButton = templateElement.querySelector('.card__like-button');
  cardLikeButton.dataset.cardId = cardId;
  cardLikeButton.addEventListener('mousedown', likeButton);

  const cardLikeCount = templateElement.querySelector('.card__like-count');
  cardLikeCount.textContent = likeCount.length;

  const cardImage = templateElement.querySelector('.card__image');
  cardImage.addEventListener('mousedown', openImage);

  return templateElement
}

// Функция удаления карточки
function deleteCard (event) {
  event.target.closest('.card').remove();
}

// Функция лайк карточки
function likeCard (evt) {
  const cardId = evt.target.dataset.cardId;
  const cardLikeCount = evt.target.nextElementSibling;

  if (!evt.target.classList.contains('card__like-button_is-active')) {
    evt.target.classList.add('card__like-button_is-active');
    
    displayingLikes(cardId)
      .then((dataCard) => {
        cardLikeCount.textContent = dataCard.likes.length
      })
  } else {
    evt.target.classList.remove('card__like-button_is-active');
    
    deleteLikes(cardId)
      .then((dataCard) => {
        cardLikeCount.textContent = dataCard.likes.length
      })
  }
}

export { createCard, deleteCard, likeCard }