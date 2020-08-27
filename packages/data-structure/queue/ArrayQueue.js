const ArrayQueue = (function () {
  // 声明一个私有变量
  const wkm = new WeakMap();

  return class ArrayQueue {
    constructor() {
      wkm.set(this, []);
    }
    size() {
      return wkm.get(this).length;
    }
    isEmpty() {
      return this.size() === 0;
    }
    front() {
      if (this.isEmpty()) {
        return null;
      }
      return wkm.get(this)[0];
    }
    enqueue(element) {
      const elements = wkm.get(this);
      elements.push(element);
    }
    dequeue() {
      const elements = wkm.get(this);
      return elements.shift();
    }
    clear() {
      wkm.set(this, []);
    }
    print() {
      return wkm.get(this);
    }
  };
})();

module.exports = ArrayQueue;
