const ArrayQueue = (function () {
  // 声明一个私有变量
  const wkm = new WeakMap();

  return class ArrayQueue {
    constructor() {
      wkm.set(this, []);
    }
    isEmpty() {
      return wkm.get(this).length === 0;
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

const q = new ArrayQueue();
q.enqueue(123);
q.enqueue(456);
q.enqueue("abc");
const f = q.front();
console.log("f", f);
// const r = q.dequeue();
// const r1 = q.dequeue();
// const r2 = q.dequeue();
// const r3 = q.dequeue();
// console.log("r2", r2);
// console.log("r", r);
// const f1 = q.front();
// console.log("f1", f1);
console.log("queue", q.print());
