import Item from "./item.js"

export default class List {
  constructor(name) {
    this.name = name
    this.items = []
  }

  addItem(toDo) {
    const item = new Item(toDo)
    this.items.push(item)
  }

  getItemIndex(id) {
    return this.items.findIndex(item => item.id === id)
  }

  removeItem(id) {
    const index = this.getItemIndex(id)
    this.items.splice(index, 1)
  }

  moveItemToDifferentList(id, list) {
    const index = this.getItemIndex(id)
    list.push(this.items[index])
    this.removeItem(id)
  }

  changeItemPosition(id, position) {
    const index = this.getItemIndex(id)
    this.items.splice(position, 0, this.items[index])
  }
}