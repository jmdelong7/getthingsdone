import uiManager from "./ui-manager.js"
import Storage from "./storage.js"
import "./main.css"

const myInterface = uiManager()
myInterface.loadStorage()
myInterface.addListBtnListener()

window.storage = Storage
window.myInterface = myInterface

