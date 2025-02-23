// Get the modal
export let modal = document.getElementById("modal");

// Get the button that opens the modal
export let buttonsToOpenModal = []
export let btnsToModal = document.getElementsByClassName("open-modal");
for (let btn of btnsToModal) {
    buttonsToOpenModal.push(btn);
}

// Get the <span> element that closes the modal
export let buttonToCloseModal = document.getElementsById("close-modal");

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}