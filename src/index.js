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
import {initialCards} from './scripts/cards.js'
import {createCard, deleteCard} from './scripts/card.js'

// @todo: DOM узлы

const placesList = document.querySelector('.places__list');

// @todo: Функция добавления карточки в разметку

function addCard (markupCard) {
  placesList.append(markupCard);
}

// @todo: Вывести карточки на страницу

initialCards.forEach(function (item) {
  addCard(createCard(item.link, item.name, deleteCard));
});

// @todo: Открытие и закрытие модального окна

/*
В проекте есть три модальных окна.
Они открываются по нажатию кнопок:
«Редактировать»,
«+»,
при нажатии на картинку,
а закрываются — при клике по крестику в правом верхнем углу:
*/

// Контеинер page__content для addEventListener (Кнопки открытия попапов)

const pageContent = document.querySelector('.page__content');

// display: flex

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');

function openPopup (evt) {
  if (evt.target.classList.value === 'profile__edit-button') {
    popupTypeEdit.setAttribute('style', 'display: flex');
  } else if (evt.target.classList.value === 'profile__add-button') {
    popupTypeNewCard.setAttribute('style', 'display: flex');
  } else if (evt.target.classList.value === 'card__image') {
    popupTypeImage.setAttribute('style', 'display: flex')
  }
}

pageContent.addEventListener('click', openPopup);

// Кнопки закрытия попапов

const ButtonsClosingPopups = document.querySelectorAll('.popup__close');

function closePopup (evt) {
  if (evt.target.closest('div').parentElement === 'profile__edit-button') {
    popupTypeEdit.removeAttribute('style');
  } else if (evt.target.closest('div').parentElement === 'profile__add-button') {
    popupTypeNewCard.removeAttribute('style');
  } else if (evt.target.closest('div').parentElement === 'card__image') {
    popupTypeImage.removeAttribute('style')
  }
}

pageContent.addEventListener('click', closePopup);