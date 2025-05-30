import { 
  getBestMoviesList, 
  bestMovieFromUrl, 
  extractSixMoviesToDisplay,
  fetchTheAmountOfPagesRequired,
  extractMoviesIdsFromData,
  getAllGenres,
  getMoviesFromIDs} from './api.js';
import { createMovieModel } from './models.js';
import {
  setBestMovie,
  setCategoryDropdownButtons,
  setCategoryMovies,
  clearContainer,
  renderMovieBox
} from './dom.js';
import { initModal, openModal, fillModalContent } from './modal.js';
import { moviesUrl, sciFiMoviesUrl, moviesByGenreFilter, sortByFilter, imdbScoreFilter, bestFrenchMoviesFromThe90sUrl, bestImdbMoviesUrl } from './config.js';

/**
 * Displays the loader overlay by setting its display style to "flex" and its opacity to "1".
 */
function showLoader() {
  const loader = document.getElementById("loader-overlay");
  if (loader) {
    loader.style.display = "flex";
    loader.style.opacity = '1';
  }
}

/**
 * Hides the loader overlay after a delay by first fading it out and then setting its display to "none".
 *
 * The opacity is set to 0 after 6000ms, then the display is set to "none" after an additional 10000ms.
 */
function hideLoader() {
  const loader = document.getElementById("loader-overlay");
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = "none";
      }, 3000);
    }, 2000);
  }
}

/**
 * Loads and displays movies for a given category within the specified section element.
 *
 * Optionally shows a loader spinner while fetching data.
 */
async function loadCategoryMovies(sectionElement, categoryName, spinnerIsActive = true) {
  if (spinnerIsActive) {
    showLoader();
  }
  try {
    const categoryUrl = moviesUrl + moviesByGenreFilter + categoryName.toLowerCase() + "&" + sortByFilter + imdbScoreFilter;
    const movies = await extractSixMoviesToDisplay(categoryUrl);
    sectionElement.querySelector("h2").innerText = categoryName
    let container = sectionElement.querySelector(".movie-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "movie-container";
      sectionElement.appendChild(container);
    }
    clearContainer(container);
    movies.forEach(movie => {
      if (movie) {
        const movieBox = renderMovieBox(movie, movie.id);
        container.appendChild(movieBox);
      }
    });
  } catch (error) {
    console.error(`Erreur lors du chargement de la catégorie ${categoryName}: `, error);
    alert(`Erreur lors du chargement de la catégorie ${categoryName}`);
  }
  if (sectionElement.classList.contains("to-define-section")) {
    sectionElement.classList.remove("to-define-section")
  }
  sectionElement.classList.add(categoryName.toLowerCase())
  if (spinnerIsActive) {
    hideLoader();
  }
}

/**
 * Initializes category dropdown menus by attaching click event listeners to each option.
 *
 * When an option is selected, the corresponding category is loaded.
 */
function initCategoryDropdowns() {
  const dropdowns = document.querySelectorAll(".selected-category .dropdown");
  dropdowns.forEach(dropdown => {
    const button = dropdown.querySelector(".category-list-button");
    const options = dropdown.querySelectorAll(".category-dropdown-button");
    const optionsContainer = dropdown.querySelector(".dropdown-content")
    
    button.addEventListener("click", async (e) => {
      e.preventDefault();
      optionsContainer.style.display = "flex";
      optionsContainer.style["flex-wrap"] = "wrap";
      optionsContainer.style.opacity = "1";
    })
    options.forEach(btn => {
      btn.addEventListener("click", async (e) => {
        e.preventDefault();
        optionsContainer.style.display = "none";
        const selectedCategory = btn.textContent.trim();
        button.textContent = "Autres  ▾";
        const section = dropdown.closest(".selected-category");
        await loadCategoryMovies(section, selectedCategory, false);
        initToggleBtns(); 
      });
    });
  });
}

/**
 * Loads the default movie category ("Comedy") in the default section.
 *
 * Finds the section element with the class "selected-category" that does not have the "user-selected" class,
 * updates its category list button, and loads movies for the default category without activating the spinner.
 */
async function loadDefaultCategory() {
  const defaultSection = document.querySelector(".selected-category:not(.to-define-section)");
  if (defaultSection) {
    const button = defaultSection.querySelector(".category-list-button");
    const defaultCategory = "Comedy";
    button.textContent = defaultCategory + "  ▾";
    await loadCategoryMovies(defaultSection, defaultCategory, false);
  }
}

