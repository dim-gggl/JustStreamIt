export const requestHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
};

const apiDomain = "http://localhost:8000/api/v1/";
const moviesEndpoint = "titles/";
const genresEndpoint = "genres/";

export const moviesUrl = apiDomain + moviesEndpoint;
export const genresUrl = apiDomain + genresEndpoint;

const byGenre = "?genre_contains=";
const sortBy = "?sort_by=";