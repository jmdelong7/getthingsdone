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
      return new List(obj.name, obj.selected, obj.items, obj.id)
    })
    return lists
  }

  createList(name, selected) {
    const list = new List(name, selected, undefined, undefined)
    list.name = name
    list.selected = selected
    this.lists.push(list)
    Storage.refreshStorage(...this.lists)
  }

  getListIndex(listId) {
    return this.lists.findIndex(list => list.id === listId)
  }

  getListId(listIndex) {
    return this.lists[listIndex].id
  }

  removeList(listId) {
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
    list.items.splice(itemIndex + 1, 1)
    Storage.refreshStorage(...this.lists)
  }

  toggleListSelected(listId) {
    const listIndex = this.getListIndex(listId)
    const list = this.lists[listIndex]

    this.lists.forEach(li => {
      li.selected = false
    })
    list.selected = true
    Storage.refreshStorage(...this.lists)
  }
}
