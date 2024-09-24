import ListManager from "./list-manager.js"

export class UIManager {
  constructor(listManager) {
    this.listManager = listManager
    this.lists = document.getElementById("lists")
    this.listInput = document.getElementById("new-list-text")
    this.items = document.getElementById("items")
    this.itemInput = document.getElementById("new-item-text")

    this.addListItemBtnListener("add-list", this.addList.bind(this))
    this.addListItemBtnListener("add-item", this.addItem.bind(this))
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
          <input type="checkbox">
          <p>${this.itemInput.value}</p>
        </label>
        <time datetime=""></time>
        <button class="remove">X</button>
      </li>
      `
  }

  addListItemBtnListener(btnId, addType) {
    const btn = document.getElementById(btnId)
    btn.addEventListener("click", () => {
      addType()
    })
  }

  addRemoveBtnListener(ul) {
    const removeBtn = ul.lastElementChild.querySelector("button.remove")
    removeBtn.addEventListener("click", () => {
      removeBtn.parentElement.remove()
    })
  }

  addList() {
    this.#insertHTMLBeforeEnd(this.listInput, this.listTemplate, this.lists)
    this.addRemoveBtnListener(this.lists)
  }

  addItem() {
    this.#insertHTMLBeforeEnd(this.itemInput, this.itemTemplate, this.items)
    this.addRemoveBtnListener(this.items)
  }

  #insertHTMLBeforeEnd(input, template, parent) {
    parent.insertAdjacentHTML("beforeend", template)
    input.value = ''
  }

}

export function uiManager() {
  const listManager = new ListManager
  return new UIManager(listManager)
}