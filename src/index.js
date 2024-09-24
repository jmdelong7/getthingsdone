import Storage from "./storage.js"
import List from "./list.js"
import ListManager from "./list-manager.js"
import { uiManager } from "./ui-manager.js"
import "./main.css"

window.List = List
window.Storage = Storage
window.ListManager = ListManager

uiManager()

// addListOrItemListener("add-list", "new-list-text", listTemplate)
// addListOrItemListener("add-item", "new-item-text", itemTemplate)
