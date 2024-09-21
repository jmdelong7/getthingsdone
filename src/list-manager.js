import List from "./list.js"
import Storage from "./storage.js"

export default class listManager {
  constructor() {
    this.lists = this.getStoredListData()
  }

  getStoredListData() {
    if (localStorage.length === 0) return []
    const listData = Storage.getListsFromStorage()
    const lists = listData.map(obj => {
      return new List(obj.items, obj.id, obj.name)
    })
    return lists
  }

  createList(name="") {
    const list = new List(undefined, undefined, name)
    this.lists.push(list)
    Storage.refreshStorage(...this.lists)
  }

  #getListIndex(id) {
    return this.lists.findIndex(list => list.id === id)
  }

  deleteList(id) {
    const index = this.#getListIndex(id)
    this.lists.splice(index, 1)
    Storage.refreshStorage(...this.lists)
  }

  addItemToList(id, toDo) {
    
  }

  //remove item
  //edit item
  //move item to different list
  //change item position


}
