function saveToStorage(key, value) {
    var item = JSON.stringify(value);
    localStorage.setItem(key, item);
}

function loadFromStorage(key) {
    var item = localStorage.getItem(key)
    var value = JSON.parse(item);
    return value;
}