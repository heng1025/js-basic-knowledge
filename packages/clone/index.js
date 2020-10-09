// shallow clone (只拷贝基本类型的数据，引用类型数据复制后也会发生引用)
const a = {
  x: 1,
  y: {
    m: 2,
  },
};

function shallowClone(source) {
  const result = {};
  for (let key in source) {
    result[key] = source[key];
  }
  return result;
}

// Object.assign
// const b = Object.assign({}, a);

// rest operation
// const b = { ...a };

// const b = shallowClone(a);
// a.x = 2;
// console.log('a', a);
// console.log('b', b);
// b.x = 3;
// console.log('a', a);
// console.log('b', b);
// b.y.m = 3;
// console.log('a', a);
// console.log('b', b);

// deep clone
function deepClone(source) {
  const result = {};
  for (let attr in source) {
    if (Object.prototype.toString.call(source[attr]) === '[object Object]') {
      result[attr] = deepClone(source[attr]);
    } else {
      result[attr] = source[attr];
    }
  }
  return result;
}

// JSON.parse
// const c = JSON.parse(JSON.stringify(a));

const c = deepClone(a);
a.x = 2;
console.log('a', a);
console.log('c', c);
c.x = 3;
console.log('a', a);
console.log('c', c);
c.y.m = 3;
console.log('a', a);
console.log('c', c);
