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

if (!storageAvailable("localStorage")) {
  console.log("localStorage not available")
}

function storeItemInLocalStorage(item) {
  if (storageAvailable("localStorage")) {
    const itemJson = JSON.stringify(item)
    localStorage.setItem()
  } else return

}

