const input = document.querySelector(".input");
const output = document.querySelector(".output");
const exampleLink = document.querySelector(".exampleLink");
const scheduleExample = document.querySelector(".scheduleExample");
const modalUnderlay = document.querySelector(".modalUnderlay");


// CONVERTING
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


// MODALS
exampleLink.onclick = function(e) {
  e.preventDefault();
  showModal(scheduleExample);
  
  if (!document.querySelector(".scheduleExample__img")) {
    let img = document.createElement("img");
    img.classList.add("scheduleExample__img");
    img.setAttribute("src", "example.png");
    scheduleExample.append(img);
  }

  modalUnderlay.onclick = function() {
    hideModal(scheduleExample);
  }

  window.onkeydown = function(e) {
    if (e.code === "Escape") hideModal(scheduleExample);
  }
}

function showModal(el) {
  document.documentElement.style.overflow = "hidden";
  el.classList.add("modal--show");
  modalUnderlay.classList.add("modalUnderlay--show");
}

function hideModal(el) {
  document.documentElement.style.overflow = "auto";
  el.classList.remove("modal--show");
  modalUnderlay.classList.remove("modalUnderlay--show");

  window.onkeydown = false;
  modalUnderlay.onclick = false;
}