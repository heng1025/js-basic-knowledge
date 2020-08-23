/*
 * @Des: Stack
 * @Author: iron
 * @Date: 2020-08-23 17:19:56
 * @LastEditors: iron
 * @LastEditTime: 2020-08-23 21:32:20
 */

// 数组实现
const _elements = Symbol();
class ArrayStack {
  constructor() {
    this[_elements] = [];
  }
  size() {
    return this[_elements].length;
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

const s = new ArrayStack();
s.push(123);
s.push(456);
const top = s.peek();
// const top1 = s.peek();
// const top2 = s.peek();
console.log("top", top);
// s.pop();
// s.pop();
// s.pop();
console.log("s", s.print());
