const { Pool } = require("pg");

// Establish a new connection to the data source specified the connection string.
const pool = new Pool({connectionString: connectionString});


function getUserFromDb(id, callback) {
	console.log("Getting person from DB with id: " + id);

	// Set up the SQL that we will use for our query. Note that we can make
	// use of parameter placeholders just like with PHP's PDO.
	const sql = "SELECT id, name, pass FROM users WHERE id = $1::int;";

	// We now set up an array of all the parameters we will pass to fill the
	// placeholder spots we left in the query.
	const params = [id];

	// This runs the query, and then calls the provided anonymous callback function
	// with the results.
	pool.query(sql, params, function(err, result) {
		// If an error occurred...
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}

		// Log this to the console for debugging purposes.
		//console.log("Found result: " + JSON.stringify(result.rows));
		console.log("Result is: " + result);
		console.log(result);


		// When someone else called this function, they supplied the function
		// they wanted called when we were all done. Call that function now
		// and pass it the results.

		// (The first parameter is the error variable, so we will pass null.)
		callback(null, result.rows);
	});

}

function getUser(request, response) {
	// First get the person's id
	const id = "1";
	// TODO: We should really check here for a valid id before continuing on...
	// use a helper function to query the DB, and provide a callback for when it's done
	getUserFromDb(id, function(error, result) {
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
	getUserFromDb:getUserFromDb,
	getUser: getUser
};
