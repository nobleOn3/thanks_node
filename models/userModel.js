const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL || "postgres://gpgvbuxsetnqnz:41804631b41659a30ac35adb6c3db0063e6b2ab3faa94e46a530ccacf7d25e9d@ec2-54-221-201-212.compute-1.amazonaws.com:5432/ddfdrc7sg1bjtq?ssl=true";

// Establish a new connection to the data source specified the connection string.
const pool = new Pool({connectionString: connectionString});

function getUserFromDb(id, callback) {
	console.log("Getting person from DB with id: " + id);

	// Set up the SQL that we will use for our query.
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

function addNewUser(name, pass, callback) {
	console.log(`Inserting user: ${ name } with pass ${ pass } into DB!`);

	const sql = "INSERT INTO users(name, pass) VALUES ($1::text, $2::text);";

	const params = [name, pass];

	pool.query(sql, params, function(err, result) {
		// If an error occurred...
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}

		console.log("Result is: " + result);
		console.log(result);

		callback(null, result.rows);
	});

	callback(results);
}

module.exports = {
	getUserFromDb:getUserFromDb,
	addNewUser:addNewUser
}