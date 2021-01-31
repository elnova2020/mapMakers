export const storageService = {
    store,
    load,
    clear
}

function store(key, value) {
    sessionStorage[key] = JSON.stringify(value);
}

function load(key, defaultValue = null) {
    let value = sessionStorage[key];
    if (!value) return defaultValue
    else return JSON.parse(value);
}


function clear() {
    sessionStorage.clear()
}

