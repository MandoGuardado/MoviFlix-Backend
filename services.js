const fetch = require('node-fetch');
const { base } = require('./models/user');


async function getUpComingMovies() {
  const baseURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.THE_MOVIE_DB_KEY}&language=en-US&page=1`
  let response = await fetch(baseURL);
  let json = await response.json();
  return json;
}

async function getMovieDetails(movieId) {
  const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.THE_MOVIE_DB_KEY}&language=en-US&append_to_response=videos,images`
  let response = await fetch(movieDetailsUrl);
  let json = await response.json();
  return json;
}

async function getTrending() {
  const baseURL = `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.THE_MOVIE_DB_KEY}`
  let response = await fetch(baseURL);
  let json = await response.json();
  return json;
}


async function getTrendingDetails(mediaId, mediaType) {
  const movieDetailsUrl = `https://api.themoviedb.org/3/${mediaType}/${mediaId}?api_key=${process.env.THE_MOVIE_DB_KEY}&language=en-US&append_to_response=videos,images`
  let response = await fetch(movieDetailsUrl);
  let json = await response.json();
  return json;
}

async function getPopularMovies() {
  const baseURL = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.THE_MOVIE_DB_KEY}&language=en-US&page=1`
  let response = await fetch(baseURL);
  let json = await response.json();
  return json;
}


async function getElementDetails(mediaId, mediaType) {
  const movieDetailsUrl = `https://api.themoviedb.org/3/${mediaType}/${mediaId}?api_key=${process.env.THE_MOVIE_DB_KEY}&language=en-US&append_to_response=videos,images`
  let response = await fetch(movieDetailsUrl);
  let json = await response.json();
  return json;
}


async function getPopularTv() {
  const baseURL = `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.THE_MOVIE_DB_KEY}&language=en-US&page=1`
  let response = await fetch(baseURL);
  let json = await response.json();
  return json;
}

async function getTopRatedTv() {
  const baseURL = `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.THE_MOVIE_DB_KEY}&language=en-US&page=1`
  let response = await fetch(baseURL);
  let json = await response.json();
  return json;
}



module.exports = {
  getUpComingMovies, getMovieDetails, getTrendingDetails, getTrending, getPopularMovies, getElementDetails, getPopularTv, getLatestTv: getTopRatedTv 
}