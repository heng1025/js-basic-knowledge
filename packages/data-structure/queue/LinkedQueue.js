/*
 * @Des: linked list queue
 * @Author: iron
 * @Date: 2020-08-23 21:45:26
 * @LastEditors: iron
 * @LastEditTime: 2020-08-23 22:53:25
 */

const { Node } = require("./LinkedList");

class LinkedQueue {
  constructor() {
    this._front = null;
    this._rear = null;
    this._size = 0;
  }
  isEmpty() {
    return this._size === 0;
  }
  // first element in queue
  front() {
    if (this.isEmpty()) {
      return null;
    }
    return this._front.element;
  }
  // 将元素添加到队列尾部
  enqueue(element) {
    const node = new Node(element);
    if (this.isEmpty()) {
      this._front = node;
    } else {
      // 将尾节点的next指向当前节点
      this._rear.next = node;
    }
    // 将当前节点设置为尾节点
    this._rear = node;
    this._size++;
  }
  // 删除队列最前面的元素
  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    const removeItem = this._front.element;
    this._front = this._front.next;
    // 若队列为空，将尾节点置空
    if (!this._front) {
      this._rear = null;
    }
    this._size--;
    return removeItem;
  }
  clear() {
    this._front = null;
    this._rear = null;
    this._size = 0;
  }
  print() {
    const arr = [];
    if (this.isEmpty()) {
      return arr;
    }
    let probe = this._front;
    while (probe) {
      arr.push(probe.element);
      probe = probe.next;
    }
    return arr;
  }
}

const q = new LinkedQueue();
q.enqueue(123);
q.enqueue(456);
q.enqueue("abc");
const f = q.front();
console.log("f", f);
// const r = q.dequeue();
// const r1 = q.dequeue();
// const r2 = q.dequeue();
// console.log("r2", r2);
// console.log("r", r);
console.log("queue", q.print());
