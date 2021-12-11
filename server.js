require('dotenv').config()
const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose")
const User = require("./models/user")
const { getUpComingMovies, getMovieDetails, getTrending, getTrendingDetails,getPopularMovies, getElementDetails, getPopularTv, getLatestTv, getNowPlayingTv} = require("./services");
const { base } = require('./models/user');


const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const port = process.env.PORT || process.env.STANDARD_PORT;

//MOVIES
//upcoming-movies path
app.get('/upcoming-movies', async (req, res) => {
    const promises = []
    const baseUrl = "https://image.tmdb.org/t/p/";
    let json = await getUpComingMovies();
    json.results.forEach(element => {
        promises.push(getMovieDetails(element.id))

    });

    Promise.all(promises).then(movieResult => {
        movieResult.forEach(movie => {
            movie.backdrop_path = baseUrl.concat("w780", movie.backdrop_path)
            movie.poster_path = baseUrl.concat("w500", movie.poster_path)
        })
        res.status(200).send(movieResult)
    })


});

//popular-movies path
app.get('/popular-movies', async (req, res) =>{
    const promises =[];
    const baseUrl = "https://image.tmdb.org/t/p/";
    let json = await getPopularMovies();
    json.results.forEach(element =>{
        promises.push(getElementDetails(element.id, "movie"))
    });
    Promise.all(promises).then(results =>{
        results.forEach(item => {
            item.backdrop_path = baseUrl.concat("w780", item.backdrop_path);
            item.poster_path = baseUrl.concat("w500", item.poster_path)
        })
        res.status(200).send(results)
    })
}) 


//trending path
app.get('/trending', async (req, res) => {
    const promises = []
    const baseUrl = "https://image.tmdb.org/t/p/";
    let json = await getTrending();
    json.results.forEach(element => {
        promises.push(getTrendingDetails(element.id, element.media_type))

    });

    Promise.all(promises).then(trendingResult => {
        trendingResult.forEach(item => {
            item.backdrop_path = baseUrl.concat("w780", item.backdrop_path)
            item.poster_path = baseUrl.concat("w500", item.poster_path)
        })
        res.status(200).send(trendingResult)
    })

})


//tv 
app.get('/popular-tv', async (req, res) => {
    const promises = []
    const baseUrl = "https://image.tmdb.org/t/p/";
    let json = await getPopularTv();
    json.results.forEach(element => {
        promises.push(getElementDetails(element.id, "tv"))

    });

    Promise.all(promises).then(movieResult => {
        movieResult.forEach(movie => {
            movie.backdrop_path = baseUrl.concat("w780", movie.backdrop_path)
            movie.poster_path = baseUrl.concat("w500", movie.poster_path)
        })
        res.status(200).send(movieResult)
    })

})

app.get('/top-rated-tv', async (req, res) => {
    const promises = []
    const baseUrl = "https://image.tmdb.org/t/p/";
    let json = await getLatestTv();
    json.results.forEach(element => {
        promises.push(getElementDetails(element.id, "tv"))

    });

    Promise.all(promises).then(movieResult => {
        movieResult.forEach(movie => {
            movie.backdrop_path = baseUrl.concat("w780", movie.backdrop_path)
            movie.poster_path = baseUrl.concat("w500", movie.poster_path)
        })
        res.status(200).send(movieResult)
    })
})



const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}


mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, options).then(() => {
    console.log("Database connection successfull");
    app.listen(port, () => console.log(`Listening on port ${port}`));

})

