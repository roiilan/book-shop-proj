'use strict';

function onInit() {
    renderbooks();
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
        <button onclick="onRemovebook(event, ${book.id})">delete</button>
        <button title="Edit book" onclick="onEditbook(event, ${book.id})">update</button>
        <button title="book Details" onclick="onShowbookDetails(event, ${book.id})">read</button>
        </td>
      </tr> 
      `;
        // `<li class="${className}">
        //     <h3>${book.name}</h3>
        //     <h4>price: ${book.price} $ </h4>
        //     <button onclick="onRemovebook(event, ${book.id})">x</button>
        //     <button title="Edit book" onclick="onEditbook(event, ${book.id})">✐</button>
        //     <button title="book Details" onclick="onShowbookDetails(event, ${book.id})">🔍</button>
        // </li>`
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
}

function onShowbookDetails(event, bookId) {
    // debugger;
    var book = getbook(bookId);
    var elModal = document.querySelector('.modal');
    // var elRate= document.querySelector('.rate');
    elModal.querySelector('h3').innerText = book.name;
    elModal.querySelector('h4').innerText = `price: ${book.price} $`;
    elModal.querySelector('.rate').innerHTML = `Rate: <button onclick="onChangeRate(-1,${bookId})">-</button>
     ${book.rate}       
    <button onclick="onChangeRate(1,${bookId})">+</button>`;
    elModal.querySelector('p').innerHTML = `<img src="${book.imgUrl}" alt="book picture" style="width:auto;">`;
    elModal.hidden = false;
}

function onCloseModal() {
    document.querySelector('.modal').hidden = true;
}

function onChangePage(diff) {
    changePage(diff)
    renderbooks();
}

function onChangeRate(diff, bookId) {
    console.log('onChange');
    changeRate(diff, bookId);
    renderBookRate(bookId);
}

function renderBookRate(bookId){
    var book = getbook(bookId);
    var elModal = document.querySelector('.modal');
    elModal.querySelector('.rate').innerHTML = `Rate: <button onclick="onChangeRate(-1,${bookId})">-</button>
     ${book.rate}       
    <button onclick="onChangeRate(1,${bookId})">+</button>`;
}