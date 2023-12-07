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

function closeByEscape (evt) {
  if (evt.key === 'Escape') {
    const popupIsOpened = document.querySelector('.popup_is-opened');
    closeModal(popupIsOpened);
  }
}

export { openModal, closeModal }