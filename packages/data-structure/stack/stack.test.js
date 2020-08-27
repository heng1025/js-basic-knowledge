const ArrayStack = require("./ArrayStack");
const LinkedStack = require("./LinkedStack");

describe("test Array Stack", () => {
  const stack = new ArrayStack();
  it("push data", () => {
    stack.push(123);
    stack.push(456);
    stack.push("abc");
    expect(stack.size()).toBe(3);
    expect(stack.peek()).toBe("abc");
    expect(stack.print()).toEqual([123, 456, "abc"]);
  });

  it("pop data", () => {
    stack.pop();
    expect(stack.size()).toBe(2);
    expect(stack.peek()).toBe(456);
  });
});

describe("test Linked List Statck", () => {
  const stack = new LinkedStack();
  it("push data", () => {
    stack.push(123);
    stack.push(456);
    stack.push("abc");
    expect(stack.size()).toBe(3);
    expect(stack.peek()).toBe("abc");
    expect(stack.print()).toEqual([123, 456, "abc"]);
  });

  it("pop data", () => {
    stack.pop();
    expect(stack.size()).toBe(2);
    expect(stack.peek()).toBe(456);
  });
});
