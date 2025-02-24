import { moviesUrl } from "./config.js";
import { createMovieModel } from "./models.js";

async function startApi() {
    try {
        const response = await fetch(moviesUrl, { method: "GET" });
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return true;
    } catch (error) {
        console.error("Erreur dans startApi :", error);
        throw error;
    }
}

async function getBestMoviesList() {
    const response = await fetch(`${moviesUrl}?sort_by=-imdb_score`);
    if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
    }
    const bestMoviesList = await response.json();
    if (!bestMoviesList || !bestMoviesList.results || bestMoviesList.results.length === 0) {
        throw new Error("Erreur avec les ressources : aucun film trouvé.");
    }
    return bestMoviesList;
}

async function bestMovieFromUrl(bestMovieUrl) {
    const response = await fetch(bestMovieUrl);
    if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
    } 
    return await response.json();
}

function setBestMovie(bestMovie) {
    const bestMovieImage = document.getElementById("best-movie-img");
    const bestMovieTitle = document.getElementById("best-movie-title");
    const bestMovieDescription = document.querySelector(".best-movie-container p");

    if (!bestMovieImage || !bestMovieTitle || !bestMovieDescription) {
        alert("Éléments du DOM non trouvés.");
        return;
    }
    bestMovieImage.src = bestMovie.image_url;
    bestMovieImage.alt = bestMovie.title;
    bestMovieTitle.innerText = bestMovie.title;
    bestMovieDescription.innerText = bestMovie.description || "Description non disponible";
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const bestMoviesList = await getBestMoviesList();
        const bestMovieRef = bestMoviesList.results[0];
        if (!bestMovieRef || !bestMovieRef.url) {
            throw new Error("Aucun film trouvé dans les résultats.");
        }
        const bestMovieUrl = bestMovieRef.url;
        const bestMovieData = await bestMovieFromUrl(bestMovieUrl);
        const bestMovie = createMovieModel(bestMovieData);
        setBestMovie(bestMovie);
    } catch (error) {
        console.error("Erreur lors du chargement du meilleur film :", error);
        alert("Une erreur s'est produite lors du chargement du meilleur film.");
    }
});
