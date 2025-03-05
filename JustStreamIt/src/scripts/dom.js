import { fillModalContent, openModal } from "./modal.js"; 

/**
 * Updates the "Best Movie" section in the DOM with the provided movie details.
 *
 * This function sets the image source, alternative text, title, and description of the best movie.
 * If any required DOM element is not found, an alert is displayed.
 */
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

/**
 * Creates a movie box element that displays a movie's image, title, and a button to open a modal with more details.
 *
 * The details button is configured with an event listener to fill the modal content and open the modal when clicked.
 */
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

  const titleH3 = document.createElement("h3");
  titleH3.innerText = movie.title;
  titleH3.className = "movie-title"

  const detailsBtn = document.createElement("button");
  detailsBtn.classList.add("open-modal");
  detailsBtn.setAttribute("data-id", dataId);
  detailsBtn.innerText = "Détails";

  detailsBtn.addEventListener("click", () => {
          fillModalContent(movie);
          openModal();
        });

  overlay.appendChild(titleH3);
  overlay.appendChild(detailsBtn);
  movieBox.appendChild(img);
  movieBox.appendChild(overlay);
  return movieBox;
}

/**
 * Clears the content of a given container element.
 */
export function clearContainer(containerElement) {
  containerElement.innerHTML = "";
}


/**
 * Creates and appends a new genre section to the document body.
 *
 * The section element is assigned an id based on the lowercased category name and given a header
 * with the capitalized category name.
 */
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


/**
 * Populates a genre section with movie boxes.
 *
 * This function finds the category section by its lowercased name, locates (or creates) its movie container,
 * clears any existing content, and appends new movie boxes for each valid movie provided.
 * If the section is not found, it creates a new genre section and retries.
 */
export function setCategoryMovies(movies, categoryName) {
  try {
    let categorySection = document.getElementById(`${categoryName.toLowerCase()}`)
    let containerElement = document.querySelector(`#${categorySection.id} .movie-container`);
    if (!containerElement) {
      containerElement = document.createElement("div")
      containerElement.className = "movie-container";
    }
    clearContainer(containerElement);
    if (movies) {
      movies.forEach(movie => {
        if (movie) {
          const movieBox = renderMovieBox(movie, movie.id);
          containerElement.appendChild(movieBox);
        }
      });
    }
  } catch {
    categorySection = createGenreSection(categoryName);
    setCategoryMovies(movies, categoryName);
  }
}

/**
 * Populates all dropdown menus for category selection with genre options.
 *
 * For each dropdown container found with the class ".selected-category .dropdown-child",
 * this function clears its current content and appends an anchor element for each genre.
 */
export function setCategoryDropdownButtons(genres) {
  const dropdownContainers = document.querySelectorAll(".selected-category .dropdown-child");
  dropdownContainers.forEach(dropdown => {
    clearContainer(dropdown);
    genres.forEach(genre => {
      const option = document.createElement("a");
      option.href = "#";
      option.textContent = genre.name;
      option.setAttribute("data-genre", genre.name);
      dropdown.appendChild(option);
    });
  });
}
