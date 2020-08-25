// 冒泡排序
// 比较相邻的两个元素，若前者大则交换位置
function bubbleSort(arr) {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

const data = [343, 1, 23, 4, 254];
// [1,23,4,254,343] -> [1,4,23,254,343]
const r = bubbleSort(data);
console.log("r", r);
