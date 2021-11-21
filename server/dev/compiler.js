/**
 * webpack compiler bundles the scripts from multiple files
 * and generates the final output based on given configuration
 * 
 */

// require the needed modules
const webpack = require('webpack');

/**
 * memory file-system to read and write like files in memory instead of actual files
 * 
 * helps in avoiding creating and writing into file unnecessarily
 */
const { fs } = require('memfs');


// read webpack config function
const webpackConfigFunction = require('../../webpack.config');

// generate client-side development webpack configuration
const clientConfig = webpackConfigFunction({ dev: true, BUILD_ENV: 'client' });

// instantiate webpack compiler object
const compiler = webpack(clientConfig);

// set the file-system for the compiler as the memfs instance
compiler.outputFileSystem = fs;

// export the webpack compiler
module.exports.compiler = compiler;
