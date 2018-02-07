// class HelloWorld {
//   message = 'Hello World';
//   print = () => this.message;
// }
//
// const hello = new HelloWorld();
// // eslint-disable-next-line no-console
// console.log(
//   `%c ${hello.print()}`,
//   `color: green; font-size:48px; weight: bold`,
// );

const table = document.querySelector('.table');
const tbody = table.getElementsByTagName('tbody')[0];
let rows = tbody.getElementsByTagName('tr');
let pagesWrapper = document.querySelector('.page-nums');

/* Выводим по 10 записей на 1 страницу */
let displayPages = currentPage => {
  let fromPage,
    toPage,
    previousPageLink = document.querySelector('.previous_page');
  lastPage = pagesWrapper.getElementsByTagName('a').length;
  nextPageLink = document.querySelector('.next_page');

  if (currentPage === 1) {
    previousPageLink.classList.add('disabled-page-link');
    previousPageLink.setAttribute('disabled', '');
  } else {
    previousPageLink.classList.remove('disabled-page-link');
    previousPageLink.removeAttribute('disabled', '');
  }

  if (currentPage === lastPage) {
    nextPageLink.setAttribute('disabled', '');
    nextPageLink.classList.add('disabled-page-link');
  } else if (
    currentPage < lastPage &&
    nextPageLink.hasAttribute('disabled') &&
    nextPageLink.classList.contains('disabled-page-link')
  ) {
    nextPageLink.removeAttribute('disabled');
    nextPageLink.classList.remove('disabled-page-link');
  }

  /*вешаем класс active-page-link на страницы в пагинации*/
  let allPageLinks = pagesWrapper.querySelectorAll('a');
  for (let i = 0; i < allPageLinks.length; i++) {
    if (allPageLinks[i].classList.contains('active-page-link')) {
      allPageLinks[i].classList.remove('active-page-link');
    }
  }
  pagesWrapper
    .querySelectorAll('a')
    [currentPage - 1].classList.add('active-page-link');

  for (i = 0; i < rows.length; i++) {
    rows[i].style.display = 'none';
  }
  fromPage = currentPage * 10 - 9;
  toPage = currentPage * 10;
  for (let i = fromPage - 1; i < toPage; i++) {
    rows[i].style.display = '';
  }
};

/*Считаем, сколько страниц отображать под таблицей */

let makePages = () => {
  let quantityOfRows, pages, pageLink;

  quantityOfRows = tbody.getElementsByTagName('tr').length;
  pages = Math.ceil(quantityOfRows / 10);

  for (let i = 1; i <= pages; i++) {
    pageLink = document.createElement('a');
    pageLink.setAttribute('href', '#');
    pageLink.textContent = i;
    pageLink.addEventListener('click', displayPages.bind(null, i));
    pagesWrapper.appendChild(pageLink);
  }
};

let turnPreviousPage = () => {
  let currentPage = parseInt(
    pagesWrapper.querySelector('.active-page-link').textContent,
  );
  let previousPageLink = document.querySelector('.previous_page');

  if (currentPage > 1) {
    displayPages(currentPage - 1);
  } else if (currentPage === 1) {
    return;
  }
};

let turnNextPage = () => {
  let nextPageLink, currentPage, lastPage;

  nextPageLink = document.querySelector('.next_page');
  currentPage = parseInt(
    pagesWrapper.querySelector('.active-page-link').textContent,
  );
  lastPage = pagesWrapper.getElementsByTagName('a').length;

  if (currentPage < lastPage) {
    displayPages(currentPage + 1);
  } else {
    return;
  }
};

/*Инициализируем первую страницу таблицы */

let initTable = () => {
  makePages();
  displayPages(1);
};

document.addEventListener('DOMContentLoaded', initTable);
document.querySelector('.next_page').addEventListener('click', turnNextPage);
document
  .querySelector('.previous_page')
  .addEventListener('click', turnPreviousPage);
