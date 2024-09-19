/**
 * this is the development server where the client-side code is
 * compiled immediately when the files' content changes
 * 
 */

const { createServer } = require('http');
const { Server } = require('socket.io');

// require routes and handler for webpack output
const { routes, responseFunction } = require('./helper');

// require webpack compiler
const { compiler } = require('./compiler');

// require express server
const { app } = require('./server');

// require socket logic for communicaing realtime without HTTP
const setupSocketsLogic = require('../common/socket');

// read the port from environment variables else use default
const PORT = process.env.PORT || 8080;

// create instances of http to augment with socket server
const httpServer = createServer(app);
const io = new Server(httpServer);

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
		console.error(err);
	}
	else {
		console.log('watcher running');
		console.log(stats.toString({
			colors: true
		}));

		// emit an event to the client socket to reload the page when there are code updates
		io.emit('reload');
	}
});

// set the handler up for webpack output
routes.forEach(route => {
	app.get(route, responseFunction);
});

// apply socket logic to the server
setupSocketsLogic(io);

// start the server
httpServer.listen(PORT, () => {
	console.log(`Dev server running on http://localhost:${PORT}`);
});
