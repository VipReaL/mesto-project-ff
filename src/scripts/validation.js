// Находим все формы в документе
function enableValidation (validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((form) => {
    setEventListeners(
      form,
      validationConfig.inputSelector,
      validationConfig.submitButtonSelector,
      validationConfig.inactiveButtonClass,
      validationConfig.inputErrorClass,
      validationConfig.errorClass);
  });
}

// Находим все input в форме
function setEventListeners (
  form,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
) {
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  const submitButton = form.querySelector(submitButtonSelector);
  toggleButtonState (inputList, submitButton, inactiveButtonClass);
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(form, input, inputErrorClass, errorClass);
      toggleButtonState (inputList, submitButton, inactiveButtonClass);
    });
  });
}

// Проверяем валидность поля
function isValid (form, input, inputErrorClass, errorClass) {

  if (input.validity.valueMissing) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else if (input.validity.typeMismatch) {
    input.setCustomValidity(input.dataset.errorUrl);
  } else if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorPattern);
  } else {
    input.setCustomValidity('');
  }

  if (!input.validity.valid) {
    showFormValidation(form, input, inputErrorClass, errorClass, input.validationMessage);
  } else {
    clearsFormValidations(form, input, inputErrorClass, errorClass);
  }
}

// Функция показывает ошибки валидации формы
function showFormValidation (form, input, inputErrorClass, errorClass, errorMessage) {
  const popupError = form.querySelector(`.${input.id}-error`);
  popupError.textContent = errorMessage;
  popupError.classList.add(inputErrorClass);
  input.classList.add(errorClass);
}

// Функция очищает ошибки валидации формы
function clearsFormValidations (form, input, inputErrorClass, errorClass) {
  const popupError = form.querySelector(`.${input.id}-error`);
  popupError.textContent = '';
  popupError.classList.remove(inputErrorClass);
  input.classList.remove(errorClass);
}

// Функция принимает массив полей и проверяет наличие невалидного поля
function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// Состояние кнопки «Отправить»
function toggleButtonState (inputList, submitButton, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    submitButton.disabled = true;
    submitButton.classList.add(inactiveButtonClass);
  } else {
    submitButton.disabled = false;
    submitButton.classList.remove(inactiveButtonClass)
  }
}

// Сброс ошибок валидации формы
function clearValidation (form, validationConfig) {
  const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  const submitButton = form.querySelector(validationConfig.submitButtonSelector);
  submitButton.classList.add(validationConfig.inactiveButtonClass);
  toggleButtonState (inputList, submitButton, validationConfig.inactiveButtonClass);
  inputList.forEach((input) => {
    clearsFormValidations(
      form,
      input,
      validationConfig.inputErrorClass,
      validationConfig.errorClass
    );
  });
}

export { enableValidation, clearValidation }