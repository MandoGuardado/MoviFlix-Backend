const fetch = require('node-fetch');
const { base } = require('./models/user');


async function getUpComingMovies() {
  const baseURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.THE_MOVIE_DB_KEY}&language=en-US&page=1`
  let response = await fetch(baseURL);
  let json = await response.json();
  return json;
}

async function getMovieDetails(movieId){
  const movieDetailsUrl= `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.THE_MOVIE_DB_KEY}&language=en-US&append_to_response=videos,images`
  let response = await fetch(movieDetailsUrl);
  let json = await response.json();
  return json;
}


module.exports = {
  getUpComingMovies,getMovieDetails
}