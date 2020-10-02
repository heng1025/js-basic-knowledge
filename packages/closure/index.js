let a = 0;
let b = 0;

function foo(a) {
  // 由于函数是引用类型，foo(1)执行时，修改外层foo执行上下文为内部的匿名函数，
  // call stack 销毁外层foo，foo(2),foo(3)实际只是内层foo调用，其GC不能销毁
  foo = function (b) {
    console.log(a + b++);
  };
  console.log(a++);
}

foo(1);
foo(2);
foo(3);
// resutl: 1,4,5
