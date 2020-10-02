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
    const result = [];
    const pLen = promises.length;
    return new IPromise((resolve, reject) => {
      function processData(index, data) {
        result[index] = data;
        pIndex++;
        if (pIndex === pLen) {
          resolve(result);
        }
      }

      for (let i = 0; i < pLen; i++) {
        promises[i].then(data => {
          processData(i, data);
        }, reject);
      }
    });
  }

  static race(promises) {
    return new IPromise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(resolve, reject);
      }
    });
  }
  constructor(executor) {
    this.state = PENDING;
    this.success = undefined;
    this.fail = undefined;

    // 处理异步promise
    this.onSuccessCallbacks = [];
    this.onFailCallbacks = [];

    const resolve = value => {
      if (this.state === PENDING) {
        this.state = FULFILLED;
        this.success = value;
        // 执行成功callback
        this.onSuccessCallbacks.forEach(fn => fn());
      }
    };

    const reject = value => {
      if (this.state === PENDING) {
        this.state = REJECTED;
        this.fail = value;
        this.onFailCallbacks.forEach(fn => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  then(onResolved = v => v, onRejected = err => err) {
    if (this.state === PENDING) {
      // 收集callback
      this.onSuccessCallbacks.push(() => onResolved(this.success));
      this.onFailCallbacks.push(() => onRejected(this.fail));
    }

    if (this.state === FULFILLED) {
      onResolved(this.success);
    }
    if (this.state === REJECTED) {
      onRejected(this.fail);
    }
    return this;
  }
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }
}

module.exports = IPromise;
