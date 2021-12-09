require('dotenv').config()
const express = require('express');
const mongoose = require("mongoose")
const app = express();

app.use(cors())
const port = process.env.PORT || process.env.STANDARD_PORT;

const databaseConnection = process.env.MONGO_DB_CONNECTION_STRING;
mongoose.connect(databaseConnection)

const userSchema = new mongoose.Schema({
    name: String,
    password: String
})

const User = mongoose.model("User", userSchema)

const user = new User({
    name: "Armando",
    password: "testagain",
})

user.save();


app.get('/testing_backend', (req, res) => {
    User.find(function(err, users){
        if(err){
            console.log(err);
        }
        else{
            console.log(users)
        }
    })
  
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.post('/testing_backend', (req, res) =>{
    const anotherUser = new User({
        name:"test2",
        password: "password2"
    })
    const anotherUser2 = new User({
        name:"test3",
        password: "password3"
    })
    User.insertMany([anotherUser, anotherUser2], function(err){
        if(err){
            console.log(err)
        }
        console.log("Successfully saved all the users to User DB")
    });

})

app.put('/testing_backend', (req, res) =>{
  User.updateOne({_id:"61b264478085a2d3ecd34811"},{name: "Armando Guardado"}, (err)=>{
      if (err) {
          console.log(err)
      }
      else{
          console.log("Sucessfully updated the document")
      }
  })

})

app.delete('/testing_backend', (req, res) =>{
    User.deleteOne({_id:"61b2647c8085a2d3ecd34815"}, (err) =>{
        if (err) {
            console.log(err)
        }
        else{
            console.log("You have deleted the following document with id: " + "61b2647c8085a2d3ecd34815")
        }
    } )

})




app.listen(port, () => console.log(`Listening on port ${port}`));
