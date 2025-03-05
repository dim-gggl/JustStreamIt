import { 
  getBestMoviesList, 
  bestMovieFromUrl, 
  extractSixMoviesToDisplay,
  getAllGenres} from './api.js';
import { createMovieModel } from './models.js';
import {
  setBestMovie,
  setCategoryDropdownButtons,
  setCategoryMovies,
  clearContainer,
  renderMovieBox
} from './dom.js';
import { initModal, openModal, fillModalContent } from './modal.js';
import { moviesUrl, sciFiMoviesUrl, biographyMoviesUrl } from './config.js';

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
      }, 10000);
    }, 6000);
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
    const categoryUrl = `${moviesUrl}?genre=${encodeURIComponent(categoryName.toLowerCase())}&sort_by=-avg_vote`;
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
    const button = dropdown.querySelector(".category-list");
    const options = dropdown.querySelectorAll(".dropdown-child a");
    
    options.forEach(option => {
      option.addEventListener("click", async (e) => {
        e.preventDefault();
        const selectedCategory = option.textContent.trim();
        button.textContent = selectedCategory;
        const section = dropdown.closest(".selected-category");
        await loadCategoryMovies(section, selectedCategory);
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
  const defaultSection = document.querySelector(".selected-category:not(.user-selected)");
  if (defaultSection) {
    const button = defaultSection.querySelector(".category-list");
    const defaultCategory = "Comedy";
    button.textContent = defaultCategory;
    await loadCategoryMovies(defaultSection, defaultCategory, false);
  }
}

/**
 * Initializes the application once the DOM content is fully loaded.
 *
 * - Fetching and displaying the best movie.
 * - Setting up the modal for the best movie.
 * - Loading movies for Sci-Fi and Biography categories.
 * - Initializing modal functionality.
 * - Fetching genres and initializing category dropdown menus.
 */
document.addEventListener("DOMContentLoaded", async () => {
  // Starts with the Best Movie section
  try {
    const bestMoviesData = await getBestMoviesList();
    const highestScore = bestMoviesData.results[0].imdb_score;
    const topRatedMovies = bestMoviesData.results.filter(movie => movie.imdb_score === highestScore);
    const randomIndex = Math.floor(Math.random() * topRatedMovies.length);
    const bestMovieRef = topRatedMovies[randomIndex];
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

  // Sci-Fi & Biography Sections
  try {
    const sciFiMovies = await extractSixMoviesToDisplay(sciFiMoviesUrl);
    const biographyMovies = await extractSixMoviesToDisplay(biographyMoviesUrl);
    setCategoryMovies(sciFiMovies, "sci-fi");
    setCategoryMovies(biographyMovies, "biography");
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
});


/**
 * Hides the loader overlay after the window has finished loading.
 *
 * Applies a fading effect by setting the opacity to "0" after a delay,
 * and then setting the display to "none" after an additional delay.
 */
window.onload = function() {
  const loader = document.getElementById("loader-overlay");
  setTimeout(() => {
    loader.style.opacity = '0';
    setTimeout(() => {
       loader.style.display = "none";
    }, 4000);
  }, 10000); 
};