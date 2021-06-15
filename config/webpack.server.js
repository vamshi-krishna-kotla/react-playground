const path = require('path');

/**
 * this webpack configuration is to support bundling on the server-side
 * as we are working with ES6 imports and other new JS syntaxes, we
 * need support for transpiling and as SSR is enabled on the server, we
 * need to deal with the React code
 * 
 * for more refs visit the client side webpack configuration file
 */

module.exports = (env) => {
	return {
		entry: {
			'www': './server/app.js'
		},
		output: {
			path: path.resolve(__dirname, '../', '.bin'),
			filename: '[name]',
			clean: true
		},
		target: "node",
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: [
						{
							loader: 'babel-loader',
						}
					]
				},
				/**
				 * files other than JS are scanned while building the server JS
				 * 
				 * to support these format so that the bundling of server doesn't break
				 * we added these rules
				 */
				{
					test: /\.scss$/,
					/**
					 * ignore bundling CSS code for server
					 */
					use: 'ignore-loader'
				},
				{
					test: /\.png/,
					use: {
						/**
						 * images are expected to be bundled on server-side and client-side
						 * 
						 * this is required as the React components are set for SSR
						 * 
						 * removing the bundling from either side is causing issue
						 * with the images to render on the browser
						 */
						loader: 'file-loader',
						options: {
							name: env.dev ? 'images/[name].[ext]' : 'images/[contenthash].[ext]'
						}
					}
				}
			]
		},
	};
}