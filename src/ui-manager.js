import ListManager from "./list-manager.js"

export class UIManager {
  constructor(listManager) {
    this.listManager = listManager
    this.lists = document.getElementById("lists")
    this.listInput = document.getElementById("new-list-text")
    this.items = document.getElementById("items")
    this.itemInput = document.getElementById("new-item-text")
  }

  get listTemplate() {
    if (this.listInput.value === '') this.listInput.value = "Untitled"
    return `
      <li>
        <p>${this.listInput.value}</p>
        <button class="remove">X</button>
      </li>
      `
  }

  get itemTemplate() {
    if (this.itemInput.value === '') this.itemInput.value = "Untitled"
    return `
      <li>
        <label>
          <input type="checkbox" class="check">
          <p>${this.itemInput.value}</p>
        </label>
        <time datetime=""></time>
        <button class="remove">X</button>
      </li>
      `
  }

  #insertHTMLBeforeEnd(input, template, parent) {
    parent.insertAdjacentHTML("beforeend", template)
    input.value = ''
  }

  removeListBtnListener(li, id) {
    const removeBtn = li.querySelector("button.remove")
    removeBtn.addEventListener("click", () => {
      li.remove()
      this.listManager.removeList(id)
    })
  }

  removeItemBtnListener(li, listId, itemId) {
    const removeBtn = li.querySelector("button.remove")
    removeBtn.addEventListener("click", () => {
      li.remove()
      this.listManager.removeItemFromList(listId, itemId)
    })
  }

  addItemBtnListener(listId) {
    const addItemBtn = document.getElementById("add-item")
    addItemBtn.addEventListener("click", () => {
      this.#insertHTMLBeforeEnd(this.itemInput, this.itemTemplate, this.items)
      this.listManager.addItemToList(listId, this.itemInput)
      const li = this.items.lastElementChild
      this.removeItemBtnListener(li, listId)
    })
  }

  displayItems(listId) {
    this.items.innerHTML = ''
    const list = this.listManager.lists[this.listManager.getListIndex(listId)]
    list.items.forEach(item => {
      this.itemInput = item.toDo
      this.#insertHTMLBeforeEnd(this.itemInput, this.itemTemplate, this.items)
      const li = this.items.lastElementChild
      this.removeItemBtnListener(li, listId)
    })
    this.itemInput = ''
  }

  addListBtnListener() {
    const addListBtn = document.getElementById("add-list")
    addListBtn.addEventListener("click", () => {
      this.#insertHTMLBeforeEnd(this.listInput, this.listTemplate, this.lists)
      this.listManager.createList()
      const list = this.listManager.lists[this.listManager.lists.length - 1]
      const li = this.lists.lastElementChild
      this.removeListBtnListener(li, list.id)
      this.displayItems(list.id)
      this.addItemBtnListener(list.id)
    })
  }
}

export function uiManager() {
  const listManager = new ListManager
  return new UIManager(listManager)
}