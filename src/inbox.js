export default class Inbox {
  constructor() {
    this.items = []
  }

  addItem(toDo) {
    const date = creationDate()
    const itemId = generateId()
    this.items.push({toDo, date, itemId})
  }

  getItemId(item) {
    return item.itemId
  }

  removeItem(itemId) {
    this.items = this.items.filter(i => i.itemId !== itemId)
  }

  editItemToDo(itemId, modification) {
    const index = this.items.findIndex(i => i.itemId === itemId)
    this.items[index].toDo = modification
  }

  moveItemToOtherList(item, list) {
    list.addItem(item)
    this.removeItem(item)
  }

}

function creationDate() {
  return new Date()
}

function generateId() {
  return crypto.randomUUID()
}