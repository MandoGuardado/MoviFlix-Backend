const fetch = require('node-fetch');
const { base } = require('./models/user');


async function getUpComingMovies() {
  const baseURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.THE_MOVIE_DB_KEY}&language=en-US&page=1`
  let response = await fetch(baseURL);
  let json = await response.json();
  return json;
}

async function getMovieDetails(movieId){

  const baseUrl = "https://image.tmdb.org/t/p/";
  const serachURL= `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.THE_MOVIE_DB_KEY}&language=en-US&append_to_response=videos,images`
  let response = await fetch(serachURL);
  let json = await response.json();

  let posterPathUrl = baseUrl.concat("w500",json.poster_path)
  let backDropPathUrl = baseUrl.concat("780",json.backdrop_path )


  return JSON
}


module.exports = {
  getUpComingMovies,getMovieDetails
}