import ListManager from "./list-manager.js"

class UIManager {
  constructor(listManager) {
    this.listManager = listManager
    this.lists = document.getElementById("lists")
    this.listInput = document.getElementById("new-list-text")
    this.addListBtn = document.getElementById("add-list")
    this.items = document.getElementById("items")
    this.itemInput = document.getElementById("new-item-text")
    this.addItemBtn = document.getElementById("add-item")

    this.disableItemInput()
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
          <input type="checkbox" class="check" name="check">
          <p>${this.itemInput.value}</p>
        </label>
        <time datetime="">123</time>
        <button class="remove">X</button>
      </li>
      `
  }

  get listLength() {
    return this.listManager.lists.length
  }

  #insertHTMLBeforeEnd(template, parent) {
    parent.insertAdjacentHTML("beforeend", template)
  }

  removeListBtnListener(li, id) {
    const removeBtn = li.querySelector("button.remove")
    removeBtn.addEventListener("click", () => {
      if (li.querySelector("p.selected") !== null) {
        this.items.innerHTML = ''
      }
      li.remove()
      this.listManager.removeList(id)
      if (this.listManager.lists.length === 0) {
        this.disableItemInput()
      }
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
    this.addItemBtn.addEventListener("click", () => {
      this.listManager.addItemToList(listId, this.itemInput.value)
      this.#insertHTMLBeforeEnd(this.itemTemplate, this.items)
      this.itemInput.value = ''
      const li = this.items.lastElementChild
      this.removeItemBtnListener(li, listId)
    })
  }

  displayItems(listId) {
    this.items.innerHTML = ''
    const list = this.listManager.lists[this.listManager.getListIndex(listId)]
    list.items.forEach(item => {
      this.itemInput.value = item.toDo
      this.#insertHTMLBeforeEnd(this.itemTemplate, this.items)
      this.itemInput.value = ''
      const li = this.items.lastElementChild
      this.removeItemBtnListener(li, listId)
    })
    this.itemInput.value = ''
  }

  highlightSelected(ele) {
    this.lists.querySelectorAll('li > p').forEach(p => {
      p.classList.remove('selected')
    })
    ele.classList.add('selected')
  }

  disableItemInput() {
    if (this.listLength === 0) {
      this.itemInput.setAttribute('disabled', '')
    }
  }
  
  enableItemInput() {
    this.itemInput.removeAttribute('disabled')
  }

  listListener(ele, listId) {
    ele.addEventListener("click", () => {
      this.displayItems(listId)
      this.removeAllClickListeners(this.addItemBtn)
      this.addItemBtnListener(listId)
      this.highlightSelected(ele)
    })
  }

  addListBtnListener() {
    this.addListBtn.addEventListener("click", () => {
      this.#insertHTMLBeforeEnd(this.listTemplate, this.lists)
      this.listManager.createList(this.listInput.value)
      const list = this.listManager.lists[this.listManager.lists.length - 1]
      this.listInput.value = ''
      const li = this.lists.lastElementChild
      this.removeListBtnListener(li, list.id)
      this.displayItems(list.id)
      this.removeAllClickListeners(this.addItemBtn)
      this.addItemBtnListener(list.id)
      
      const listNameEle = this.lists.lastElementChild.querySelector("p")
      this.listListener(listNameEle, list.id)
      this.highlightSelected(listNameEle)
      this.enableItemInput()
    })
  }

  loadStorage() {
    if (this.listManager.lists.length === 0) return
    const storedLists = this.listManager.lists
    storedLists.forEach(list => {
      this.listInput.value = list.name
      this.#insertHTMLBeforeEnd(this.listTemplate, this.lists)
      this.listInput.value = ''
      const li = this.lists.lastElementChild
      this.removeListBtnListener(li, list.id)
      this.displayItems(list.id)
      this.addItemBtnListener(list.id)
      const listNameEle = this.lists.lastElementChild.querySelector("p")
      this.listListener(listNameEle, list.id)
      this.highlightSelected(listNameEle)
    })
  }

  removeAllClickListeners(button) {
    const clone = button.cloneNode(true)
    button.parentNode.replaceChild(clone, button)
    this.addItemBtn = document.getElementById("add-item")
  }

}

export default function uiManager() {
  const listManager = new ListManager
  return new UIManager(listManager)
}