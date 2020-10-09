function debounce(fn, delay = 300) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

function throttle(fn, delay = 300) {
  let isTimeout = false;
  return (...args) => {
    if (isTimeout) return;
    isTimeout = true;
    fn(...args);
    setTimeout(() => {
      isTimeout = false;
    }, delay);
  };
}
