export default class Storage {
  static storeList(list) {
    localStorage.setItem(list.id, JSON.stringify(list))
  }

  static removeList(id) {
    localStorage.removeItem(id)
  }

  static updateStorage(...lists) {
    const packagedLists = {}
    let counter = 1
    lists.forEach(list => {
      let template = "list" + counter
      packagedLists[template] = list
      counter++
    })
    
    localStorage.setItem("app", JSON.stringify(packagedLists))
  }
}