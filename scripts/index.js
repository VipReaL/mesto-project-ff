/*
*Вам нужно написать функцию,
*которая принимает в аргументах данные одной карточки и функцию-колбэк для удаления,
*а возвращает подготовленный к выводу элемент карточки.
*
*Для этого внутри функции вам понадобится:
*  - клонировать шаблон,
*  - установить значения вложенных элементов,
*  - добавить к иконке удаления обработчик клика, по которому будет вызван переданный в аргументах колбэк.
*
*Корректно реализовано создание карточки:
*  - создание карточки из шаблона, подстановка в неё данных и навешивание на неё обработчиков событий описано в отдельной функции;
*  - функция создания карточки принимает как параметры данные карточки и функцию, которая вызывается для обработки события удаления карточки;
*  - для создания карточки используется template, описанный в index.html;
*  - функция создания карточки возвращает DOM-элемент созданной карточки.
*/

// @todo: Темплейт карточки

// const card = document.querySelector('.card');
// const image = document.querySelector('.card__image');

// const cardDescription = document.querySelector('.card__description');
// const cardTitle = document.querySelector('.card__title');
// const likeButton = document.querySelector('.card__like-button');

// @todo: DOM узлы

let placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function addCard (imageSrc, imageAlt, nameValue) {

// находим template и сохраняем его свойиство .content в переменную.
const template = document.querySelector('#card-template').content;
// клонируем содержимое template.
const templateElement = template.querySelector('.card').cloneNode(true);

templateElement.querySelector('.card__image').src = imageSrc;
templateElement.querySelector('.card__image').alt = imageAlt;
templateElement.querySelector('.card__title').textContent = nameValue;

const deleteButton = templateElement.querySelector('.card__delete-button');
deleteButton.addEventListener('click', function () {
  let deleteCard = deleteButton.closest('.card');
  deleteCard.remove();
});

  placesList.append(templateElement);
};

// @todo: Функция удаления карточки



/*
Функцию удаления карточки нужно реализовать отдельно и передать в функцию создания карточки,
где она будет вызвана из обработчика клика по иконке.

Предположу, что тут вопрос гибкости кода играет роль.
Да, любая из функций может брать любые другие данные
и функции из глобального пространства вокруг себя,
но тогда мы создаем код, который зависит друг от друга.
В случае же, когда функция получает на вход все необходимые данные,
делает внутри себя определенные вещи и отдает готовый результат - более правильная логика.
Ведь тогда мы спокойно можем перенести такие функции и отвязать их от "глобального пространства".

Если "Если удалить параметр и аргумент при вызове, то все продолжит работать."
это говорит только о том, что внутри функции создания карточки ты тем
или иным способо взаимодействуешь с внешней средой, а должен опираться на полученные параметры

*/

// @todo: Вывести карточки на страницу

for (let i = 0; i < initialCards.length; i = i + 1) {
  addCard(initialCards[i].link, initialCards[i].name, initialCards[i].name)
};

/*
*Используя полученную функцию,
*выведите все карточки из массива на страницу в элемент .places__list.
*
*Добавления карточек на страницу выполняется перебором массива с данными карточек с помощью цикла.
*/

// добавляем элемент списка в конец списка
// list.append(listItem1, listItem2, listItem3);


//* const container = document.querySelector('.container');
//* const element = document.querySelector('.element');

//* const elementCopy = element.cloneNode(true);

//* container.append(elementCopy);