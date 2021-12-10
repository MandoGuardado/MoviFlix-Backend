const fetch = require('node-fetch');


async function getUpComingMovies() {
  const baseURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.THE_MOVIE_DB_KEY}&language=en-US&page=1`
  let response = await fetch(baseURL);
  let json = await response.json();
  return json;
}


module.exports = {
  getUpComingMovies
}