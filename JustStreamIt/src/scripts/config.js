export const requestHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*"
};

const apiDomain = "http://localhost:8000/api/v1/";
const moviesEndpoint = "titles/";
const genresEndpoint = "genres/";

export const moviesUrl = apiDomain + moviesEndpoint;
export const genresUrl = apiDomain + genresEndpoint;

const animEndpoint = "?genre=animation&sort_by=-avg_vote";
const biographyEndpoint = "?genre=biography&sort_by=-avg_vote";
export const animationMoviesUrl = moviesUrl + animEndpoint;
export const biographyMoviesUrl = moviesUrl + biographyEndpoint;
