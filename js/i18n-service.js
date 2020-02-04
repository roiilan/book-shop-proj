var gTrans = {
    title: {
        en: 'book store',
        he: 'חנות ספרים',
    },
    // subtitle: {
    //     en: 'MVC - Model-View-Controller',
    //     es: 'MVC - Modelo-Vista-Controlador',
    //     he: 'מודל - ויו - קונטרולר',
    // },
    'th-book-name': {
        en: 'Book Name',
        he: 'שם הספר',
    },
    'th-price': {
        en: 'Price',
        he: 'מחיר'
    },
    'th-actions': {
        en: 'Actions',
        he: 'פעולות',
    },
    'prev-page': {
        en: 'Prev Page',
        he: 'דף הקודם',
    },
    'next-page': {
        en: 'Next Page',
        he: 'דף הבא',
    },
    'th-id': {
        en: 'ID',        
        he: 'מספר סידורי'
    },
    'edit-book': {
        en: 'Edit Book',
        he: 'הוסף ספר'
    },
    'edit-book-name':{
        en: 'Book Name',
        he: 'שם הספר',
    },
    'edit-book-price':{
        en: 'Book Price',
        he: 'מחיר הספר',
    },
    'read-btn':{
        en: 'Read',
        he: 'הצג',
    },
    'update-btn':{
        en: 'Update',
        he: 'עדכן',
    },
    'delete-btn':{
        en: 'Delete',
        he: 'מחק',
    },
    'save-btn':{
        en: 'Save',
        he: 'שמור',
    },
    'price':{
        en: 'price',
        he: 'מחיר',
    },
    'book-details':{
        en: 'Book Details',
        he: 'פרטים נוספים',
    },
    'rate':{
        en: 'Rate ',
        he: 'דירוג ',
    }
}

var gCurrLang = 'en';

function doTrans() {
    // For each el get the data-trans and use getTrans to replace the innerText 
    var els = document.querySelectorAll('[data-trans]');
    els.forEach(el => {
        var txt = getTrans(el.dataset.trans);
        // If this is an input, translate the placeholder
        if (el.placeholder) el.placeholder = txt;
        else el.innerText = txt;
    })
}


function getTrans(transKey) {
    var langMap = gTrans[transKey]
    if (!langMap) return 'UNKNOWN';
    var txt = langMap[gCurrLang]
    // If translation not found - use english
    if (!txt) txt = langMap['en'];
    return txt;
}


function setLang(lang) {
    gCurrLang = lang;
}

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num);
}

function formatDate(time) {
    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    };
    return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}


function kmToMiles(km) {
    return km / 1.609;
}