class SafeLocalStorage {
  constructor(storage) {
    this.storage = storage
    this.available = this.storageAvailable(storage)
  }
  
  storageAvailable() {
    let storage;
    try {
      storage = window[this.storage];
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

  performIfAvailable(action) {
    return this.available ? action() : null
  }

  setLocalStorageItem(key, item) {
    return this.performIfAvailable(() => {
      const itemJson = JSON.stringify(item)
      this.storage.setItem(key, item)
    })
  }

  removeLocalStorageItem(key) {
    return this.performIfAvailable(() => {
      this.storage.removeItem(key)
    })
  }

  clearStorage() {
    return this.performIfAvailable(() => {
      this.storage.clear()
    })
  }

}

