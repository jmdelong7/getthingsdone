import ListManager from "./list-manager.js"
import { format } from 'date-fns'

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
        <button class="remove">x</button>
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
        <time></time>
        <button class="remove">x</button>
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
      this.selectNextList()
      this.addListWarning()
    })
  }

  removeItemBtnListener(li, listId, itemId) {
    const removeBtn = li.querySelector("button.remove")
    removeBtn.addEventListener("click", () => {
      li.remove()
      this.listManager.removeItemFromList(listId, itemId)
    })
  }
  
  highlightSelected(ele) {
    this.lists.querySelectorAll('li > p').forEach(p => {
      p.classList.remove('selected')
    })
    ele.classList.add('selected')
    
    this.lists.querySelectorAll('li').forEach(li => {
      li.classList.remove('parent-selected')
    })
    ele.parentNode.classList.add('parent-selected')
  }
  
  disableItemInput() {
    if (this.listLength === 0) {
      this.itemInput.setAttribute('disabled', '')
      this.addItemBtn.setAttribute('disabled', '')
    }
  }
  
  enableItemInput() {
    this.itemInput.removeAttribute('disabled')
    this.addItemBtn.removeAttribute('disabled')
  }

  addListWarning() {
    if (this.listManager.lists.length === 0){
      this.itemInput.classList.add("warning")
    } else {
      this.itemInput.classList.remove("warning")
    }
  }
  
  listListener(ele, listId) {
    ele.addEventListener("click", () => {
      this.displayItems(listId)
      this.removeAllListeners(this.addItemBtn)
      this.removeAllListeners(this.itemInput)
      this.addItemBtnListener(listId)
      this.highlightSelected(ele, listId)
      this.listManager.toggleListSelected(listId)
    })
  }
  
  displayItems(listId) {
    this.items.innerHTML = ''
    const list = this.listManager.lists[this.listManager.getListIndex(listId)]
    list.items.forEach(item => {
      this.itemInput.value = item.toDo
      this.#insertHTMLBeforeEnd(this.itemTemplate, this.items)
      this.itemInput.value = ''

      const date = item.date
      const time = this.items.lastElementChild.querySelector("time")
      this.addTime(time, date)  

      const li = this.items.lastElementChild
      this.removeItemBtnListener(li, listId)
    })
    this.itemInput.value = ''
  }

  addTime(element, date) {
    element.setAttribute("datetime", date)
    element.textContent = format(date, "PP | p")
  }
  
  addItem(listId) {
    this.listManager.addItemToList(listId, this.itemInput.value)
    this.#insertHTMLBeforeEnd(this.itemTemplate, this.items)
    this.itemInput.value = ''
    
    const listIdx = this.listManager.getListIndex(listId)
    const list = this.listManager.lists[listIdx]
    const item = list.items[list.items.length - 1]
    const date = item.date
    const time = this.items.lastElementChild.querySelector("time")
    this.addTime(time, date)

    const li = this.items.lastElementChild
    this.removeItemBtnListener(li, listId)
  }

  addItemBtnListener(listId) {
    this.addItemBtn.addEventListener("click", () => {
      this.addItem(listId)
    })

    this.itemInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.addItem(listId)
      }
    })
  } 

  selectNextList() {
    const listLength = this.listManager.lists.length
    if (listLength === 0) return
    const newList = this.listManager.lists[listLength - 1]

    const listNameEle = this.lists.lastElementChild.querySelector("p")
    this.displayItems(newList.id)
    this.removeAllListeners(this.addItemBtn)
    this.removeAllListeners(this.itemInput)
    this.addItemBtnListener(newList.id)
    this.highlightSelected(listNameEle, newList.id)
    this.listManager.toggleListSelected(newList.id)
  }

  addList() {
    this.#insertHTMLBeforeEnd(this.listTemplate, this.lists)
    this.listManager.createList(this.listInput.value, false)
    const list = this.listManager.lists[this.listManager.lists.length - 1]
    this.listInput.value = ''
    const li = this.lists.lastElementChild
    this.removeListBtnListener(li, list.id)
    this.displayItems(list.id)
    this.removeAllListeners(this.addItemBtn)
    this.removeAllListeners(this.itemInput)
    this.addItemBtnListener(list.id)
    
    const listNameEle = this.lists.lastElementChild.querySelector("p")
    this.listListener(listNameEle, list.id)
    this.highlightSelected(listNameEle)
    this.enableItemInput()
    this.listManager.toggleListSelected(list.id)
    this.addListWarning()
  }

  addListBtnListener() {
    this.addListWarning()
    this.addListBtn.addEventListener("click", this.addList.bind(this))
    this.listInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.addList()
      }
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
      if (list.selected === true) this.highlightSelected(listNameEle)
      this.listListener(listNameEle, list.id)
    })

    const lastSelected = storedLists.filter(list => list.selected === true)[0]
    this.displayItems(lastSelected.id)
    this.removeAllListeners(this.addItemBtn)
    this.removeAllListeners(this.itemInput)
    this.addItemBtnListener(lastSelected.id)
  }

  removeAllListeners(element) {
    const clone = element.cloneNode(true)
    element.parentNode.replaceChild(clone, element)
    this.addItemBtn = document.getElementById("add-item")
    this.itemInput = document.getElementById("new-item-text")
  }
}

export default function uiManager() {
  const listManager = new ListManager
  return new UIManager(listManager)
}