/**
 * the express app to create a http server to serve the application
 * 
 */

// require the needed modules
const path = require('path');
const express = require('express');

/**
 * memory file-system to read and write like files
 * works with memory instead of using actual files
 * 
 * helps to avoid creating and writing into files unnecessarily
 */
const { fs } = require('memfs');

// instantiate server object
const app = express();

/**
 * @note using route configuration from /server/prod/index.js
 */

// route to send 'modules' HTML file
app.get(/^\/modules((\/[a-z \-]*)?([\/])?)*$/i, (req, res) => {
	fs.readFile(path.resolve(__dirname, '../../dist/modules.html'), 'utf8', (err, data) => {
		if (err) {
			res.status(500).send(err).end();
		}
		else {
			res.send(data);
		}
	});
});

// route to send 'projects' HTML file
app.get(/^\/projects((\/[a-z \-]*)?([\/])?)*$/i, (req, res) => {
	fs.readFile(path.resolve(__dirname, '../../dist/projects.html'), 'utf8', (err, data) => {
		if (err) {
			res.status(500).send(err).end();
		}
		else {
			res.send(data);
		}
	})
});

// export the express server
module.exports.app = app;
