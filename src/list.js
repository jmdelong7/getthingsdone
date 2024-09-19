class List {
  constructor() {
    this.list = []
  }

  addItem(item) {
    this.list.push(item)
  }

  removeItem(id) {
    this.list.filter(item => item.id !== id)
  }

  getItemIndex(id) {
    return this.list.findIndex(item => item.id === id)
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