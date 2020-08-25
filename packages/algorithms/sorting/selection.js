// 选择排序
// 从未排序的数组中取出最小（大）的元素依次放到另一个数组中
function selectionSort(arr) {
  const len = arr.length;
  let minIndex = -1;
  for (let i = 0; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[i] > arr[j]) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
  }

  return arr;
}

const data = [343, 1, 23, 4, 254];
// [1,23,4,254,343] -> [1,4,23,254,343]
const r = selectionSort(data);
console.log("r", r);
