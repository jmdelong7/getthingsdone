export default class Item {
  constructor(toDo = null) {
    this.toDo = toDo
    this.date = new Date
    this.id = "item-" + crypto.randomUUID()
  }
}