"use strict";

let input = document.querySelector("[data-picker='input']");
let output = document.querySelector("[data-picker='output']");


input.addEventListener("input", input_Input_Handler);


// =================================================================
// ФУНКЦИИ
// =================================================================
function pickTime(string) {
  let times = string.match(/\d?\d:\d\d/g);

  fillOutput(times.join(", "));
}


function fillOutput(data) {
  output.value = data;
}



// =================================================================
// ОБРАБОТЧИКИ
// =================================================================
function input_Input_Handler(evt) {
  pickTime(evt.target.value);
}