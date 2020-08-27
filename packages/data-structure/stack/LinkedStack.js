const { Node } = require("../linked-list/LinkedList");

const _elements = Symbol();
const _size = Symbol();

class LinkedStack {
  constructor() {
    this[_elements] = null;
    this[_size] = 0;
  }
  size() {
    return this[_size];
  }
  isEmpty() {
    return this[_size] === 0;
  }
  peek() {
    if (!this.isEmpty()) {
      return this[_elements].element;
    }
    return -1;
  }
  push(element) {
    this[_elements] = new Node(element, this[_elements]);
    this[_size]++;
  }
  pop() {
    const removeItem = this.peek();
    if (!this.isEmpty()) {
      this[_elements] = this[_elements].next;
      this[_size]--;
    }
    return removeItem;
  }
  clear() {
    this[_elements] = null;
    this[_size] = 0;
  }
  print() {
    const arr = [];
    let probe = this[_elements];
    while (probe) {
      arr.unshift(probe.element);
      probe = probe.next;
    }
    return arr;
  }
}

module.exports = LinkedStack;
