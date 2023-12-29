import './pages/index.css';

import { createCard, deleteCard, likeCard } from './scripts/card.js';
import { openPopup, closePopup } from './scripts/modal.js';
import { enableValidation, clearValidation } from './scripts/validation.js';

import { 
  getUserInformation,
  getInitialCards,
  editingProfile,
  addNewCard,
  updatingUserAvatar
} from './scripts/api.js';

import {
  placesList,
  profileTitle,
  profileDescription,
  popupDelete,
  popupButtonDelete,
  imageContainer,
  profileImage,
  popupAvatar,
  avatarForm,
  inputAvatar,
  buttonAvatar,
  profileEditButton,
  popupEdit,
  editingProfileForm,
  buttonProfileForm,
  nameInput,
  jobInput,
  profileAddButton,
  popupNewCard,
  newPlace,
  placeName,
  link,
  buttonNewPlace,
  popupImage,
  image,
  popupCaption,
  validationConfig,
} from './scripts/variables.js'

// Включение валидации инпутов
enableValidation(validationConfig);

// функция отображения процесса загрузки
function loading (load, button) {
  if (load) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}

// Функция добавления карточек в разметку
function addCard (markupCard) {
  placesList.append(markupCard);
}

// Создание карточек
Promise.all([getInitialCards(), getUserInformation()])
  .then(([cards, information]) => {
    const userId = information._id;
    profileTitle.textContent = information.name;
    profileDescription.textContent = information.about;
    profileImage.src = information.avatar;
    cards.forEach(function (item) {
      const cardData = {
        link: item.link,
        name: item.name,
        userId: item.owner._id,
        cardId: item._id,
        likes: item.likes
      }
      addCard(createCard(cardData, openPopupImage, userId, checkingDeleteCard, likeCard));
    })
  })
  .catch((error) => {
    console.log(error);
  })

// Открытие модального окна редактирования аватара профиля
imageContainer.addEventListener('click', function () {
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
  openPopup(popupAvatar);
})

// Редактирования аватара профиля
avatarForm.addEventListener('submit', submitAvatarForm);

function submitAvatarForm(evt) {
  evt.preventDefault();
  loading(true, buttonAvatar);
  const urlAvatar = inputAvatar.value;
  updatingUserAvatar(urlAvatar)
    .then((data) => {
      profileImage.src = data.avatar;
      closePopup(popupAvatar);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      loading(false, buttonAvatar);
    })
}

// Открытие модального окна редактирования профиля
profileEditButton.addEventListener('click', function () {
  clearValidation(editingProfileForm, validationConfig);
  openPopup(popupEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

// Открытие модального окна добавление карточки "Нового места"
profileAddButton.addEventListener('click', function () {
  newPlace.reset();
  clearValidation(newPlace, validationConfig);
  openPopup(popupNewCard);
});

// Редактирование имени и информации о себе
editingProfileForm.addEventListener('submit', submitProfileForm);

function submitProfileForm(evt) {
  evt.preventDefault();
  loading(true, buttonProfileForm);
  editingProfile(nameInput.value, jobInput.value)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      closePopup(popupEdit);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      loading(false, buttonProfileForm);
    })
}

// Получение данных карточки от пользователя
newPlace.addEventListener('submit', addCardUser);

function addCardUser(evt) {
  evt.preventDefault();
  loading(true, buttonNewPlace);
  addNewCard(placeName.value, link.value)
    .then((data) => {
      const userId = data.owner._id;
      const cardData = {
        link: data.link,
        name: data.name,
        userId: data.owner._id,
        cardId: data._id,
        likes: data.likes
      }
      placesList.prepend(createCard(cardData, openPopupImage, userId, checkingDeleteCard, likeCard));
      closePopup(popupNewCard);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      loading(false, buttonNewPlace);
      newPlace.reset();
    })
}

// Открытие модального окна с картинкой
function openPopupImage (evt) {
  if (evt.target.classList.contains('card__image')) {
    openPopup(popupImage);
    image.src = evt.target.src;
    image.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt
  }
}

// Функция открытие модального окна подтверждения удаления карточки
function checkingDeleteCard (evt) {
  const card = evt.target.closest('.card');
  const cardId = card.dataset.idCard;
  
  popupDelete.dataset.idCard = cardId;
  openPopup(popupDelete);
}

// Удаление карточки
popupButtonDelete.addEventListener('click', deleteCard);