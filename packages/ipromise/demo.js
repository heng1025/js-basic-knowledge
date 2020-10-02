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

p2.then(
  data => {
    console.log('success:', data);
  },
  err => {
    console.log('faild:', err);
  }
);

const s = IPromise.resolve('aaaa');
s.then(data => {
  console.log('data:', data);
});

const e = IPromise.reject(456);
e.then(null, err => {
  console.log('err:', err);
});

const p500 = new IPromise(resolve => {
  setTimeout(() => {
    resolve('500ms');
  }, 500);
});

const p800 = new IPromise((resolve, reject) => {
  setTimeout(() => {
    reject('800ms');
  }, 800);
});

const a = IPromise.all([p500, p800]);
a.then(data => {
  console.log('all:', data);
}).catch(err => {
  console.log('all catch:', err);
});

const b = IPromise.race([p800, p500]);
b.then(data => {
  console.log('race:', data);
}).catch(err => {
  console.log('race catch:', err);
});
