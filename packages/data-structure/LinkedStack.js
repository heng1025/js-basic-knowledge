const { Node } = require("./LinkedList");

const _elements = Symbol();
const _size = Symbol();

class LinkedStack {
  constructor() {
    this[_elements] = null;
    this[_size] = 0;
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

const s = new LinkedStack();
s.push(123);
s.push(456);
s.push(45688);
const top = s.peek();
console.log("top", top);
// s.pop();
// s.pop();
// s.pop();
console.log("s", s);
console.log("s", s.print());
