const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[contenthash].js',
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
					{
						loader: MiniCSSExtractPlugin.loader
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