import './pages/index.css';
import { initialCards } from './scripts/cards.js'
import { createCard, deleteCard, likeCard } from './scripts/card.js'
import { openModal, closeModal } from './scripts/modal.js'
import { enableValidation, clearValidation } from './scripts/validation.js'


// DOM узлы
const placesList = document.querySelector('.places__list');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Модальное окно редактирования профиля
const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const formElement = popupTypeEdit.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

// Модальное окна добавление карточки "Нового места"
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const newPlace = document.forms['new-place'];
const placeName = newPlace.elements['place-name'];
const link = newPlace.elements['link'];

// Модальное окно полноэкранного просмотра картинки карточки
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

enableValidation(validationConfig);

// Функция добавления карточки в разметку
function addCard (markupCard) {
  placesList.append(markupCard);
}

// Вывод карточек на страницу
initialCards.forEach(function (item) {
  addCard(createCard(item.link, item.name, deleteCard, likeCard, openPopupImage));
});

// Открытие модального окна редактирования профиля
profileEditButton.addEventListener('click', function () {
  clearValidation(formElement, validationConfig);
  openModal(popupTypeEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

// Открытие модального окна добавление карточки "Нового места"
profileAddButton.addEventListener('click', function () {
  newPlace.reset();
  clearValidation(newPlace, validationConfig);
  openModal(popupTypeNewCard);
});

// Редактирование имени и информации о себе
formElement.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(evt.target.closest('.popup'));
}

// Получение данных карточки от пользователя
newPlace.addEventListener('submit', addCardUser);

function addCardUser(evt) {
  evt.preventDefault();
  placesList.prepend(createCard(link.value, placeName.value, deleteCard, likeCard, openPopupImage));
  newPlace.reset();
  closeModal(evt.target.closest('.popup'));
}

// Открытие модального окна с картинкой
function openPopupImage (evt) {
  if (evt.target.classList.contains('card__image')) {
    openModal(popupTypeImage);
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt
  }
}