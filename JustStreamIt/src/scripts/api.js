import { moviesUrl } from "./config.js"; 
import { createMovieModel } from "./models.js"; 


export async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
    }
    return await response.json(); 
}

export async function getBestMoviesList() {
    const url = `${moviesUrl}?sort_by=-imdb_score`;
    const data = await fetchData(url);
    if (!data || !data.results || data.results.length === 0) {
        throw new Error("Aucun film trouvé.");
    }
    return data;
}

export async function bestMovieFromUrl(bestMovieUrl) {
    return fetchData(bestMovieUrl);
}

export function getNextPage(urlData) {
    try {
        let nextURL = urlData.next;
        if (nextURL) {
            return nextURL;
        }
        console.log("Pagination terminée");
        return null; 
    } catch (error) {
        return null;
    }
}

export async function fetchAllPages(baseUrl) { 
    let nextUrl = baseUrl;
    const allData = [];
    while (nextUrl) {
        const urlData = await fetchData(nextUrl); 
        allData.push(urlData)
        nextUrl = getNextPage(urlData);
    } 
    return allData;
}

export async function fetchTheAmountOfPagesRequired(url, numberOfPages) {
    let nextUrl = url;
    const pagesData = [];
    let count = 0;

    while (nextUrl && count < numberOfPages) {
        const data = await fetchData(nextUrl);
        pagesData.push(data);
        nextUrl = getNextPage(data);
        count++;
    }
    return pagesData;
}

function extractMoviesIdsFromData(dataList) {
    const moviesIDs = [];
    try {
        for (const film of dataList.results) {
            moviesIDs.push(film.id);
        }
    } catch (error) {
        console.log(`Erreur lors de l'extraction des ID : ${error}`);
    }
    return moviesIDs;
}

async function getMoviesFromIDs(animationMoviesIDs, animationMoviesList = []) {
    for (const id of animationMoviesIDs) {
        try {
            const filmDetails = await fetchData(moviesUrl + id);
            const animationMovie = createMovieModel(filmDetails);
            animationMoviesList.push(animationMovie);
        } catch (error) {
            console.log(`Erreur lors du listing des films d'animations : ${error}`);
        }
    }
    return animationMoviesList;
}

export async function extractSixMoviesToDisplay(url) {
    let movies = [];
    let currentUrl = url;
    while (movies.length < 6 && currentUrl) {
      const pageData = await fetchData(currentUrl);
      if (pageData && pageData.results && pageData.results.length > 0) {
        const moviesFromPage = await Promise.all(
          pageData.results.map(async (movieRef) => {
            try {
              const details = await fetchData(movieRef.url);
              return createMovieModel(details);
            } catch (err) {
              console.error(`Erreur lors du fetch du film ${movieRef.url}: ${err}`);
              return null;
            }
          })
        );
        movies.push(...moviesFromPage.filter(m => m));
      }
      currentUrl = getNextPage(pageData);
    }
    return movies.slice(0, 6);
  }

export { extractMoviesIdsFromData, getMoviesFromIDs };
    
