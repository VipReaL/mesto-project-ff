//Функция создания карточки
function createCard (imageSrc, nameValue, deleteHandler, likeButton, openImage) {
  const template = document.querySelector('#card-template').content;
  const templateElement = template.querySelector('.card').cloneNode(true);

  const image = templateElement.querySelector('.card__image');
  image.src = imageSrc;
  image.alt = nameValue;
  templateElement.querySelector('.card__title').textContent = nameValue;

  const deleteButton = templateElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteHandler);

  document.addEventListener('click', likeButton);

  document.addEventListener('click', openImage);

  return templateElement
}

// Функция удаления карточки
function deleteCard (event) {
  event.target.closest('.card').remove();
}

// Функция лайк карточки
function likeCard (evt) {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active')
  }
}

export { createCard, deleteCard, likeCard }