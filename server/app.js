
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

/**
 * import and rename the default exports from respective target React Components
 */
import { default as ModulesApp } from '../src/modules/App.jsx';
import { default as ProjectsApp } from '../src/projects/App.jsx';

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
 */
app.use(express.static(path.resolve(__dirname, '../dist')));

/**
 * enable GET route to serve 'modules' App
 */
app.get('/modules', (req, res) => {
	fs.readFile(path.resolve(__dirname, '../dist/modules.html'), 'utf8', (err, data) => {
		if(err) {
			res.status(500).send(err).end();
		}
		else {
			var response = data.replace('<div id="root"></div>',`<div id="root">${renderToString(<ModulesApp />)}</div>`);
			res.send(response);
		}
	})
});

/**
 * enable GET route to serve 'projects' App
 */
app.get('/projects', (req, res) => {
	fs.readFile(path.resolve(__dirname, '../dist/projects.html'), 'utf8', (err, data) => {
		if(err) {
			res.status(500).send(err).end();
		}
		else {
			var response = data.replace('<div id="root"></div>',`<div id="root">${renderToString(<ProjectsApp />)}</div>`);
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
