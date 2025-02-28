export const requestHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*"
};

const apiDomain = "http://localhost:8000/api/v1/";
const moviesEndpoint = "titles/";
const genresEndpoint = "genres/";

export const moviesUrl = apiDomain + moviesEndpoint;
export const genresUrl = apiDomain + genresEndpoint;

const sciFiEndpoint = "?genre=sci-fi&sort_by=-avg_vote";
const biographyEndpoint = "?genre=biography&sort_by=-avg_vote";
export const sciFiMoviesUrl = moviesUrl + sciFiEndpoint;
export const biographyMoviesUrl = moviesUrl + biographyEndpoint;