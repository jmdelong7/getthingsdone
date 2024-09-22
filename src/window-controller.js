import Mousetrap from "mousetrap"
import ListManager from "./list-manager.js"

class WindowController {
  constructor() {
    this.listManager = new ListManager()
  }
}

function addListOrItemListener(buttonId, inputId, listElementId) {
  const button = document.getElementById(buttonId)
  const input = document.getElementById(inputId)
  const listElement = document.getElementById(listElementId)
  button.addEventListener("click", () => {
    if (input.value === '') input.value = 'Untitled'
    listElement.insertAdjacentHTML("afterbegin", `<li>${input.value}</li>`)
    input.value = ''
  })
}

addListOrItemListener("add-list", "new-list-text", "lists")
addListOrItemListener("add-item", "new-item-text", "items")


function addListListener(buttonId, listManager, listName, listContainerId) {
  const addListButton = document.getElementById(buttonId)
  const listContainer = document.getElementById(listContainerId)
  document.createElement()
  const element = `<p class="list">${listName}</p>`
  addListButton.addEventListener("click", () => {
    listManager.createList(listName)
    listContainer.insertAdjacentHTML(element)
  })
}
