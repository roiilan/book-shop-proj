const KEY = 'books'
const bookS_IN_PAGE = 3;

var gId = 1000;
var gCurrPage = 1;
var gFilterBy = 'All';

var gbooks = _createbooks();



function getbooksForDisplay() {
    var from = (gCurrPage - 1) * bookS_IN_PAGE;
    var to = from + bookS_IN_PAGE;
    return gbooks.slice(from, to);
}

function getbookCount() {
    return gbooks.length
}

function removebook(bookId) {
    var idx = gbooks.findIndex(function (book) {
        return book.id === bookId
    })
    gbooks.splice(idx, 1);
    saveToStorage(KEY, gbooks);
}

function getbook(bookId) {
    return gbooks.find(book => book.id === bookId)  
}


function addbook(name, price) {
    var book = _createbook(name, price);
    gbooks.unshift(book);
    saveToStorage(KEY, gbooks);
}

function updatebook(book) {
    console.log('update');    
    var idx = gbooks.findIndex(currbook => currbook.id === book.id)
    gbooks[idx] = book;    
    saveToStorage(KEY, gbooks);
}

function changePage(diff) {
    gCurrPage += diff;
    var lastPage = Math.ceil(gbooks.length / bookS_IN_PAGE);

    if (gCurrPage > lastPage) gCurrPage = 1;
    else if (gCurrPage < 1) gCurrPage = lastPage;
}

function changeRate(diff,bookId) {
    var book = getbook(bookId);
    if(book.rate+diff===-1||book.rate+diff===11)return;
    book.rate+=diff;
    updatebook(book);
}


// Private functions:
function _createbooks() {
    var books = loadFromStorage(KEY);
    if (books) return books;

    var books = ['hary poter 1', 'hobbit', 'gogo', 'lolo', 'hary poter 2', 'hary poter 3', 'hary poter 4', 'hary poter 5', 'hary poter 6', 'hary poter 7']
        .map(_createbook)

    return books;
}

function _createbook(name, price) {
    return {
        id: gId++,
        name: name,
        price: price,    
        imgUrl: 'https://pngimage.net/wp-content/uploads/2018/06/harry-potter-book-png-3.png',
        rate: 0
    }
}
