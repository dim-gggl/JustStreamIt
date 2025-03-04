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


function showLoader() {
  const loader = document.getElementById("loader-overlay");
  if (loader) {
    loader.style.display = "flex";
    loader.style.opacity = '1';
  }
}

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

async function loadDefaultCategory() {
  const defaultSection = document.querySelector(".selected-category:not(.user-selected)");
  if (defaultSection) {
    const button = defaultSection.querySelector(".category-list");
    const defaultCategory = "Comedy";
    button.textContent = defaultCategory;
    await loadCategoryMovies(defaultSection, defaultCategory, false);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
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

  try {
    const sciFiMovies = await extractSixMoviesToDisplay(sciFiMoviesUrl);
    const biographyMovies = await extractSixMoviesToDisplay(biographyMoviesUrl);
    setCategoryMovies(sciFiMovies, "sci-fi");
    setCategoryMovies(biographyMovies, "biography");
  } catch (error) {
    console.error("Erreur lors du chargement des films par catégorie : ", error);
    alert("Erreur lors du chargement des films par catégorie.");
  }
  initModal();

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

window.onload = function() {
  const loader = document.getElementById("loader-overlay");
  setTimeout(() => {
    loader.style.opacity = '0';
    setTimeout(() => {
       loader.style.display = "none";
    }, 6000);
  }, 10000); 
};