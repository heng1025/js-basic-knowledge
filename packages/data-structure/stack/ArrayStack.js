// 数组实现
const _elements = Symbol();

class ArrayStack {
  constructor() {
    this[_elements] = [];
  }
  size() {
    return this[_elements].length;
  }
  isEmpty() {
    return this.size() === 0;
  }
  // 获取栈顶元素
  peek() {
    return this[_elements][this.size() - 1];
  }
  push(element) {
    this[_elements].push(element);
  }
  pop() {
    return this[_elements].pop();
  }
  print() {
    return this[_elements];
  }
}

module.exports = ArrayStack;
