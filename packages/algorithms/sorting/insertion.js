// 插入排序
// 选取一个元素作为基准，然后从数组中取出元素和已排好
// 的数据进行比较，并插入适当的位置

function insertionSort(arr) {
  const len = arr.length;
  for (let i = 1; i < len; i++) {
    let temp = arr[i];
    let j = i - 1;
    while (j >= 0 && temp < arr[j]) {
      arr[j + 1] = arr[j];
      j--;
    }
    console.log(j)
    arr[j + 1] = temp;
  }
  return arr;
}

const data = [343, 1, 23, 4, 254];
// [1,23,4,254,343] -> [1,4,23,254,343]
const r = insertionSort(data);
console.log("r", r);
