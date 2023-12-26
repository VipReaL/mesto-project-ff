import { displayingLikes, deleteLikes, userDeleteCard } from './api.js'
import { userId } from '../index.js'

// Функция создания карточки
function createCard (imageSrc, nameValue, ownerId, cardId, likeCount, openImage) {
  const template = document.querySelector('#card-template').content;
  const templateElement = template.querySelector('.card').cloneNode(true);

  templateElement.dataset.cardId = cardId;
  templateElement.querySelector('.card__title').textContent = nameValue;

  const image = templateElement.querySelector('.card__image');
  image.src = imageSrc;
  image.alt = nameValue;
  image.addEventListener('mousedown', openImage);

  const deleteButton = templateElement.querySelector('.card__delete-button');
  if (userId === ownerId) {
    deleteButton.addEventListener('click', deleteCard);
  } else {
    deleteButton.classList.add('card__delete-button_disabled')
  }

  const cardLikeButton = templateElement.querySelector('.card__like-button');
  cardLikeButton.addEventListener('mousedown', likeCard);

  const cardLikeCount = templateElement.querySelector('.card__like-count');
  cardLikeCount.textContent = likeCount.length;
  
  likeCount.forEach((item) => {
    if (userId === item._id) {
      cardLikeButton.classList.add('card__like-button_is-active');
    }
  })

  return templateElement
}

// Функция удаления карточки
function deleteCard (evt) {
  const card = evt.target.closest('.card');
  const cardId = card.dataset.cardId;
  evt.target.closest('.card').remove();
  userDeleteCard(cardId)
}

// Функция лайк карточки
function likeCard (evt) {
  const card = evt.target.closest('.card');
  const cardId = card.dataset.cardId;
  const cardLikeCount = evt.target.nextElementSibling; // FIXME:

  if (!evt.target.classList.contains('card__like-button_is-active')) {
    evt.target.classList.add('card__like-button_is-active');
    
    displayingLikes(cardId)
      .then((dataCard) => {
        cardLikeCount.textContent = dataCard.likes.length;
      })
  } else {
    evt.target.classList.remove('card__like-button_is-active');
    
    deleteLikes(cardId)
      .then((dataCard) => {
        cardLikeCount.textContent = dataCard.likes.length;
      })
  }
}

export { createCard }