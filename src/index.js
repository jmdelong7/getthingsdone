import uiManager from "./ui-manager.js"
import Storage from "./storage.js"
import "./main.css"

window.storage = Storage

const myInterface = uiManager()
myInterface.loadStorage()
myInterface.addListBtnListener()

window.myInterface = myInterface

