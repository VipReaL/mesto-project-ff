// DOM узлы
export const placesList = document.querySelector('.places__list');
export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');

// Удаление карточки
export const popupDelete = document.querySelector('.popup_type_delete');
export const popupButtonDelete = document.querySelector('.popup__button-delete');

// Модальное окно редактирования аватара профиля
export const imageContainer = document.querySelector('.profile__image-container');
export const profileImage = imageContainer.querySelector('.profile__image');
export const popupAvatar = document.querySelector('.popup_type_avatar');
export const avatarForm = document.forms['update-avatar'];
export const inputAvatar = avatarForm.elements['avatar'];
export const buttonAvatar = avatarForm.elements['button'];

// Модальное окно редактирования профиля
export const profileEditButton = document.querySelector('.profile__edit-button');
export const popupEdit = document.querySelector('.popup_type_edit');
export const editingProfileForm = popupEdit.querySelector('.popup__form');
export const buttonProfileForm = editingProfileForm.querySelector('.button');
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_description');

// Модальное окна добавление карточки "Нового места"
export const profileAddButton = document.querySelector('.profile__add-button');
export const popupNewCard = document.querySelector('.popup_type_new-card');
export const newPlace = document.forms['new-place'];
export const placeName = newPlace.elements['place-name'];
export const link = newPlace.elements['link'];
export const buttonNewPlace = newPlace.elements['button'];

// Модальное окно полноэкранного просмотра картинки карточки
export const popupImage = document.querySelector('.popup_type_image');
export const image = document.querySelector('.popup__image');
export const popupCaption = document.querySelector('.popup__caption');

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}