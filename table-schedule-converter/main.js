const input = document.querySelector(".input");
const div = document.querySelector("div");
const output = document.querySelector(".output");

input.oninput = function() {
  let arr = input.value.split("\n");
  let newArr = [];
  let resultStr = "";
  for (let item of arr) {
    let [hours, minScope] = item.split("\t");
    let minScopeLength = minScope.length;
    console.log(hours);
    console.log(minScope);
    for (let i = 1; i <= minScopeLength / 2; i++) {
      newArr.push(hours + ":" + minScope.slice(0, 2));
      minScope = minScope.slice(2);
    }
  }

  for (let item of newArr) {
    resultStr += item + ", ";
  }

  resultStr = resultStr.slice(0, -2);

  output.value = resultStr;
  output.select();
  // document.execCommand("copy");
}