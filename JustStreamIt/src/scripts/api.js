import { moviesUrl, genresUrl, moviesByGenreFilter, sortByFilter, imdbScoreFilter, bestImdbMoviesUrl } from "./config.js"; 
import { createMovieModel } from "./models.js"; 

/**
 * This module manages all business logic related to resource requests 
 * and any manipulation of the OCMovies API.
 */

/**
 * Asynchronously fetches JSON data from the provided URL.
 */
export async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
    }
    return await response.json(); 
}

/**
 * Fetches the list of movies sorted in descending order by IMDB score.
 *
 * Uses the base movies URL with a query parameter for sorting.
 */
export async function getBestMoviesList() {
    const data = await fetchData(bestImdbMoviesUrl);
    if (!data || !data.results || data.results.length === 0) {
        throw new Error("Aucun film trouvé.");
    }
    return data;
}

/**
 * Fetches detailed information for a movie using its specific URL.
 */
export async function bestMovieFromUrl(bestMovieUrl) {
    return fetchData(bestMovieUrl);
}

/**
 * Extracts the URL for the next page from the paginated data.
 */
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

/**
 * Fetches all pages of results from the base URL.
 *
 * Iterates through the pages as long as a next page URL exists, fetching data from each page.
 */
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

/**
 * Fetches a specified number of pages of results from the provided URL.
 *
 * Iterates through the pages until the required number of pages is reached or pagination ends.
 */
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

/**
 * Extracts movie IDs from an object containing a list of movies.
 */

function extractMoviesIdsFromData(pagesData) {
    let ids = [];
    pagesData.forEach(page => {
      if (page.results && Array.isArray(page.results)) {
        page.results.forEach(movie => {
          if (movie && movie.id != null) {
            ids.push(movie.id.toString());
          }
        });
      }
    });
    return ids;
  }

/**
 * Retrieves movie details by their IDs and constructs an array of movie objects.
 *
 * For each provided ID, fetches the movie details and creates a movie model using createMovieModel.
 */
async function getMoviesFromIDs(moviesIDs, moviesList = []) {
    for (const id of moviesIDs) {
        try {
            const filmDetails = await fetchData(moviesUrl + id);
            const movie = createMovieModel(filmDetails);
            moviesList.push(movie);
        } catch (error) {
            console.log(`Erreur lors du listing des films de Science-Fiction : ${error}`);
        }
    }
    return moviesList;
}

/**
 * Extracts and returns a list of six movies to display from the provided URL.
 *
 * The function paginates through results, accumulating movies until six are collected.
 * For each movie, it fetches detailed data using the movie URL and creates a movie model with createMovieModel.
 */
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
              console.error(`Error fetching movie at ${movieRef.url}: ${err}`);
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

/**
 * Fetches a list of six movies for a given category, sorted by descending average vote.
 *
 * Constructs the query URL by encoding the category, then uses extractSixMoviesToDisplay to obtain the movies.
 */
export async function getMoviesByCategory(category) {
    const categoryUrl = moviesUrl + moviesByGenreFilter + category.toLowerCase() + "&" + sortByFilter + imdbScoreFilter;
    return await extractSixMoviesToDisplay(categoryUrl);
}

/**
 * Retrieves all available genres from the API.
 *
 * Uses fetchAllPages to fetch all pages of genres, then aggregates the results.
 */
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
    
