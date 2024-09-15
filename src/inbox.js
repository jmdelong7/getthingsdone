export default class Inbox {
  constructor() {
    this.items = []
  }

  addItem(item, date = creationDate()) {
    this.items.push({item, date})
  }
}

function creationDate() {
  return Date.now()
}