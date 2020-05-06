// ===================================
// CONVERTER
// ===================================
const inputField = document.querySelector(".converter__textarea--input");
const outputField = document.querySelector(".converter__textarea--output");

inputField.oninput = function() {
  const inputData = inputField.value;
  if (inputData !== "") {
    outputField.value = convertSchedule(inputData);
  }
}


function convertSchedule(inputData) {
  let parts = splitSchedule(inputData);
  let clearParts = [];
  let schedule = [];
  for (let item of parts) {
    if (item.match(/\d/g) === null) continue;
    let cleared = clearPart(item);
    let reversed = reverseString(cleared);
    let timeArray = reversed.match(/\d{1,2}/g);
    let [hour, minutes] = separateAndRevers(timeArray);
    schedule += combineHourMinutes([hour, minutes]) + ", ";
  }
  return schedule;

  
  function splitSchedule(inputData) {
    if (inputData.includes("\n")) {
      return inputData.split("\n");
    } else if (inputData.includes(".")) {
      return inputData.split(".");
    } else {
      return [inputData];
    }
  }


  function clearPart(part) {
    return part.replace(/\D/g, "");
  }


  function reverseString(string) {
    return string.split("").reverse().join("");
  }


  function separateAndRevers(timeArray) {
    let hour = timeArray.pop();
    hour = hour.split("").reverse().join("");

    let minutes = [];
    for (let item of timeArray) {
      minutes.push(item.split("").reverse().join(""));
    }

    return [hour, minutes.reverse()];
  }


  function combineHourMinutes([hour, minutes]) {
    let times = [];
    
    for (item of minutes) {
      times.push(hour + ":" + item);
    }

    return times.join(", ");
  }
}



// ===================================
// MODAL
// ===================================
const scheduleExample = document.querySelector(".scheduleExample");
const modalUnderlay = document.querySelector(".modalUnderlay");
const exampleLink = document.querySelector(".converter__exampleLink");

exampleLink.onclick = function(e) {
  e.preventDefault();
  showModal(scheduleExample);
}


function showModal(modal) {
  modal.classList.add("modal--show");
  modalUnderlay.classList.add("modalUnderlay--show");

  modalUnderlay.onclick = function() {
    hideModal(scheduleExample);
  }

  document.onkeydown = function(e) {
    if (e.code === "Escape") {
      hideModal(scheduleExample);
    }
  }
}

function hideModal(modal) {
  modal.classList.remove("modal--show");
  modalUnderlay.classList.remove("modalUnderlay--show"); 
}