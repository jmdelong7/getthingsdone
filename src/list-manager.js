import List from "./list.js"
import Storage from "./storage.js"

class listManager {
  constructor() {
    this.lists = Storage.loadLists()
  }

  createList() {
    const list = new List()
    this.lists[list.id] = list
  }
}
