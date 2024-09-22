import ListManager from "./list-manager.js"

export default class UIManager {
  constructor(listManager) {
    this.listManager = listManager
    this.lists = document.getElementById("lists")
    this.listInput = document.getElementById("new-list-text")
    this.items = document.getElementById("items")
    this.itemInput = document.getElementById("new-items-text")

    this.listTemplat = `
    <li>
      <p>${this.getValue(this.listInput)}</p>
      <button class="remove">X</button>
    </li>
  `

    this.itemTemplate = `
      <li> 
        <label>
          <input type="checkbox">
          <p>${this.getValue(this.itemInput)}</p>
        </label>
        <button class="remove">X</button>
      </li>
      `
  }

  get listTemplate() {
    return `<li>
      <p>${this.listInput.value}</p>
      <button class="remove">X</button>
    </li>`
  }

  get itemTemplate() {
    return `<li> 
        <label>
          <input type="checkbox">
          <p>${this.itemInput.value}</p>
        </label>
        <button class="remove">X</button>
      </li>`
  }

  get elementValue() {
    return this.element.value
  }

  insertHTMLBeforeEnd(input, template, parent) {
    if (input.value === '') input.value = "Untitled"
    const currentValue = this.getValue(input)
    parent.insertAdjacentHTML("beforeend", template(currentValue))
    input.value = ''
  } 

  addNewList() {
    if (this.listInput.value === '') this.listInput.value = "Untitled"
    const listTemplate = `
      <li>
        <p>${this.getValue(this.listInput)}</p>
        <button class="remove">X</button>
      </li>
    `
    this.lists.insertAdjacentHTML("beforeend", listTemplate)
    this.listInput.value = ''
  }

  addNewItem() {
    if (this.itemInput.value === '') this.itemInput.value = "Untitled"
    const itemTemplate = `
      <li> 
        <label>
          <input type="checkbox">
          <p>${this.getValue(this.itemInput)}</p>
        </label>
        <button class="remove">X</button>
      </li>
      `
    this.items.insertAdjacentHTML("beforeend", itemTemplate)
    this.itemInput.value = ''
  }
}