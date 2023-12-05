/*
Функции для работы с карточками проекта Mesto вынесите в файл card.js,
из него должна экспортироваться функция createCard,
которую вы создали раньше (у вас она может называться по-другому).

Функции, обрабатывающие события лайка и удаления карточки,
также должны находиться в этом файле и экспортироваться из него.

в файле card.js описаны функции для работы с карточками:
функция создания карточки,
функции-обработчики событий удаления и лайка карточки;
*/


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

// const popupImage = document.querySelector('.popup__image');
// const popupCaption = document.querySelector('.popup__caption');

// function openImage (evt) {
//   if (evt.target.classList.contains('card__image')) {
//     openModal(popupTypeImage);
//     popupImage.src = 'item.link';
//     popupCaption.textContent = 'fkfgftdcr';
//     getPressKey();
//     getClickOverlay();
//     }
// }

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