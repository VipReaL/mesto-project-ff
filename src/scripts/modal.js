// функция открытия модальных окон
function openModal(evt) {
  evt.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEscape);
}

// функция закрытия модальных окон
function closeModal(evt) {
  evt.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEscape);
}

// Закрытие модальных окон клавишей Esc
function closeByEscape (evt) {
  if (evt.key === 'Escape') {
    const popupIsOpened = document.querySelector('.popup_is-opened');
    closeModal(popupIsOpened);
  }
}

// Закрытие модальных окон
const popups = document.querySelectorAll('.popup');
popups.forEach(function (popup) {
  popup.addEventListener('mousedown', function (evt) {

    // Закрытие модальных окон крестиком
    if (evt.target.classList.contains('popup__close')) {
      closeModal(popup);
    }

    // Закрытие модальных окон оверлеем
    if (evt.target.classList.contains('popup_is-opened')) {
      closeModal(popup);
    }

  });
});

export { openModal, closeModal }