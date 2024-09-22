export default class Storage {
  static isEnabled = false

  static refreshStorage(...lists) {
    if (!isEnabled) return null
    const packagedLists = {}
    let counter = 1
    lists.forEach(list => {
      let template = "list" + counter
      packagedLists[template] = list
      counter++
    })
    localStorage.setItem("app", JSON.stringify(packagedLists))
  }

  static getListsFromStorage() {
    if (localStorage.length === 0) return []
    if (!isEnabled) return null
    const app = JSON.parse(localStorage.getItem("app"))
    const properties = Object.getOwnPropertyNames(app)
    const lists = []
    properties.filter(prop => {
      return prop.slice(0, 4) === "list"
    }).forEach(li => {
      lists.push(app[li])
    })
    return lists
  }
}