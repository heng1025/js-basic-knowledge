// js作为浏览器主要的脚本语言，因为其特殊性（负责用户交互，网络请求等），它被设计成单线程（即同一时刻只能处理一件事）；
// 由于是单线程，所有的任务需要排队执行，若前一个任务执行时间太长，后面的任务只能等待，于是就出现了事件循环（event loop）；
// js运行时只有一个主线程，为了实现“非阻塞”机制，js引擎提供了一个“任务队列”（task queue），该队列存放程序运行的各种事件回调函数；

// 事件循环大体流程：
// js运行遇到一个异步事件后并不会一直等待其返回结果，而是会将这个事件挂起，将其添加到任务队列中，然后继续执行执行栈中的其他任务。
// 当主线程处于闲置状态时（执行栈中的所有同步任务执行完毕），主线程会读取任务队列，将可运行的异步任务添加到执行栈中执行，依此循环下去。

// 浏览器js运行机制
// 1. 执行一个宏任务（执行栈中没有则从任务队列中获取）【每次执行栈中的代码就是一个宏任务】
// 2. 执行过程中如果遇到微任务，则添加到微任务队列中
// 3. 宏任务执行完毕后，然后按顺序执行当前微任务队列中的所有任务
// 4. 当前宏任务执行完毕，然后GUI线程开始接管渲染
// 5. 渲染完毕后，回到js线程，开始下一个宏任务

// js中的任务分为宏任务（macrotask）和微任务（microtask）
// macrotask包括 整体代码script，setTimeout，setInterval，I/O，UI渲染，postMessage，MessageChannel，requestAnimationFrame,setImmediate（Node.js）等
// microtask包括 promise(excutor回调)，MutationObserver，process.nextTick (Node.js)
// 同一个事件循环中微任务永远在宏任务之前执行

// setTimeout(() => console.log(4));

// async function main() {
//   console.log(1);
//   await Promise.resolve();
//   console.log(3);
// }

// main();

// console.log(2);
// 1 2 3 4

// setTimeout(()=>{
//   console.log(1)
// },0)
// let a=new Promise((resolve)=>{
//    console.log(2)
//    resolve()
// }).then(()=>{
//   console.log(3)
// }).then(()=>{
//   console.log(4)
// })
// console.log(5)
// 2 5 3 4 1

async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async2');
}
console.log('script start');
setTimeout(function () {
  console.log('setTimeout');
}, 0);
async1();
new Promise(function (resolve) {
  console.log('promise1');
  resolve();
}).then(function () {
  console.log('promise2');
});
console.log('script end');
// script start ,async1 start ,async2 ,promise1 ,script end ,async1 end, promise2 ,setTimeout
