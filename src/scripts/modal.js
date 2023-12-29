// функция открытия модальных окон
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEscape);
}

// функция закрытия модальных окон
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEscape);
}

// Закрытие модальных окон клавишей Esc
function closeByEscape (evt) {
  if (evt.key === 'Escape') {
    const popupIsOpened = document.querySelector('.popup_is-opened');
    closePopup(popupIsOpened);
  }
}

// Закрытие модальных окон
const popups = document.querySelectorAll('.popup');
popups.forEach(function (popup) {
  popup.addEventListener('mousedown', function (evt) {

    // Закрытие модальных окон крестиком
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }

    // Закрытие модальных окон оверлеем
    if (evt.target.classList.contains('popup_is-opened')) {
      closePopup(popup);
    }

  });
});

export { openPopup, closePopup }