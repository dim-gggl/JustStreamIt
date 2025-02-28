import { moviesUrl, genresUrl } from "./config.js"; 
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
        console.error(`Problème lors de la pagination: urlData : ${urlData}`)
        return null;
    }
}

export async function fetchAllPages(baseUrl) { 
    let currentPage = baseUrl;
    const allData = [];
    let currentPageData = null;
    while (currentPage) {
        currentPageData = await fetchData(currentPage); 
        allData.push(currentPageData)
        currentPage = getNextPage(currentPageData);
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

async function getMoviesFromIDs(sciFiMoviesIDs, sciFiMoviesList = []) {
    for (const id of sciFiMoviesIDs) {
        try {
            const filmDetails = await fetchData(moviesUrl + id);
            const sciFiMovie = createMovieModel(filmDetails);
            sciFiMoviesList.push(sciFiMovie);
        } catch (error) {
            console.log(`Erreur lors du listing des films d'sciFis : ${error}`);
        }
    }
    return sciFiMoviesList;
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

export async function getMoviesByCategory(category) {
    const categoryUrl = moviesUrl + `?genre=${encodeURIComponent(category.toLowerCase())}&sort_by=-avg_vote`;
    return await extractSixMoviesToDisplay(categoryUrl);
}

export async function getAllGenres() {
    const pagesData = await fetchAllPages(genresUrl);
    const genres = [];
    pagesData.forEach(page => {
      if (page.results && Array.isArray(page.results)) {
        genres.push(...page.results);
      }
    });
    return genres;
}

export { extractMoviesIdsFromData, getMoviesFromIDs };
    
