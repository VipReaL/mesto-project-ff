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
import { createCard, deleteCard } from './scripts/card.js'
import { openPopup, closePopup } from './scripts/modal.js'


// DOM узлы
const placesList = document.querySelector('.places__list');

// Модальное окно редактирования профиля
const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');

// Модальное окна добавление карточки "Нового места"
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');

// Модальное окно полноэкранного просмотра картинки карточки
const popupTypeImage = document.querySelector('.popup_type_image');

// Закрытие модального окна
const pageContent = document.querySelector('.page__content');



// Функция добавления карточки в разметку
function addCard (markupCard) {
  placesList.append(markupCard);
}

// Вывод карточек на страницу
initialCards.forEach(function (item) {
  addCard(createCard(item.link, item.name, deleteCard));
});

// Открытие модального окна редактирования профиля
profileEditButton.addEventListener('click', function () {
  openPopup(popupTypeEdit);
});

// Открытие модального окна добавление карточки "Нового места"
profileAddButton.addEventListener('click', function () {
  openPopup(popupTypeNewCard);
});

// Открытие модального окна полноэкранного просмотра картинки карточки
placesList.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('card__image')) {
    openPopup(popupTypeImage);
  }
});

// Закрытие модальных окон
pageContent.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('popup__close')) {
    closePopup(evt.target.parentNode.parentNode);
  }
});