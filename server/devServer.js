const express = require('express');
const webpack = require('webpack');
const { fs } = require('memfs');

const path = require('path');

const app = express();

const webpackConfigFunction = require('../webpack.config');

const clientConfig = webpackConfigFunction({ dev: true, BUILD_ENV: 'client' });

const compiler = webpack(clientConfig);
compiler.outputFileSystem = fs;

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

app.get('/scripts/:file', (req, res) => {
	fs.readFile(path.resolve(__dirname, '../dist/scripts/'+req.params.file), 'utf8', (err, data) => {
		if (err) {
			res.status(500).send(err).end();
		}
		else {
			res.send(data);
		}
	});
});

app.get('/images/:file', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../src/images/'+req.params.file))
});

app.get('/*/scripts/:file', (req, res) => {
	fs.readFile(path.resolve(__dirname, '../dist/scripts/'+req.params.file), 'utf8', (err, data) => {
		if (err) {
			res.status(500).send(err).end();
		}
		else {
			res.send(data);
		}
	});
});

app.get('/*/images/:file', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../src/images/'+req.params.file))
});

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

app.listen(3000, () => {
	console.log('Dev server running on http://localhost:3000');
});

// process.on('exit', function () {
// 	watcher.close(() => {
// 		console.log('Watcher closed');
// 	});
// });