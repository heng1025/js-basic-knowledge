
// 定义一个单链表节点
class Node {
  constructor(element, next = null) {
    this.element = element;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  append(element) {
    const node = new Node(element);
    if (this.head === null) {
      // 空链表
      this.head = node;
    } else {
      let probe = this.head;
      while (probe.next) {
        // 找到最后一项
        probe = probe.next;
      }
      probe.next = node;
    }
    // 更新链表长度
    this.size++;
  }
  // 任意位置插入
  insert(index, element) {
    if (index < 0 || index > this.size) {
      return false;
    }
    if (index === 0) {
      // 在第一个位置添加
      this.head = new Node(element, this.head);
    } else {
      let probe = this.head;
      while (index > 1 && probe.next) {
        probe = probe.next;
        index--;
      }
      probe.next = new Node(element, probe.next);
    }
    this.size++;
    return true;
  }
  // 从末尾删除
  remove() {
    if (this.head === null) {
      return null;
    }
    if (this.head.next === null) {
      const removeItem = this.head.element;
      this.head = null;
      this.size--;
      return removeItem;
    }
    let probe = this.head;
    while (probe.next.next) {
      probe = probe.next;
    }
    const removeItem = probe.next.element;
    probe.next = null;
    this.size--;
    return removeItem;
  }
  // 指定位置删除
  removeAt(index) {
    if (index < 0 || this.head === null) {
      return -1;
    }

    if (index !== 0 && index >= this.size) {
      return -1;
    }

    if (index === 0) {
      const removeItem = this.head.element;
      this.head = this.head.next;
      this.size--;
      return removeItem;
    }

    let probe = this.head;
    while (index > 1 && probe.next.next) {
      probe = probe.next;
      index--;
    }
    const removeItem = probe.next.element;
    probe.next = probe.next.next;
    this.size--;
    return removeItem;
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

module.exports = {
  Node,
  LinkedList,
};

// 1->'abc'->234
// const linkedList = new LinkedList();
// console.log("linkedList", linkedList);
// linkedList.append(1);
// linkedList.append(234);
// linkedList.append("aaa");
// linkedList.append("bbb");
// console.log("linked3", linkedList.print());
// const a = linkedList.remove();
// console.log("a", a);
// console.log("linked1", linkedList);

// linkedList.insert(1, "abc");
// console.log("linked2", linkedList);

// const removeItem1 = linkedList.remove();
// console.log("removeItem1", removeItem1);

// const removeItem2 = linkedList.removeAt(1);
// console.log("removeItem2", removeItem2);
// console.log("linked3", linkedList);

// const removeItem3 = linkedList.removeAt(200);
// console.log("removeItem3", removeItem3);
// console.log("linked4", linkedList.print());

// const newItem = linkedList.insert(4, "afasd");
// console.log("linked4", linkedList);
// console.log("linked4", linkedList.print());
