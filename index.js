const express = require( 'express' );
// const mongoose = require('./mongoose/mongoose');
const bodyParser = require( 'body-parser' );
const cors = require('cors')
// Load user route
const {payment} = require( './payment' );

/**
 * express.Router() creates modular, mountable route handlers
 * A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.
 */
const router = express.Router();

// Set app equal to the object returned by express();
const app = express();
app.use(cors())

/**
 * Configure the middleware.
 * bodyParser.json() returns a function that is passed as a param to app.use() as middleware
 * With the help of this method, we can now send JSON to our express application.
 */
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	next();
  });
app.use( '/api/bid/', payment );

// We export the router so that the server.js file can pick it up
module.exports = router;

// if ( process.env.NODE_ENV === 'production' ) {
// 	// Set a static folder
// 	app.use( express.static( 'client/build' ) );
// 	app.get( '*', ( req, res ) => res.sendFile( path.resolve( __dirname, 'client', 'build', 'index.html' ) ) );

// }

// Set up a port
const port = 4000;

app.listen( port, () => console.log( `Server running on port: ${port}` ) );