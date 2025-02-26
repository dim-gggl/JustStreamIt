import { fillModalContent, openModal } from "./modal.js"; 

export function setBestMovie(movie) {
  const bestMovieImage = document.getElementById("best-movie-img");
  const bestMovieTitle = document.getElementById("best-movie-title");
  const bestMovieDescription = document.querySelector("#best-movie article p");
  if (!bestMovieImage || !bestMovieTitle || !bestMovieDescription) {
    alert("Éléments du DOM non trouvés.");
    return;
  }
  bestMovieImage.src = movie.image_url || "https://picsum.photos/seed/picsum/210/297";
  bestMovieImage.alt = movie.title;
  bestMovieTitle.innerText = movie.title;
  bestMovieDescription.innerText = movie.description || "Description non disponible";
}

export function renderMovieBox(movie, dataId) {
  const movieBox = document.createElement("div");
  movieBox.classList.add("movie-box");

  const img = document.createElement("img");
  img.src = movie.image_url;
  img.alt = movie.title;
  if (!img) {
    img.src = "https://picsum.photos/seed/picsum/200/300";
  }

  const overlay = document.createElement("div");
  overlay.classList.add("overlay");

  const titleP = document.createElement("p");
  titleP.innerText = movie.title;

  const detailsBtn = document.createElement("button");
  detailsBtn.classList.add("open-modal");
  detailsBtn.setAttribute("data-id", dataId);
  detailsBtn.innerText = "Détails";
  
  detailsBtn.addEventListener("click", () => {
          fillModalContent(movie);
          openModal();
        });

  overlay.appendChild(titleP);
  overlay.appendChild(detailsBtn);
  movieBox.appendChild(img);
  movieBox.appendChild(overlay);
  return movieBox;
}

export function clearContainer(containerElement) {
  containerElement.innerHTML = "";
}

export function createGenreSection(categoryName) {
  let sectionContainer = document.createElement("section"); 
  sectionContainer.id = categoryName.toLowerCase();  
  sectionContainer.className = "catalogue"; 
  document.body.appendChild(sectionContainer);
  let sectionHeaderCleaned = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);  
  let categoryHeader = document.createElement("h2")
  categoryHeader.innerText = sectionHeaderCleaned
  sectionContainer.appendChild(categoryHeader)
  return sectionContainer;
}

export function setCategoryMovies(movies, categoryName) {
  try {
    let containerElement = document.querySelector(`#${categoryName.toLowerCase()} .movie-container`);
    if (!containerElement) {
      containerElement = document.createElement("div")
      containerElement.className = "movie-container";
    }
    clearContainer(containerElement);
    if (movies && movies.length) {
      movies.forEach(movie => {
        if (movie) {
          const movieBox = renderMovieBox(movie, movie.id);
          containerElement.appendChild(movieBox);
        }
      });
    }
  } catch {
    containerElementParent = createGenreSection(categoryName);
    setCategoryMovies(movies, categoryName);
  }
}
