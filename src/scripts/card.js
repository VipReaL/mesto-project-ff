import { displayingLikes, deleteLikes, userDeleteCard } from './api.js'
import { userId } from '../index.js'
import { openModal, closeModal } from './modal.js'

// Функция создания карточки
function createCard (imageSrc, nameValue, ownerId, cardId, likeCount, openImage) {
  const template = document.querySelector('#card-template').content;
  const templateElement = template.querySelector('.card').cloneNode(true);

  templateElement.dataset.idCard = cardId;
  templateElement.querySelector('.card__title').textContent = nameValue;

  const image = templateElement.querySelector('.card__image');
  image.src = imageSrc;
  image.alt = nameValue;
  image.addEventListener('mousedown', openImage);

  const deleteButton = templateElement.querySelector('.card__delete-button');
  if (userId === ownerId) {
    deleteButton.addEventListener('click', checkingDeleteCard);
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

// Функция открытие модального окна подтверждения удаления карточки
function checkingDeleteCard (evt) {
  const card = evt.target.closest('.card');
  const cardId = card.dataset.idCard;
  const popupTypeDelete = document.querySelector('.popup_type_delete');
  
  popupTypeDelete.dataset.idCard = cardId;
  openModal(popupTypeDelete);
}

// Функция удаления карточки
const popupButtonDelete = document.querySelector('.popup__button-delete')
popupButtonDelete.addEventListener('click', deleteCard);

function deleteCard (evt) {
  const popupTypeDelete = evt.target.closest('.popup_type_delete');
  const cardId = popupTypeDelete.dataset.idCard;
  const cardAll = document.querySelectorAll('.card');

  cardAll.forEach((card) => {
    if (card.dataset.idCard === cardId) {
      card.remove();
    }
  })
  userDeleteCard(cardId)
    .then(() => {
      closeModal(popupTypeDelete);
    })
    .catch((error) => {
      console.log(error);
    })
}

// Функция лайк карточки
function likeCard (evt) {
  const card = evt.target.closest('.card');
  const cardId = card.dataset.idCard;
  const cardLikeCount = evt.target.nextElementSibling;

  if (!evt.target.classList.contains('card__like-button_is-active')) {
    evt.target.classList.add('card__like-button_is-active');
    displayingLikes(cardId)
      .then((dataCard) => {
        cardLikeCount.textContent = dataCard.likes.length;
      })
      .catch((error) => {
        console.log(error);
      })
  } else {
    evt.target.classList.remove('card__like-button_is-active');
    deleteLikes(cardId)
      .then((dataCard) => {
        cardLikeCount.textContent = dataCard.likes.length;
      })
      .catch((error) => {
        console.log(error);
      })
  }
}

export { createCard }