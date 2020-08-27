const ArrayStack = require("./ArrayStack");
const LinkedStack = require("./LinkedStack");

describe("test array stack", () => {
  const stack = new ArrayStack();
  it("can push data", () => {
    stack.push(123);
    stack.push(456);
    stack.push("abc");
    expect(stack.print()).toEqual([123, 456, "abc"]);
  });

  it("should size equal 3", () => {
    expect(stack.size()).toBe(3);
  });

  it("can pop data", () => {
    expect(stack.pop()).toBe("abc");
    expect(stack.size()).toBe(2);
  });

  it("top elemet is 456", () => {
    expect(stack.peek()).toBe(456);
  });

  it("should be empty", () => {
    stack.pop();
    stack.pop();
    expect(stack.isEmpty()).toBeTruthy();
  });
});

describe("test linked list statck", () => {
  const stack = new LinkedStack();
  it("can push data", () => {
    stack.push(123);
    stack.push(456);
    stack.push("abc");
    expect(stack.print()).toEqual([123, 456, "abc"]);
  });

  it("should size equal 3", () => {
    expect(stack.size()).toBe(3);
  });

  it("can pop data", () => {
    expect(stack.pop()).toBe("abc");
    expect(stack.size()).toBe(2);
  });

  it("top elemet is 456", () => {
    expect(stack.peek()).toBe(456);
  });

  it("should be empty", () => {
    stack.pop();
    stack.pop();
    expect(stack.isEmpty()).toBeTruthy();
  });
});
