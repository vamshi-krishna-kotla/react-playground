
/**
 * @todo THE CLIENT BUILD IS EXPECTED TO BE COMPLETED BEFORE RUNNING THE SERVER
 */

/**
 * required server-side dependencies
 */
import express from 'express';
import path from 'path';
import fs from 'fs';

/**
 * React (client-side) support dependencies
 */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

/**
 * import and rename the default exports from respective target React Components
 */
import { default as ModulesApp } from '../../src/modules/App.jsx';
import { default as ProjectsApp } from '../../src/projects/App.jsx';

/**
 * enable express server
 */
const app = express();

/**
 * support JSON format for data exchange
 */
app.use(express.json());

/**
 * serve static assets from 'dist' folder
 * which are generated after building client-side code
 * 
 * @note using regex to serve static assets as each route has own configuration
 * and the static assets need to be served for all routes
 */
app.use(/\/([a-z]+)/,express.static(path.resolve(__dirname, '../dist')));

/**
 * enable GET route(s) to serve 'modules' App
 * 
 * @note regex for the routes that satisfy /modules and /modules/<route> paths
 */
app.get(/^\/modules(\/[a-z \-]*)?([^\/])?$/i, (req, res) => {
	fs.readFile(path.resolve(__dirname, '../dist/modules.html'), 'utf8', (err, data) => {
		if (err) {
			res.status(500).send(err).end();
		}
		else {
			/**
			 * enabling server-side rendering for modules path
			 * 
			 * @note we do not have any routing for modules yet
			 */
			var response = data.replace('<div id="root"></div>', `<div id="root">
			${renderToString(
				<StaticRouter location={req.url} >
					<ModulesApp />
				</StaticRouter>)
				}
			</div>`);
			res.send(response);
		}
	})
});

/**
 * enable GET route(s) to serve 'projects' App
 * 
 * @note regex for the routes that satisfy /projects and /projects/<route> paths
 */
app.get(/^\/projects(\/[a-z \-]*)?([^\/])?$/i, (req, res) => {
	fs.readFile(path.resolve(__dirname, '../dist/projects.html'), 'utf8', (err, data) => {
		if (err) {
			res.status(500).send(err).end();
		}
		else {
			var response = data.replace('<div id="root"></div>', `<div id="root">
			${renderToString(
				/**
				 * StaticRouter component should be the wrapper around the parent component
				 * sent for server-side rendering the HTML of the appilcation
				 * 
				 * This works hand-in-hand with BrowserRouter on client-side
				 * 
				 * StaticRouter configures the route which is required to render the
				 * relevant component for that route; BrowserRouter picks up this route
				 * from the client-side
				 */
				<StaticRouter location={req.url} >
					<ProjectsApp />
				</StaticRouter>)
				}
			</div>`);
			res.send(response);
		}
	})
});

/**
 * start the server on PORT 8080
 */
app.listen(8080, () => {
	console.log('Server started on http://localhost:8080/');
});
