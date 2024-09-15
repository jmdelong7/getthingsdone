import Inbox from './inbox.js'

class Capture {
  constructor(captureItems = []) {
    this.captureItems = captureItems
  }

  addCaptureItem(item) {
    this.captureItems.push(item)
  }
}