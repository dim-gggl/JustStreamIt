import { createMovieModel } from "./models.js";

const requestHeaders = {
    mode: "cors",
    credentials: "include"
}

async function startApi() {
    let response = await fetch("http://localhost:8000/api/v1/titles/", requestHeaders);
    if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
    } else {
        let data = await response.json();
        console.log(data);
        return true
    }
}

async function rankMovies() {
    let response = await fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score", requestHeaders);
    if (response) {
        let ressources = await response.json();
        if (!ressources || ressources.length == 0) {
            console.log("Aucun film trouvé")
            return
        } else {
        console.log(`Infos du meilleur film ("0"): ${ressources.resultats["0"]}`)
        console.log(`Infos du Meilleur Film (0) : ${ressources.resultats[0]}`)
        let bestMovieDetails = ressources.resultats[0]
        return bestMovieDetails
    } 
}

document.addEventListener("DOMContentLoaded", async function() {
    let serverOpen = startApi()
    if (!serverOpen) {
        console.log("Impossible d'accéder aux ressources")
        return
    } else {
        let bestMovieInfo = rankMovies()
        console.dir(`Meilleur Film : ${bestMovieInfo.title}, réalisé par ${bestMovieInfo.director})
    }    
        })

/*
async function getBestMovie() {
    try {
        let response = await fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score");
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }
        let data = await response.json();  

        if (!data.results || data.results.length === 0) {
            throw new Error("Aucun film trouvé");
        }

        let bestMovie = createMovieModel(data["results"]["0"]);
        console.dir(bestMovie);
        return bestMovie;
    } catch (error) {
        console.error("Erreur lors de la récupération du meilleur film :", error.message);
        return null;
    }
}

function setBestMovie(bestMovie) {
    let bestMovieImage = document.querySelector("#best-movie-container img");
    bestMovieImage.src = ""
    let bestMovieTitle = document.getElementById("#best-movie-title");
    let bestMovieDescription = document.querySelector("#best-movie-container p");

    if (!bestMovieImage || !bestMovieTitle || !bestMovieDescription) {
        console.error("Éléments du DOM non trouvés.");
        return;
    }

    bestMovieImage.src = bestMovie.image_url;
    bestMovieImage.alt = bestMovie.title;
    bestMovieTitle.innerText = bestMovie.title;
    bestMovieDescription.innerText = bestMovie.description || "Description non disponible";   
}

document.addEventListener("DOMContentLoaded", async function() {
    startApi(); 
    let bestMovie = await getBestMovie();
    if (bestMovie) {
        setBestMovie(bestMovie);
    }
    