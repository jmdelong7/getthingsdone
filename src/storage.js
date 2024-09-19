function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

function setLocalStorageItem(item) {
  if (storageAvailable("localStorage")) {
    const itemJson = JSON.stringify(item)
    localStorage.setItem(item.id, itemJson)
  } else return null
}

function removeLocalStorageItem(id) {
  if (storageAvailable("localStorage")) {
    localStorage.removeItem(id)
  } else return null
}

