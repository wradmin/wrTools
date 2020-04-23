const input = document.querySelector(".input");
const output = document.querySelector(".output");

input.oninput = function() {
  let arr = input.value.split("\n");
  let newArr = [];
  let resultStr = "";

  for (let item of arr) {
    let [hours, minScope] = item.split("\t");

    if (minScope.includes(" ") === true) {
      minScope = minScope.split(" ").join("");
    }
    
    for (let i = 1; i <= minScope.length / 2; ) {
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