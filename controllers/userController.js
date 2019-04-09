const userModel = require("../models/userModel.js");

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

module.exports = {
	getUser: getUser
};
