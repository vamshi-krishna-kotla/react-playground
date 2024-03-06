/**
 * this is the development server where the client-side code is
 * compiled immediately when the files' content changes
 * 
 * @note a reload is required on the frontend to load the new updated files
 * 
 */

// require routes and handler for webpack output
const { routes, responseFunction } = require('./helper');

// require webpack compiler
const { compiler } = require('./compiler');

// require express server
const { app } = require('./server');

// read the port from environment variables else use default
const PORT = process.env.PORT || 8080;

/**
 * start webpack watcher
 * 
 * webpack watch will compile the webpack code everytime the content changes
 */
const watcher = compiler.watch({
	aggregateTimeout: 500,
	ignored: /node_modules/
}, (err, stats) => {
	if (err) {
		console.log(err);
	}
	else {
		console.log('watcher running');
		console.log(stats.toString({
			colors: true
		}));
	}
});

// set the handler up for webpack output
routes.forEach(route => {
	app.get(route, responseFunction);
});

// start the server
app.listen(PORT, () => {
	console.log(`Dev server running on http://localhost:${PORT}`);
});
