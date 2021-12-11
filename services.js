const fetch = require('node-fetch');



async function makeFetchCall(fetchType){
  let baseFetchUrl;
  if (fetchType === "upcoming-movies") {
    baseFetchUrl =  `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.THE_MOVIE_DB_KEY}&language=en-US&page=1`
    
  } else if(fetchType === "popular-movies") {
    baseFetchUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.THE_MOVIE_DB_KEY}&language=en-US&page=1`
  }
  else if(fetchType === "trending"){
    baseFetchUrl = `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.THE_MOVIE_DB_KEY}`
  }
  else if(fetchType === "popular-tv"){
    baseFetchUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.THE_MOVIE_DB_KEY}&language=en-US&page=1`
  }
  else if(fetchType === "top-rated-tv") {
    baseFetchUrl =`https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.THE_MOVIE_DB_KEY}&language=en-US&page=1`

  }

  let response = await fetch(baseFetchUrl);
  let json = await response.json();
  return json;
}


async function getElementDetails(mediaId, mediaType) {
  const movieDetailsUrl = `https://api.themoviedb.org/3/${mediaType}/${mediaId}?api_key=${process.env.THE_MOVIE_DB_KEY}&language=en-US&append_to_response=videos,images`
  let response = await fetch(movieDetailsUrl);
  let json = await response.json();
  return json;
}




module.exports = {
   getElementDetails, 
   makeFetchCall,
}