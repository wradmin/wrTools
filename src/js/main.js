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


function removeHash(hash) {
  history.back();
}