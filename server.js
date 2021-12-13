require('dotenv').config()
const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose")
const User = require("./models/user")
const { makeFetchCall, getElementDetails } = require("./services");


const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const port = process.env.PORT || process.env.STANDARD_PORT;

const imageBaseUrl = "https://image.tmdb.org/t/p/";

//MOVIES
//upcoming-movies path
app.get('/movies/upcoming', async (req, res) => {
    const promises = []
    let json = await makeFetchCall("upcoming-movies");
    json.results.forEach(element => {
        promises.push(getElementDetails(element.id, "movie"))

    });

    Promise.all(promises).then(movieResult => {
        movieResult.forEach(movie => {
            movie.backdrop_path = imageBaseUrl.concat("w780", movie.backdrop_path)
            movie.poster_path = imageBaseUrl.concat("w500", movie.poster_path)
        })
        res.status(200).send({
            category: "Upcoming Movies",
            results: movieResult
        })
    })


});

//popular-movies path
app.get('/movies/popular', async (req, res) => {
    const promises = [];
    let json = await makeFetchCall("popular-movies");
    json.results.forEach(element => {
        promises.push(getElementDetails(element.id, "movie"))
    });
    Promise.all(promises).then(results => {
        results.forEach(item => {
            item.backdrop_path = imageBaseUrl.concat("w780", item.backdrop_path);
            item.poster_path = imageBaseUrl.concat("w500", item.poster_path)
        })
        res.status(200).send({
            category: "Popular Movies",
            results: results
        })
    })
})

app.get('/movies/now-playing', async (req, res) => {
    const promises = [];
    let json = await makeFetchCall("now-playing");
    json.results.forEach(element => {
        promises.push(getElementDetails(element.id, "movie"))
    });
    Promise.all(promises).then(results => {
        results.forEach(item => {
            item.backdrop_path = imageBaseUrl.concat("w780", item.backdrop_path);
            item.poster_path = imageBaseUrl.concat("w500", item.poster_path)
        })
        res.status(200).send({
            category: "Now Playing",
            results: results
        })
    })
})





//trending path
app.get('/trending', async (req, res) => {
    const promises = []
    let json = await makeFetchCall("trending");
    json.results.forEach(element => {
        promises.push(getElementDetails(element.id, element.media_type))

    });

    Promise.all(promises).then(trendingResult => {
        trendingResult.forEach(item => {
            item.backdrop_path = imageBaseUrl.concat("w780", item.backdrop_path)
            item.poster_path = imageBaseUrl.concat("w500", item.poster_path)
        })
        res.status(200).send({
            category: "Trending",
            results: trendingResult
        })
    })

})


//tv 
app.get('/tv/popular', async (req, res) => {
    const promises = []
    let json = await makeFetchCall("popular-tv");
    json.results.forEach(element => {
        promises.push(getElementDetails(element.id, "tv"))

    });

    Promise.all(promises).then(movieResult => {
        movieResult.forEach(movie => {
            movie.backdrop_path = imageBaseUrl.concat("w780", movie.backdrop_path)
            movie.poster_path = imageBaseUrl.concat("w500", movie.poster_path)
        })
        res.status(200).send({
            category: "Popular TV",
            results: movieResult,
        })
    })

})

app.get('/tv/top-rated', async (req, res) => {
    const promises = []
    let json = await makeFetchCall("top-rated-tv");
    json.results.forEach(element => {
        promises.push(getElementDetails(element.id, "tv"))

    });

    Promise.all(promises).then(movieResult => {
        movieResult.forEach(movie => {
            movie.backdrop_path = imageBaseUrl.concat("w780", movie.backdrop_path)
            movie.poster_path = imageBaseUrl.concat("w500", movie.poster_path)
        })
        res.status(200).send({
            category: "Top Rated Tv",
            results: movieResult
        })
    })
})

app.get('/tv/on-the-air', async (req, res) => {
    const promises = []
    let json = await makeFetchCall("on-the-air");
    json.results.forEach(element => {
        promises.push(getElementDetails(element.id, "tv"))

    });

    Promise.all(promises).then(movieResult => {
        movieResult.forEach(movie => {
            movie.backdrop_path = imageBaseUrl.concat("w780", movie.backdrop_path)
            movie.poster_path = imageBaseUrl.concat("w500", movie.poster_path)
        })
        res.status(200).send({
            category: "On the Air",
            results: movieResult
        })
    })
})



app.get('/db/movies/upcoming', async (req, res) => {

})



const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}


mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, options).then(() => {
    console.log("Database connection successfull");
    app.listen(port, () => console.log(`Listening on port ${port}`));

})

