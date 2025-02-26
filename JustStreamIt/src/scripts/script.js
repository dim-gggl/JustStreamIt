import { 
  getBestMoviesList, 
  bestMovieFromUrl, 
  extractSixMoviesToDisplay
} from './api.js';
import { createMovieModel } from './models.js';
import { setBestMovie, setCategoryMovies } from './dom.js';
import { initModal, openModal, fillModalMainContent } from './modal.js';
import { animationMoviesUrl, biographyMoviesUrl } from './config.js';

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
        fillModalMainContent(bestMovie);
        openModal();
      });
    }
  } catch (error) {
    console.error("Erreur lors du chargement du meilleur film : ", error);
    alert("Erreur lors du chargement du meilleur film.");
  }

   // Loading films by category
  try {
    const animationMovies = await extractSixMoviesToDisplay(animationMoviesUrl);
    const biographyMovies = await extractSixMoviesToDisplay(biographyMoviesUrl);
    setCategoryMovies(animationMovies, "animation");
    setCategoryMovies(biographyMovies, "biography");
  } catch (error) {
    console.error("Erreur lors du chargement des films par catégorie : ", error);
    alert("Erreur lors du chargement des films par catégorie.");
  }
  initModal();
});
