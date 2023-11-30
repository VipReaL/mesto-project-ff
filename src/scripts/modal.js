/*
Работу модальных окон — в файл modal.js.
Оттуда экспортируйте функции openModal и closeModal,
принимающие в качестве аргумента DOM-элемент модального окна, с которым нужно произвести действие.

функция открытия модального окна,
функция закрытия модального окна,
функция-обработчик события нажатия Esc,
функция-обработчик события клика по оверлею;
*/


// функция открытия модальных окон
function openPopup (evt) {
  evt.classList.add('popup_is-opened');
}

// функция закрытия модальных окон
function closePopup (evt) {
  evt.classList.remove('popup_is-opened');
}

export { openPopup, closePopup }