import './pages/index.css';
import { createCard } from './scripts/card.js'
import { openModal, closeModal } from './scripts/modal.js'
import { enableValidation, clearValidation } from './scripts/validation.js'
import { getUserInformation, getInitialCards, EditingProfile, addNewCard } from './scripts/api.js'


// DOM узлы
const placesList = document.querySelector('.places__list');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Модальное окно редактирования аватара профиля
const profileImage = document.querySelector('.profile__image');
const popupTypeAvatar = document.querySelector('.popup_type_avatar');
const updateAvatar = document.forms['update-avatar'];

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

// Включение валидации инпутов
enableValidation(validationConfig);

// Функция добавления карточек в разметку
function addCard (markupCard) {
  placesList.append(markupCard);
}

export let userId;

// Создание карточек
Promise.all([getInitialCards(), getUserInformation(userId)])
  .then(([cards, information]) => {
    userId = information._id;
    profileTitle.textContent = information.name;
    profileDescription.textContent = information.about;
    cards.forEach(function (item) {
      addCard(createCard(item.link, item.name, item.owner._id, item._id, item.likes, openPopupImage));
    })
  })

// Открытие модального окна редактирования аватара профиля // FIXME:
profileImage.addEventListener('click', function () {
  updateAvatar.reset();
  clearValidation(updateAvatar, validationConfig);
  openModal(popupTypeAvatar);
})

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

  EditingProfile(nameInput.value, jobInput.value)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
    })

  closeModal(evt.target.closest('.popup'));
}

// Получение данных карточки от пользователя
newPlace.addEventListener('submit', addCardUser);

function addCardUser(evt) {
  evt.preventDefault();
  
  addNewCard(placeName.value, link.value)
    .then((data) => {
        console.log(data);
        placesList.prepend(createCard(data.link, data.name, data.owner._id, data._id, data.likes, openPopupImage));
      })
  
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