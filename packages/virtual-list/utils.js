export function getRandomText(bit = 5) {
  const alphat = ['p', 'm', 'D', 'e', '3', 'x', 'b', '9', 'a', 'g'];
  let s = '';
  let i = 0;
  while (bit > 0) {
    s += alphat[parseInt(Math.random() * alphat.length)];
    bit--;
  }
  return s;
}

// 当节点数大于500000,DocumentFragment会有较好性能
export function genLongListFragment(count = 500000) {
  var fragment = document.createDocumentFragment();
  for (let i = 1; i < count; i++) {
    const li = document.createElement('li');
    li.innerHTML = `${i}-${getRandomText()}`;
    fragment.appendChild(li);
  }
  return fragment;
}

export function genLongList(count = 100000) {
  const lis = [];
  for (let i = 1; i < count; i++) {
    lis.push(`<div>${i}-${getRandomText()}</div>`);
  }
  return lis;
}
