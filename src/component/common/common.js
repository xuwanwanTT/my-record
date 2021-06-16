function judgeWeight(data, sex) {
  let res = '--';
  const arr = [20, 25, 30, 35];
  const arrName = ['过轻', '适中', '过重', '肥胖'];
  for (let i = 0; i < arr.length; i++) {
    if (data > 35) {
      res = '极其肥';
    }
    if (data < arr[i]) {
      res = arrName[i];
      break;
    }
  }
  return res;
};

function getAverage() {
  let len = arguments.length;
  let length = len;
  let arr = [];
  for (let i = 0; i < len; i++) {
    let item = arguments[i];
    if (item) {
      arr.push(item * 10000);
    } else {
      length--;
    }
  }
  return arr.length ? arr.reduce((a, b) => a + b) / (length || 1) / 10000 : 0;
}

export {
  judgeWeight,
  getAverage
};
