'use strict';

function onInit() {
    renderbooks();
    doTrans();
}

function renderbooks() {
    var books = getbooksForDisplay();
    var strHTMLs = books.map(function (book) {
        var className = (book.isDone) ? 'done' : ''; ///?
        return `        
    <tr>
        <td>${book.id}</td>
        <td>${book.name}</td>
        <td>${book.price} $</td>
        <td>
        <button data-trans="delete-btn" onclick="onRemovebook(event, ${book.id})"></button>
        <button title="Edit book" data-trans="update-btn" onclick="onEditbook(event, ${book.id})"></button>
        <button title="book Details" data-trans="read-btn" onclick="onShowbookDetails(event, ${book.id})"></button>
        </td>
      </tr> 
      `;
    })
    var elbookList = document.querySelector('.book-table');
    elbookList.innerHTML = strHTMLs.join('');
}

function onRemovebook(event, bookId) {
    event.stopPropagation();
    var isSure = confirm('Are you sure?');
    if (isSure) {
        removebook(bookId);
        renderbooks();
    }
}
function onEditbook(event, bookId) {

    var book = getbook(bookId);

    var elTxtprice = document.querySelector('.txt-price');
    elTxtprice.value = book.price;

    var elTxtname = document.querySelector('.txt-name');
    elTxtname.value = book.name;
    elTxtname.dataset.id = bookId;
    event.stopPropagation();
}

function onSavebook() {
    console.log('onSavebook');
    var elTxtname = document.querySelector('.txt-name');
    var elTxtprice = document.querySelector('.txt-price');
    var name = elTxtname.value;
    var price = elTxtprice.value;
    if (!name || !price) return;

    var bookId = +elTxtname.dataset.id;
    if (bookId) {
        var book = getbook(bookId);
        book.name = name;
        book.price = price;
        updatebook(book);
    } else {
        addbook(name, price);
    }

    elTxtname.value = '';
    elTxtname.dataset.id = '';
    elTxtprice.value = '';
    renderbooks();
    doTrans();
}

function onShowbookDetails(event, bookId) {
    var book = getbook(bookId);
    var elModal = document.querySelector('.modal');
    elModal.querySelector('h3').innerText = book.name;
    elModal.querySelector('.modal-price').innerText = `: ${book.price} $`;
    elModal.querySelector('.rate').innerHTML = `<button onclick="onChangeRate(-1,${bookId})">-</button>
     ${book.rate}       
    <button onclick="onChangeRate(1,${bookId})">+</button>`;
    elModal.querySelector('p').innerHTML = `<img src="${book.imgUrl}" alt="book picture" style="width:auto;">`;
    elModal.hidden = false;
}


function onCloseModal() {
    document.querySelector('.modal').hidden = true;
}

function onChangePage(diff) {
    changePage(diff);
    renderbooks();
    doTrans();
}

function onChangeRate(diff, bookId) {
    changeRate(diff, bookId);
    renderBookRate(bookId);
}

function renderBookRate(bookId) {
    var book = getbook(bookId);
    var elModal = document.querySelector('.modal');
    elModal.querySelector('.rate').innerHTML = `<button onclick="onChangeRate(-1,${bookId})">-</button>
     ${book.rate}       
    <button onclick="onChangeRate(1,${bookId})">+</button>`;
}


function onSetLang(lang) {
    setLang(lang);
    // TODO: if lang is hebrew add RTL class
    if (lang === 'he') {
        document.body.classList.add('rtl');
    } else {
        document.body.classList.remove('rtl');
    }
    doTrans();
    render();
}