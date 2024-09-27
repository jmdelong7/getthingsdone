import Item from "./item.js"

export default class List {
  constructor(name=null, items=[], id="list-"+crypto.randomUUID()) {
    this.name = name
    this.items = items
    this.id = id
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

  changeItemPosition(id, position) {
    const index = this.getItemIndex(id)
    this.items.splice(position, 0, this.items[index])
  }
}