/*
в файле validation.js описаны функции для валидации форм. 
Из файла экспортируется только
функция активации валидации enableValidation и
функция очистки ошибок валидации clearValidation;

функция enableValidation принимает объект настроек, которые используются при валидации;
*/


// Валидация форм

// Находим все формы в документе
function enableValidation () {
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

// Находим все input в форме
function setEventListeners (formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.button')
  
  toggleButtonState (inputList, buttonElement);

  inputList.forEach((popupInput) => {
    popupInput.addEventListener('input', () => {
      isValid(formElement, popupInput);
      toggleButtonState (inputList, buttonElement);
    });
  });
}

// Проверяем валидность поля
function isValid (formElement, popupInput) {
  if (popupInput.validity.valueMissing) {
    popupInput.setCustomValidity(popupInput.dataset.errorMessage);
  } else if (popupInput.validity.typeMismatch) {
    popupInput.setCustomValidity(popupInput.dataset.errorUrl);
  } else {
    popupInput.setCustomValidity('');
  }

  if (!popupInput.validity.valid) {
    formValidation(formElement, popupInput, popupInput.validationMessage);
  } else {
    clearValidation(formElement, popupInput);
  }
}

function formValidation (formElement, popupInput, errorMessage) {
  const popupError = formElement.querySelector(`.${popupInput.id}-error`);

  popupInput.classList.add('popup__input__error'); // красное подчёркивание
  popupError.textContent = errorMessage; // Заменим содержимое span с ошибкой на переданный параметр
  popupError.classList.add('popup__error'); // Показываем сообщение об ошибке
}

function clearValidation (formElement, popupInput) {
  const popupError = formElement.querySelector(`.${popupInput.id}-error`);

  popupInput.classList.remove('popup__input__error'); // красное подчёркивание
  popupError.classList.remove('popup__error'); // Скрываем сообщение об ошибке
  popupError.textContent = ''; // Очистим ошибку
}

// Функция принимает массив полей и проверяет наличие невалидного поля
function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// Состояние кнопки «Отправить»
function toggleButtonState (inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__button-disabled');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__button-disabled')
  }
}

// export { enableValidation, clearValidation }