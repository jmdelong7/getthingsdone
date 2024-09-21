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

  getListIndex(listId) {
    return this.lists.findIndex(list => list.id === listId)
  }

  deleteList(listId) {
    const listIndex = this.getListIndex(listId)
    this.lists.splice(listIndex, 1)
    Storage.refreshStorage(...this.lists)
  }

  addItemToList(listId, toDo) {
    const listIndex = this.getListIndex(listId)
    this.lists[listIndex].addItem(toDo)
    Storage.refreshStorage(...this.lists)
  }

  removeItemFromList(listId, itemId) {
    const listIndex = this.getListIndex(listId)
    const list = this.lists[listIndex]
    list.removeItem(itemId)
    Storage.refreshStorage(...this.lists)
  }

  moveItemBetweenLists(listFromId, listToId, itemId) {
    const listFromIndex = this.getListIndex(listFromId)
    const listFrom = this.lists[listFromIndex]

    const itemIndex = listFrom.getItemIndex(itemId)
    const item = listFrom.items.slice(itemIndex, itemIndex + 1)[0]

    const listToIndex = this.getListIndex(listToId)
    const listTo = this.lists[listToIndex]
    listTo.items.push(item)
    this.removeItemFromList(listFromId, itemId)
  }

  editItemInList(listId, itemId, edit) {
    const listIndex = this.getListIndex(listId)
    const list = this.lists[listIndex]

    const itemIndex = list.getItemIndex(itemId)
    const item = list.items[itemIndex]
    item.toDo = edit
    Storage.refreshStorage(...this.lists)
  }
  
  changeItemPositionInList(listId, itemId, position) {
    const listIndex = this.getListIndex(listId)
    const list = this.lists[listIndex]

    const itemIndex = list.getItemIndex(itemId)
    const item = list.items[itemIndex]

    list.items.splice(position, 0, item)
    list.items.splice(itemIndex, 1)
    Storage.refreshStorage(...this.lists)
  }

}
