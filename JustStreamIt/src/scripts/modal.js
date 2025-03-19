/**
 * Opens the modal by setting its display style to "block".
 */
export function openModal() {
  const modal = document.getElementById("modal");
  if (modal) {
    modal.style.display = "block";
  }
}

/**
 * Closes the modal by setting its display style to "none".
 */
export function closeModal() {
  const modal = document.getElementById("modal");
  if (modal) {
    modal.style.display = "none";
  }
}

/**
 * Initializes the modal by setting up event listeners.
 *
 * Adds an event listener to the close button to trigger modal closing,
 * and listens for clicks on the window to close the modal if a click occurs outside of it.
 */
export function initModal() {
  const modal = document.getElementById("modal");
  const closeButtons = document.querySelectorAll(".close-modal button");
  if (closeButtons.length > 0) { 
    closeButtons.forEach(closeButton => {
      closeButton.addEventListener("click", closeModal);
    });
  }

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  function closeModal() {
    modal.style.display = "none";
  }
}

/**
 * Fills the modal with the provided movie details.
 *
 * Updates various modal elements (title, poster, description, technical details,
 * directors, and casting) based on the movie object's properties.
 */
export function fillModalContent(movie) {
  const modalTitle = document.getElementById("modal-title");
  const modalPosterImg = document.querySelector("#modal-poster img");
  const modalDescription = document.getElementById("long-description");
  const modalTechnicalDetails = document.querySelector(".technical");
  const modalDirectorsInfo = document.getElementById("directors");
  const modalCasting = document.getElementById("casting");

  if (modalTitle) modalTitle.innerText = movie.title;
  if (modalPosterImg) {
    modalPosterImg.src = movie.image_url;
    modalPosterImg.alt = movie.title;
  }
  if (modalDescription) {
    modalDescription.innerText = movie.long_description || movie.description || "Pas de description.";
  }
  if (modalTechnicalDetails) {
    modalTechnicalDetails.innerHTML = `<p class='technical'>${movie.year}, ${movie.genres || movie.genre}<br>
                                        ${movie.duration}, ${movie.countries || movie.country}<br>
                                        Score Imdb: ${movie.imdb_score}</p>`;
  }
  if (modalDirectorsInfo) {
    modalDirectorsInfo.innerHTML = `<p><em>Réalisé par</em><br>${movie.directors || movie.director}</p>`;
  }
  if (modalCasting) {
    modalCasting.innerText = Array.isArray(movie.actors)
      ? movie.actors.join(", ")
      : movie.actors;
  }
}
