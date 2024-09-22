import Mousetrap from "mousetrap"
import ListManager from "./list-manager.js"

class WindowController {
  constructor() {
    this.listManager = new ListManager()
  }
}

export function addListOrItemListener(
  buttonId, inputId, listElementId, template
) {
  const button = document.getElementById(buttonId)
  const input = document.getElementById(inputId)
  const listElement = document.getElementById(listElementId)
  
  button.addEventListener("click", () => {
    if (input.value === '') input.value = 'Untitled'
    listElement.insertAdjacentHTML("afterbegin", template)
    input.value = ''

    const removeButton = listElement.querySelector("button.remove")
    removeButtonListener(removeButton)
  })
}

function removeButtonListener(buttonElement) {
  buttonElement.addEventListener("click", () => {
    buttonElement.parentElement.remove()
  })
}

function checkOffItem() {}


