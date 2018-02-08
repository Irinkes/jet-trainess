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
  let fromPage, toPage;
  let previousPageLink = document.querySelector('.previous_page');
  let lastPage = pagesWrapper.getElementsByTagName('a').length;
  let nextPageLink = document.querySelector('.next_page');

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

  for (let i = 0; i < rows.length; i++) {
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

  if (currentPage > 1) {
    displayPages(currentPage - 1);
  } else if (currentPage === 1) {
    return;
  }
};

let turnNextPage = () => {
  let currentPage = parseInt(
    pagesWrapper.querySelector('.active-page-link').textContent,
  );
  let lastPage = pagesWrapper.getElementsByTagName('a').length;
  if (currentPage < lastPage) {
    displayPages(currentPage + 1);
  } else {
    return;
  }
};
/*Сортируем таблицу*/
let sortTable = () => {
    let sortType, compareRows, cellindex, tableHeaderCell, allSortUpBtns, allSortDownBtns;
    let rowArray = [].slice.call(tbody.rows);
    console.log(rowArray);
    if(event.target.tagName==='TH') {
      sortType = event.target.getAttribute('data-type');
      cellindex = event.target.cellIndex;
      tableHeaderCell = event.target;
    }
    else if(event.target.className==='sort-arrow') {
        sortType = event.target.parentNode.getAttribute('data-type');
        cellindex = event.target.parentNode.cellIndex;
        tableHeaderCell = event.target.parentNode;
    }
    else if(event.target.className==='sort-arrow-up' || event.target.className==='sort-arrow-down'){
        sortType = event.target.parentNode.parentNode.getAttribute('data-type');
        cellindex = event.target.parentNode.parentNode.cellIndex;
        tableHeaderCell = event.target.parentNode.parentNode;
    }

    if(sortType==='abc') {
        compareRows = (rowA, rowB) => {
            return rowA.cells[cellindex].innerHTML.toLowerCase() > rowB.cells[cellindex].innerHTML.toLowerCase()? 1: -1;
        }
    }

    else if(sortType==='123') {
        compareRows = function (rowA, rowB) {
            return parseInt(rowA.cells[cellindex].innerHTML) - parseInt(rowB.cells[cellindex].innerHTML);
        }
    }

    else if(sortType==='date') {

        compareRows = function (rowA, rowB) {
            let dateA = new Date(rowA.cells[cellindex].innerHTML);

            let dateB = new Date(rowB.cells[cellindex].innerHTML);

            return dateB - dateA;
        }
    }

    else if(sortType==='salary') {
        compareRows = function (rowA, rowB) {
            let numA = rowA.cells[cellindex].innerHTML;
            numA = parseFloat(numA.replace(/[^\d\.]/, ''));
            let numB = rowB.cells[cellindex].innerHTML;
            numB = parseFloat(numB.replace(/[^\d\.]/, ''));
            return parseInt(numA - numB);
        }
    }




    let appendSortedRows = (rowArray) => {
        table.removeChild(tbody);
        for(i=0;i<rowArray.length;i++) {
            tbody.appendChild(rowArray[i]);
        }
        table.appendChild(tbody);
    }

    allSortDownBtns = table.querySelector('.sort-down');
    allSortUpBtns = table.querySelector('.sort-up');


    if(!(tableHeaderCell.classList.contains('sort-up'))) {
        rowArray = rowArray.sort(compareRows);
        appendSortedRows(rowArray);

        tableHeaderCell.classList.remove('sort-down');
        tableHeaderCell.classList.add('sort-up');
    }
    else {
        rowArray = rowArray.reverse();
        appendSortedRows(rowArray);

        tableHeaderCell.classList.remove('sort-up');
        tableHeaderCell.classList.add('sort-down');
    }

    if(allSortUpBtns){

        allSortUpBtns.classList.remove('sort-up'); /*убираем значок сортировки со всех столбиков*/
    }
    else if (allSortDownBtns) {

        allSortDownBtns.classList.remove('sort-down'); /*убираем значок сортировки со всех столбиков*/
    }


}

/*Фильтруем таблицу */
let filterTable = () => {
    let allData = table.getElementsByTagName('td');
    console.log(allData);
}

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
table.addEventListener('click', sortTable);
document.getElementById('search-btn').addEventListener('click', filterTable)
