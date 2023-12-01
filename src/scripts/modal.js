/*
Работу модальных окон — в файл modal.js.
Оттуда экспортируйте функции openModal и closeModal,
принимающие в качестве аргумента DOM-элемент модального окна,
с которым нужно произвести действие.

функция открытия модального окна,
функция закрытия модального окна,
функция-обработчик события нажатия Esc,
функция-обработчик события клика по оверлею;
*/


// функция открытия модальных окон
function openModal(evt) {
  evt.classList.add('popup_is-opened');
}

// функция закрытия модальных окон
function closeModal(evt) {
  evt.classList.remove('popup_is-opened');
}

// Функция отслеживания нажатия клавишей Esc
function getPressKey() {
  const popupAll = document.querySelectorAll('.popup');
  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      popupAll.forEach((classItem) => {
        if (classItem.classList.contains('popup_is-opened')) {
          closeModal(classItem);
        }
      });
    }
  });
}

// Функция закрытие модальных окон оверлеем
function getClickOverlay() {
  document.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup_is-opened')) {
      closeModal(evt.target);
    }
  });
}

export { openModal, closeModal, getPressKey, getClickOverlay }