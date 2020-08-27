const ArrayQueue = require("./ArrayQueue");
// const LinkedQueue = require("./LinkedQueue");

describe("test array queue", () => {
  const queue = new ArrayQueue();
  it("can enqueue data", () => {
    queue.enqueue(123);
    queue.enqueue(456);
    queue.enqueue("abc");
    expect(queue.print()).toEqual([123, 456, "abc"]);
  });

  it("size is 3", () => {
    expect(queue.size()).toBe(3);
  });

  it("front element is 123", () => {
    expect(queue.front()).toBe(123);
  });

  it("can dequeue data", () => {
    expect(queue.dequeue()).toBe(123);
    expect(queue.size()).toBe(2);
  });

  it("can clear data", () => {
    queue.clear();
    expect(queue.size()).toBe(0);
  });
});
