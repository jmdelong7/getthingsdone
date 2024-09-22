import Storage from "./storage.js"
import List from "./list.js"
import ListManager from "./list-manager.js"
import UIManager from "./ui-manager.js"
import { addListOrItemListener } from "./window-controller.js"
import "./main.css"

window.List = List
window.Storage = Storage
window.ListManager = ListManager
window.UIManager = UIManager

// addListOrItemListener("add-list", "new-list-text", listTemplate)
// addListOrItemListener("add-item", "new-item-text", itemTemplate)
