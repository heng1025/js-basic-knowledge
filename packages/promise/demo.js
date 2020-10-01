const { reject, resolve } = require('./index');
const IPromise = require('./index');

const p1 = new IPromise((resolve, reject) => {
  console.log(' promise one');
  resolve('spend holiday');
});

const p2 = p1.then(data => {
  console.log('===receive p1 data===:', data);
  // throw new Error('error message');
  return 21323;
});

const p3 = p2.then(
  data => {
    console.log('success:', data);
  },
  err => {
    console.log('faild:', err);
  }
);

const s = IPromise.resolve(1231);
s.then(data => {
  console.log('data:', data);
});

const e = IPromise.reject(456);
e.then(null, err => {
  console.log('err:', err);
});

const p500 = new Promise(resolve => {
  setTimeout(() => {
    resolve('500ms');
  }, 5000);
});

const p800 = new Promise((_, reject) => {
  setTimeout(() => {
    reject('800ms');
  }, 800);
});

const a = IPromise.all([p500, p800]);
a.then(data => {
  console.log('data:', data);
});
