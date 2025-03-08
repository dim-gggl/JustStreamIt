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
export const minYearFilter = "min_year="
export const maxYearFilter = "max_year="
export const countryFilter = "country="
export const langFilter = "lang="

export const moviesUrl = apiDomain + moviesEndpoint;
export const genresUrl = apiDomain + genresEndpoint;

export const bestFrenchMoviesFromThe90sUrl = moviesUrl + "?" + minYearFilter + "1990&" + maxYearFilter + "2000&" + countryFilter + "france&" + langFilter + "french&" + sortByFilter + imdbScoreFilter;
const sciFiEndpoint = moviesByGenreFilter + "sci-fi" + "&" + sortByFilter + imdbScoreFilter;
const biographyEndpoint = moviesByGenreFilter + "biography" + "&" + sortByFilter + imdbScoreFilter;
export const sciFiMoviesUrl = moviesUrl + sciFiEndpoint;
export const biographyMoviesUrl = moviesUrl + biographyEndpoint;