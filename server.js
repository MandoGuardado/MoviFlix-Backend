require('dotenv').config()
const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose")
const User = require("./models/user")
const { getUpComingMovies, getMovieDetails } = require("./services")


const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const port = process.env.PORT || process.env.STANDARD_PORT;


app.get('/testing_backend', async(req, res) => {
    const baseUrl = "https://image.tmdb.org/t/p/";
    let json = await getUpComingMovies();
   json.results.forEach(element => {
       element.backdrop_path = baseUrl.concat("w780",element.backdrop_path)
       element.poster_path = baseUrl.concat("w500",element.poster_path)
    });
    res.status(200).send(json);
});

app.get('/getImages' , async(req, res) =>{
    let json = await getMovieDetails(482321);
    res.status(200).send(json)

})

app.post('/testing_backend', (req, res) => {
    const user = new User({
        name: "Armando",
        password: "testagain",
    })

    user.save().then((err) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log('Item was successfully inserted to db.')
        }
    });

})

app.put('/testing_backend', (req, res) => {
    User.updateOne({ _id: "61b270ed2aee31f8ac3ed419" }, { name: "Armando Guardado" }, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log("Sucessfully updated the document")
        }
    })

})

app.delete('/testing_backend', (req, res) => {
    User.deleteOne({ _id: "61b270ed2aee31f8ac3ed419" }, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log("You have deleted the following document with id: " + "61b270ed2aee31f8ac3ed419")
        }
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

