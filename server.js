require('dotenv').config()
const express = require('express'); 
const app = express();
const port = process.env.PORT || process.env.STANDARD_PORT; 



app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); 
});


app.listen(port, () => console.log(`Listening on port ${port}`));
