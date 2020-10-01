const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class IPromise {
  static resolve(data) {
    return new IPromise((resolve, reject) => {
      resolve(data);
    });
  }

  static reject(error) {
    return new IPromise((resolve, reject) => {
      reject(error);
    });
  }

  static all(promises) {
    let pIndex = 0;
    const pLen = promises.length;
    return new Promise((resolve, reject) => {
      for (let i = 0; i < pLen; i++) {
        const p = promises[i];
        pIndex++;
        if (p && p.then) {
          p.then(resolve(p), reject);
        } else {
          if (pIndex === pLen) {
            resolve(p);
          }
        }
      }
    });
  }
  constructor(executor) {
    this.state = PENDING;
    this.success = undefined;
    this.fail = undefined;
    const resolve = value => {
      if (this.state === PENDING) {
        this.state = FULFILLED;
        this.success = value;
      }
    };

    const reject = value => {
      if (this.state === PENDING) {
        this.state = REJECTED;
        this.fail = value;
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  then(onFulfilled, onRejected) {
    if (this.state === FULFILLED) {
      onFulfilled(this.success);
    }
    if (this.state === REJECTED) {
      onRejected(this.fail);
    }
    return this;
  }

  race() {}
}

module.exports = IPromise;
