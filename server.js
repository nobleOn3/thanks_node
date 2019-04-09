const express = require('express');
const app = express();
const path = require("path");
const userController = require("./controllers/userController.js");
require('dotenv').config();


// Following the "Single query" approach from: https://node-postgres.com/features/pooling#single-query

const { Pool } = require("pg"); // This is the postgres database connection module.

// This says to use the connection string from the environment variable, if it is there,
// otherwise, it will use a connection string that refers to a local postgres DB
const connectionString = process.env.DATABASE_URL || "postgres://gpgvbuxsetnqnz:41804631b41659a30ac35adb6c3db0063e6b2ab3faa94e46a530ccacf7d25e9d@ec2-54-221-201-212.compute-1.amazonaws.com:5432/ddfdrc7sg1bjtq?ssl=true";

// Establish a new connection to the data source specified the connection string.
const pool = new Pool({connectionString: connectionString});


app.set('port', (process.env.PORT || 5000));
app.use(express.static(path.join(__dirname + '/public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// This says that we want the function "getPerson" below to handle
// any requests that come to the /getPerson endpoint
app.get('/getUser', userController.getUser);
//app.post('/register', registerUser);

// Start the server running
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

//////model.js here/////
const dbConnectionString = process.env.DATABASE_URL;

