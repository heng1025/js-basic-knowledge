const dateArr = [
  { value: "20180126", count: 1 },
  { value: "20180606", count: 4 },
  { value: "20180607", count: 3 },
  { value: "20180706", count: 5 },
  { value: "20190315", count: 4 },
];

// 2018 (13)
//   01 (1)
//     26 (1)
//   06 (7)
//     06 (4)
//     07 (3)
//   07 (5)
//     06 (5)
// 2019 (4)
//   03 (4)
//     15 (4)

// [{id: "2018", value: "2018", count: 1, children: []}]

// 20200428
const dateRe = /(\d{4})(\d{2})(\d{2})/;

class Tree {
  constructor(id = "root") {
    this.count = 0;
    this.value = "";
    this.children = [];
    this.id = id;
  }
  add(count, ...args) {
    this.count += count;
    const key = args.shift();
    if (args.length > 0) {
      const child = new Node(key);
      this.children.push(child);
      child.add(count, ...args);
    }
  }
}

function dateToTree(dateList) {
  const [years, months, days] = [[], [], []];

  // 取出第一个元素
  const [current, ...rest] = dateList;
  const { value, count } = current;
  let [, curYear, curMon, curDay] = value.match(dateRe);
  // let [curYear, curMon] = ["0", "0"];
  let [yearCount, monCount] = [0, 0];

  const len = dateList.length;
  node = new Tree();
  node.add(count, curYear, curMon, curDay);
  console.log(JSON.stringify(node));
  // for (let i = 0; i < len; i++) {
  //   const { value, count } = dateList[i];
  //   const [, year, mon, day] = value.match(dateRe);
  //   node.add(count, year, mon, day);
  //   // years.push({
  //   //   id: year,
  //   //   value: year,
  //   //   child: mon,
  //   //   count,
  //   // });
  // }
  // console.log(node);
  return years;
}

console.log("res", dateToTree(dateArr));
