/*
В файле index.js должны остаться:
объявления и инициализация глобальных констант и переменных с DOM-элементами страницы,
обработчики событий (при открытии и закрытии попапов; при отправке форм; обработчик, открывающий попап при клике по изображению карточки);
вызовы других функций, подключённых из созданных модулей, которым нужно будет передавать объявленные здесь переменные и обработчики.

Код модулей должен быть написан так,
чтобы их можно быть забрать из проекта и перенести в другой без необходимости что-то менять внутри.
Подумайте, какие настройки для этого нужно передать аргументами.

Чтобы было чуточку понятнее:
вызов функции создания карточки должен находиться в файле index.js,
но само объявление функции — в card.js.

в файле index.js описана инициализация приложения и основная логика страницы:
поиск DOM-элементов на странице и навешивание на них обработчиков событий;
обработчики отправки форм,
функция-обработчик события открытия модального окна для редактирования профиля;
функция открытия модального окна изображения карточки.
Также в index.js находится код, который отвечает за отображение шести карточек при открытии страницы.
*/


import './pages/index.css';
import { initialCards } from './scripts/cards.js'
import { createCard, deleteCard, likeCard } from './scripts/card.js'
import { openModal, closeModal, getPressKey, getClickOverlay } from './scripts/modal.js'


// DOM узлы
const placesList = document.querySelector('.places__list');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Модальное окно редактирования профиля
const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const formElement = document.querySelector('.popup__form');
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

// Закрытие модального окна
const pageContent = document.querySelector('.page__content');



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
  openModal(popupTypeEdit);
  getPressKey();
  getClickOverlay();
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

// Открытие модального окна добавление карточки "Нового места"
profileAddButton.addEventListener('click', function () {
  openModal(popupTypeNewCard);
  getPressKey();
  getClickOverlay();
});

// Закрытие модальных окон крестиком
pageContent.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('popup__close')) {
    closeModal(evt.target.closest('.popup'));
  }
});

// Редактирование имени и информации о себе
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
}

formElement.addEventListener('submit', handleFormSubmit);

// Получение данных карточки от пользователя
function addCardUser(evt) {
  evt.preventDefault();
  placesList.prepend(createCard(link.value, placeName.value, deleteCard, likeCard));
  newPlace.reset();
  closeModal(evt.target.closest('.popup'));
}

newPlace.addEventListener('submit', addCardUser);

// Открытие модального окна с картинкой
function openPopupImage (evt) {
  if (evt.target.classList.contains('card__image')) {
    openModal(popupTypeImage);
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt
    getPressKey();
    getClickOverlay();
  }
};