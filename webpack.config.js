const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

/**
 * 
 * @param {*} env : passed from webpack command from terminal
 * 
 * ref: https://webpack.js.org/guides/environment-variables/
 * 
 * @returns the final webpack config object based on "--env" params
 */
module.exports = (env) => {
	return {
		entry: './src/index.js',
		output: {
			path: path.resolve(__dirname, 'dist'),
			/**
			 * generate contenthash only on production mode
			 */
			filename: env.dev ? '[name].js' : '[name].[contenthash].js',
			/**
			 * cleans the content of the output folder before new build
			 * without using webpack clean plugin
			 */
			clean: true
		},
		/**
		 * ref:
		 * https://stackoverflow.com/questions/54039337/how-to-remove-arrow-functions-from-webpack-output
		 *
		 * about target : https://webpack.js.org/blog/2020-10-10-webpack-5-release/#improved-target
		 */
		target: "es5", // specifies the target JS build grammar
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: [
						{
							/**
							 * takes the presets and plugins options from
							 * babel.config.js
							 */
							loader: 'babel-loader',
						}
					]
				},
				{
					test: /\.scss$/,
					use: [
						/**
						 * function to decide the final loader based on env
						 * 
						 * - use 'style-loader' to append styles to HTML
						 * 	using style tag (easy for dev)
						 * - use MiniCSSExtractPlugin to generate new CSS files
						 * 	for production
						 * 
						 * @returns certain required loader based on env
						 */
						() => {
							if(env.dev)
								return 'style-loader'

							return {
								loader: MiniCSSExtractPlugin.loader
							}
						},
						'css-loader',
						'sass-loader'
					]
				}
			]
		},
		plugins: [
			new MiniCSSExtractPlugin({
				filename: '[name].[contenthash].css',
			}),
			new HTMLWebpackPlugin({
				minify: false,
				template: './index.html',
				/**
				 * appends hash for query param to the script and style files
				 * in the final HTML
				 * useful for cache busting
				 *
				 * ref: https://github.com/jantimon/html-webpack-plugin#options
				 */
				// hash: true
			})
		]
	};
}