function initToggleBtns() {
  let moviesContainers = document.querySelectorAll('.movie-container');
  moviesContainers.forEach(div => {
    let toggleBtn = div.querySelector('.toggle-btn');
    if (!toggleBtn) {
      toggleBtn = document.createElement('button');
      toggleBtn.className = 'toggle-btn';
      toggleBtn.innerText = 'Voir plus';
      div.append(toggleBtn);
    }
    toggleBtn.onclick = (e) => {
      e.preventDefault();
      div.classList.toggle('expanded');
      if (div.classList.contains('expanded')) {
        toggleBtn.innerText = 'Voir moins';
      } else {
        toggleBtn.innerText = 'Voir plus';
      }
    };
  });
};

/**
 * Initializes the application once the DOM content is fully loaded.
 *
 * - Fetching and displaying the best movie.
 * - Setting up the modal for the best movie.
 * - Loading movies for Best French Movies From the 90s & Sci-Fi categories.
 * - Initializing modal functionality.
 * - Fetching genres and initializing category dropdown menus.
 */
document.addEventListener("DOMContentLoaded", async () => {
  // Starts with the Best Movie section
  try {
    const bestMoviesData = await getBestMoviesList();
    const bestMovieRef = bestMoviesData.results[0];
    if (!bestMovieRef || !bestMovieRef.url) {
      throw new Error("Aucun film trouvé pour le meilleur film.");
    }
    const bestMovieData = await bestMovieFromUrl(bestMovieRef.url);
    const bestMovie = createMovieModel(bestMovieData);
    setBestMovie(bestMovie);

    const bestMovieButton = document.querySelector("#best-movie .open-modal");
    if (bestMovieButton) {
      bestMovieButton.addEventListener("click", () => {
        fillModalContent(bestMovie);
        openModal();
      });
    }
  } catch (error) {
    console.error("Erreur lors du chargement du meilleur film : ", error);
    alert("Erreur lors du chargement du meilleur film.");
  }

  // Setting the Other Best Movies Section
  try {
    let bestMoviesRawData = await fetchTheAmountOfPagesRequired(bestImdbMoviesUrl, 2);
    let bestMoviesIds = extractMoviesIdsFromData(bestMoviesRawData);
    let bestMoviesSelection = await getMoviesFromIDs(bestMoviesIds);
    let sixBestMovies = bestMoviesSelection.slice(1, 7);
    setCategoryMovies(sixBestMovies, "other-best-movies");
  } catch (error) {
    console.error("Erreur lors du chargement des autres meilleurs films IMDB\n\t", error)
  }

  // Best French Movies from the 90s
  try {
    let frMoviesRawData = await fetchTheAmountOfPagesRequired(bestFrenchMoviesFromThe90sUrl, 2);
    let frMoviesIDs = extractMoviesIdsFromData(frMoviesRawData);
    let fr90sMovies = await getMoviesFromIDs(frMoviesIDs);
    let sixFrBest90sMovies = fr90sMovies.slice(0, 6);
    setCategoryMovies(sixFrBest90sMovies, "best-french-movies-from-the-90s");
  } catch (error) {
    console.error("ERREUR lors du chargement des meilleurs films français des 90s", error)
  }
    
  // Sci-Fi Section
  try {
    const sciFiMovies = await extractSixMoviesToDisplay(sciFiMoviesUrl);
    setCategoryMovies(sciFiMovies, "sci-fi");
  } catch (error) {
    console.error("Erreur lors du chargement des films par catégorie : ", error);
    alert("Erreur lors du chargement des films par catégorie.");
  }
  // Setting the modal functionnalities
  initModal();

  // Setting the dropdown menus & the default category section
  try {
    const genres = await getAllGenres();
    setCategoryDropdownButtons(genres);
    initCategoryDropdowns();
    loadDefaultCategory();
  } catch (error) {
    console.error("Erreur lors du chargement des genres : ", error);
    alert("Erreur lors du chargement des genres.");
  }

  // Fermeture du menu dropdown
  document.addEventListener("click", (event) => {
    document.querySelectorAll(".dropdown-content").forEach((dropdown) => {
      if (!dropdown.contains(event.target) && !dropdown.previousElementSibling.contains(event.target)) {
        dropdown.style.display = "none";
      }
    });
  });
  
  // Setting the toggle buttons
  initToggleBtns();

  // Waiting window setting: disappears when a category
  // is selected.
  const btns = document.querySelectorAll(".to-define-section .category-dropdown-button");
  const waitingWindow = document.querySelector(".waiting-window-container");

  btns.forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      if (waitingWindow) {
        waitingWindow.style.display = "none";
      }
    }
  });
});
