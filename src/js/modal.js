// ===================================
// MODAL
// ===================================
const scheduleExample = document.querySelector(".scheduleExample");
const modalUnderlay = document.querySelector(".modalUnderlay");


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