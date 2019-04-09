const express = require('express');
const app = express();
const path = require("path");
const userController = require("./controllers/userController.js");
require('dotenv').config();


app.set('port', (process.env.PORT || 5000));
app.use(express.static(path.join(__dirname + '/public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// This says that we want the function "getPerson" below to handle
// any requests that come to the /getPerson endpoint
app.get('/getUser', userController.getUser);
app.get('/search', userController.searchByColor);
app.post('/register', userController.registerUser);

// Start the server running
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
