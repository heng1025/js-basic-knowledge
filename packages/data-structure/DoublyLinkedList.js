class TwoWayNode {
  constructor(element, prev = null, next = null) {
    this.element = element;
    this.prev = prev;
    this.next = next;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  append(element) {
    const node = new TwoWayNode(element);
    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }

    this.size++;
    return true;
  }
  insert(index, element) {
    if (index < 0 || index > this.size) {
      return -1;
    }

    if (index === 0) {
      // 第一个位置添加
      const node = new TwoWayNode(element);
      if (this.head === null) {
        // 空链表
        this.head = node;
        this.tail = node;
      } else {
        node.next = this.head;
        this.head.prev = node;
        this.head = node;
      }
      this.size++;
    } else if (index === this.size) {
      this.append(element);
    } else {
      // 中间添加
      let probe = this.head;
      if (index > 1 && probe.next) {
        probe = probe.next;
        index--;
      }
      console.log("9090");
      const node = new TwoWayNode(element, probe, probe.next);
      probe.next = node;
      this.size++;
    }
  }
  // 从最后删除
  remove() {
    if (this.tail === null) {
      return null;
    }
    const removeItem = this.tail.element;
    console.log("DoublyLinkedList -> remove -> removeItem", removeItem);
    if (this.tail.prev) {
      this.tail = this.tail.prev;
      this.tail.next = null;
    } else {
      this.tail = null;
      this.head = null;
    }

    this.size--;
    return removeItem;
  }
  // 从前往后遍历删除
  removeFront() {
    if (this.head === null) {
      return null;
    }

    if (this.head.next === null) {
      const removeItem = this.head.element;
      this.head = null;
      this.tail = null;
      this.size--;
      return removeItem;
    }

    let probe = this.head;
    while (probe.next.next) {
      probe = probe.next;
    }
    const removeItem = probe.next.element;
    probe.next = null;
    this.tail = probe;
    this.size--;
    return removeItem;
  }
  removeAt(index) {
    if (index < 0 || this.head === null) {
      return -1;
    }
    if (index !== 0 && index >= this.size) {
      return -1;
    }

    if (index === 0) {
      // 第一项
      const removeItem = this.head.element;
      if (this.head.next === null) {
        this.head = null;
        this.tail = null;
      } else {
        this.head.prev = null;
        this.head = this.head.next;
      }
      this.size--;
      return removeItem;
    } else if (index === this.size - 1) {
      // 最后一项
      return this.remove();
    } else {
      // TODO 这里可以分情况处理
      // 从前往后遍历
      let probe = this.head;
      while (index > 1 && probe.next.next) {
        probe = probe.next;
        index--;
      }
      // 删除指定节点，连接前后的节点
      const removeItem = probe.next.element;
      probe.next = probe.next.prev;
      this.size--;
      return removeItem;
    }
  }
  print() {
    let probe = this.head;
    const arr = [];
    while (probe) {
      arr.push(probe.element);
      probe = probe.next;
    }
    return arr;
  }
}
// 123->abc->abc444->456
const doubleLinkedList = new DoublyLinkedList();
doubleLinkedList.append(456);
doubleLinkedList.append(45699);
doubleLinkedList.append("asd");
// doubleLinkedList.append("123123");
doubleLinkedList.insert(3, 1231);
// // doubleLinkedList.append(123);
// doubleLinkedList.remove()
// doubleLinkedList.remove()
console.log("doubleLinkedList", doubleLinkedList.print());
const b = doubleLinkedList.removeAt(3);
console.log("b", b);
// // const c = doubleLinkedList.remove();
// // console.log("b", doubleLinkedList);
console.log("doubleLinkedList", doubleLinkedList.print());
// doubleLinkedList.remove();
// doubleLinkedList.remove();

// doubleLinkedList.append(456);

// doubleLinkedList.insert(1, "abc");
// doubleLinkedList.insert(1, "abc4444");
