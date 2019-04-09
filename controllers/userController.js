const userModel = require("../models/userModel.js");
// const express = require('express');
// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));

function getUser(request, response) {
	// First get the person's id
	const id = "1";
	// TODO: We should really check here for a valid id before continuing on...
	// use a helper function to query the DB, and provide a callback for when it's done
	userModel.getUserFromDb(id, function(error, result) {
		// This is the callback function that will be called when the DB is done.
		// The job here is just to send it back.

		// Make sure we got a row with the person, then prepare JSON to send back
		if (error || result == null || result.length != 1) {
			response.status(500).json({success: false, data: error});
		} else {
			const person = result[0];
			response.status(200).json(person);
		}
	});
}

function registerUser(request, response) {
	//insert a single user into the DB
    var name = request.body.username;
    var pass = request.body.password;

	userModel.addNewUser(name, pass, function(results) {
		//response.json(results);
		response.redirect('/home.html');
	});
}

function searchByColor(req, res) {
	var color = req.query.color;

	userModel.searchByColour(color, function(error, results) {
		res.json(results);
	});
}

function loginUser(req, res) {
	var name = req.body.username;
    var pass = req.body.password;

    userModel.login(name, pass, function(error, results) {
    	if(error == "User is not recognized") {
    	   res.redirect('/home.html');
    	}

    	else {
    		res.redirect('/login.html');
    	}
    });
}

module.exports = {
	getUser:getUser,
	registerUser:registerUser,
	searchByColor:searchByColor,
	loginUser:loginUser
};
