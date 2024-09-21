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
  //remove list

  //add item
  //remove item
  //edit item
  //move item to different list
  //change item position


  createList(name="") {
    const list = new List(undefined, undefined, name)
    this.lists.push(list)
    Storage.refreshStorage(...this.lists)
  }
}
