export default class SafeLocalStorage {
  constructor(storageType = "localStorage") {
    this.storage = window[storageType]
    this.available = this.storageAvailable()
  }
  
  storageAvailable() {
    try {
      const x = "__storage_test__";
      this.storage.setItem(x, x);
      this.storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        e.name === "QuotaExceededError" &&
        // acknowledge QuotaExceededError only if there's something already stored
        this.storage &&
        this.storage.length !== 0
      );
    }
  }

  performIfAvailable(action) {
    return this.available ? action() : null
  }

  setStorageItem(key, item) {
    return this.performIfAvailable(() => {
      const itemJson = JSON.stringify(item)
      this.storage.setItem(key, itemJson)
    })
  }

  getStorageItem(key) {
    return this.performIfAvailable(() => {
      return this.storage.getItem(key)
    })
  }

  removeStorageItem(key) {
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

