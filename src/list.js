import Item from "./item.js"

class List {
  constructor() {
    this.list = []
  }

  addItem(toDo) {
    const item = new Item(toDo)
    this.list.push(item)
  }

  getItemIndex(id) {
    return this.list.findIndex(item => item.id === id)
  }

  removeItem(id) {
    const index = this.getItemIndex(id)
    this.list.splice(index, 1)
  }

  moveItemToDifferentList(id, list) {
    const index = this.getItemIndex(id)
    list.push(this.list[index])
    this.removeItem(id)
  }

  changeItemPosition(id, position) {
    const index = this.getItemIndex(id)
    this.list.splice(position, 0, this.list[index])
  }
}