/*
 * @Des: linked list queue
 * @Author: iron
 * @Date: 2020-08-23 21:45:26
 * @LastEditors: iron
 * @LastEditTime: 2020-08-23 22:53:25
 */

const { Node } = require("./LinkedList");

const elements = new WeakMap();

class LinkedQueue {
  constructor() {
    elements.set(this, null);
    this._front = null;
    this._rear = null;
    this._size = 0;
  }
  isEmpty() {
    return this._size === 0;
  }
  add(element) {
    const node = new Node(element);
    if (this.isEmpty()) {
      this._front = node;
    } else {
        
    }
    element.set(this, this._front);
  }
}
