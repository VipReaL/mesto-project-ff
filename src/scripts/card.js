import { displayingLikes, deleteLikes, userDeleteCard } from './api.js';
import { closePopup } from './modal.js';
import { popupDelete } from './variables.js';

// Функция создания карточки
function createCard (cardData, openImage, userId, checkingDeleteCard, likeCard) {
  const template = document.querySelector('#card-template').content;
  const templateElement = template.querySelector('.card').cloneNode(true);

  templateElement.dataset.idCard = cardData.cardId;
  templateElement.querySelector('.card__title').textContent = cardData.name;

  const image = templateElement.querySelector('.card__image');
  image.src = cardData.link;
  image.alt = cardData.name;
  image.addEventListener('mousedown', openImage);

  const deleteButton = templateElement.querySelector('.card__delete-button');
  if (userId === cardData.userId) {
    deleteButton.addEventListener('click', checkingDeleteCard);
  } else {
    deleteButton.classList.add('card__delete-button_disabled')
  }

  const cardLikeButton = templateElement.querySelector('.card__like-button');
  cardLikeButton.addEventListener('mousedown', likeCard);

  const cardLikeCount = templateElement.querySelector('.card__like-count');
  cardLikeCount.textContent = cardData.likes.length;
  
  cardData.likes.forEach((item) => {
    if (userId === item._id) {
      cardLikeButton.classList.add('card__like-button_is-active');
    }
  })

  return templateElement
}

// Функция удаление карточки
function deleteCard (evt) {
  const cardId = popupDelete.dataset.idCard;
  const card = document.querySelector(`[data-id-card="${cardId}"]`);
  userDeleteCard(cardId)
    .then(() => {
      card.remove();
      closePopup(popupDelete);
    })
    .catch((error) => {
      console.log(error);
    })
}

// Функция лайк карточки
function likeCard (evt) {
  const card = evt.target.closest('.card');
  const cardId = card.dataset.idCard;
  const cardLikeCount = card.querySelector('.card__like-count');

  if (!evt.target.classList.contains('card__like-button_is-active')) {
    displayingLikes(cardId)
    .then((dataCard) => {
      cardLikeCount.textContent = dataCard.likes.length;
      evt.target.classList.add('card__like-button_is-active');
    })
    .catch((error) => {
      console.log(error);
    })
  } else {
    deleteLikes(cardId)
    .then((dataCard) => {
      cardLikeCount.textContent = dataCard.likes.length;
      evt.target.classList.remove('card__like-button_is-active');
    })
    .catch((error) => {
      console.log(error);
    })
  }
}

export { createCard, deleteCard, likeCard }