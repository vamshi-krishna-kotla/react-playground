/**
 * this is the development server where the client-side code is
 * compiled immediately when the files' content changes
 * 
 * a reload is required on the frontend to load the new updated files
 * (hot module replacement is not enabled yet)
 */

// require the needed modules
const express = require('express');
const webpack = require('webpack');
const path = require('path');

/**
 * memory file-system to read and write like files in memory instead of actual files
 * 
 * helps in avoiding creating and writing into file unnecessarily
 */
const { fs } = require('memfs');

// instantiate server object
const app = express();

// read webpack config function
const webpackConfigFunction = require('../webpack.config');

// generate client-side development webpack configuration
const clientConfig = webpackConfigFunction({ dev: true, BUILD_ENV: 'client' });

// instantiate webpack compiler object
const compiler = webpack(clientConfig);

// set the file-system for the compiler as the memfs instance
compiler.outputFileSystem = fs;

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

/**
 * 
 * @param {Object} req request object from client
 * @param {Object} res response object to client
 * 
 * handler function to send output files that include
 * - compiled JS file that have embedded CSS in them (using style-loader for dev env)
 * - static images
 */
const responseFunction = (req, res) => {
	/**
	 * we are sending the bundled JS file from memfs for scripts
	 * but sending the images directly from the src folder as images are not compiled
	 * and need to be sent as files directly
	 */
	if (req.path.indexOf('/scripts') > -1) {
		console.log(req.path);
		fs.readFile(path.resolve(__dirname, '../dist/scripts/' + req.params.file), 'utf8', (err, data) => {
			if (err) {
				res.status(500).send(err).end();
			}
			else {
				res.send(data);
			}
		});
	}
	else if (req.path.indexOf('/images') > -1) {
		res.sendFile(path.resolve(__dirname, '../src/images/' + req.params.file))
	}
};

// possible routes available to fetch scripts and images
const routes = [
	'/scripts/:file',
	'/*/scripts/:file',
	'/images/:file',
	'/*/images/:file'
];

// set the handler up for webpack output
routes.forEach(route => {
	app.get(route, responseFunction);
});

// route to send modules HTML file
app.get(/^\/modules(\/[a-z]*)?([^\/])?$/, (req, res) => {
	fs.readFile(path.resolve(__dirname, '../dist/modules.html'), 'utf8', (err, data) => {
		if (err) {
			res.status(500).send(err).end();
		}
		else {
			res.send(data);
		}
	});
});

// route to send projects HTML file
app.get(/^\/projects(\/[a-z]*)?([^\/])?$/, (req, res) => {
	fs.readFile(path.resolve(__dirname, '../dist/projects.html'), 'utf8', (err, data) => {
		if (err) {
			res.status(500).send(err).end();
		}
		else {
			res.send(data);
		}
	})
});

// start the server
app.listen(3000, () => {
	console.log('Dev server running on http://localhost:3000');
});