export default class Item {
  constructor(toDo = null) {
    this.toDo = toDo
    this.date = new Date
    this.id = crypto.randomUUID()
  }

  editToDo(edit) {
    this.toDo = edit
  }
}