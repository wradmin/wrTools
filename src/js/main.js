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
  let schedule = "";

  let parts = splitScheduleIntoParts(inputData);
  let recognizedParts = recognizeParts(parts);
  console.log( recognizedParts );
  
  for (let item of recognizedParts) {
    let reversedPart = reverseString(item);
    
    let timeArray = reversedPart.match(/\d{1,2}/g);
    let [hour, minutes] = separateAndRevers(timeArray);
    schedule += combineHourMinutes([hour, minutes]) + ", ";
  }

  return schedule;


  function splitScheduleIntoParts(inputData) {
    if (inputData.includes("\n")) {
      return inputData.split("\n");
    } else if (inputData.includes(".")) {
      return inputData.split(".");
    } else if (inputData.includes(",")) {
      return inputData.split(",");
    }
    else {
      return [inputData];
    }
  }

  
  function isEmpty(part) {
    if (part.match(/\d/g) === null) return true;
    return false;
  }


  function recognizeParts(parts) {
    let recognizedParts = [];

    parts.forEach((item, index)=> {
      if ( isEmpty(item) ) return;

      let clearedPart = clearPart(item);
      if (clearedPart.length < 3 && index !== 0) {
        recognizedParts[recognizedParts.length - 1] += clearedPart;
      } else {
        recognizedParts.push(clearedPart);
      }
    })

    return recognizedParts;
  }


  function clearPart(part) {
    return part.replace(/[^0123456789:]/g, "");
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


document.onclick = function(e) {
  if (e.target.hasAttribute("data-open-modal")) {
    e.preventDefault();
    let modalName = e.target.getAttribute("data-open-modal");
    let modal = document.querySelector(`[data-modal-name="${modalName}"]`);
    showModal(modal);
  }
}


function showModal(modal) {
  modal.classList.add("modal--show");
  modalUnderlay.classList.add("modalUnderlay--show");
  addHash("preview");

  modalUnderlay.onclick = function() {
    hideModal(modal);
  }

  document.onkeydown = function(e) {
    if (e.code === "Escape") {
      hideModal(modal);
    }
  }

  window.onhashchange = function() {
    if (location.hash === "") {
      this.hideModal(modal);
    }
  }
}


function hideModal(modal) {
  modal.classList.remove("modal--show");
  modalUnderlay.classList.remove("modalUnderlay--show");
  removeHash();
}


function addHash(hash) {
  location.hash = hash;
}


function removeHash() {
  location.hash = "";
  // location.href = location.href.slice(0, -1);
}