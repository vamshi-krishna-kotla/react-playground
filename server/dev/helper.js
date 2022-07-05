// require the needed modules
const path = require('path');

/**
 * memory file-system to read and write like files in memory instead of actual files
 * 
 * helps in avoiding creating and writing into file unnecessarily
 */
const { fs } = require('memfs');


// possible routes available to fetch scripts and images
module.exports.routes = [
	'/scripts/:file',
	'/*/scripts/:file',
	'/images/:file',
	'/*/images/:file'
];

/**
 * 
 * @param {Object} req request object from client
 * @param {Object} res response object to client
 * 
 * handler function to send output files that include
 * - compiled JS file that have embedded CSS in them (using style-loader for dev env)
 * - static images
 */
module.exports.responseFunction = (req, res) => {
	/**
	 * we are sending the bundled JS file from memfs for scripts
	 * but sending the images directly from the src folder as images are not compiled
	 * and need to be sent as files directly
	 */
	if (req.path.indexOf('/scripts') > -1) {
		fs.readFile(path.resolve(__dirname, '../../dist/scripts/' + req.params.file), 'utf8', (err, data) => {
			if (err) {
				res.status(500).send(err).end();
			}
			else {
				res.send(data);
			}
		});
	}
	else if (req.path.indexOf('/images') > -1) {
		res.sendFile(path.resolve(__dirname, '../../src/images/' + req.params.file));
	}
};
