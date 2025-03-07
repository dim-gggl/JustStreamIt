export const requestHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*"
};

const apiDomain = "http://localhost:8000/api/v1/";
const moviesEndpoint = "titles/";
const genresEndpoint = "genres/";
export const moviesByGenreFilter = "?genre="
export const sortByFilter = "sort_by="
export const imdbScoreFilter = "-imdb_score"

export const moviesUrl = apiDomain + moviesEndpoint;
export const genresUrl = apiDomain + genresEndpoint;

const sciFiEndpoint = moviesByGenreFilter + "sci-fi" + "&" + sortByFilter + imdbScoreFilter;
const biographyEndpoint = moviesByGenreFilter + "biography" + "&" + sortByFilter + imdbScoreFilter;
export const sciFiMoviesUrl = moviesUrl + sciFiEndpoint;
export const biographyMoviesUrl = moviesUrl + biographyEndpoint;