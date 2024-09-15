export default class Inbox {
  constructor() {
    this.items = []
  }

  addItem(item) {
    const date = creationDate()
    this.items.push({item, date})
  }

  removeItem(item) {
    this.items = this.items.filter(i => i.item !== item)
  }
}

function creationDate() {
  return new Date()
}