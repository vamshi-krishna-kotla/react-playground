const path = require('path');

/**
 * required webpack plugins
 */
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

/**
 * 
 * @param {*} env : passed from webpack command from terminal
 * 
 * the parent webpack.config.js calls with the env variables
 * that it gets from terminal
 */
module.exports = (env) => {
	return {
		/**
		 * enable multiple entries and respective build outputs
		 */
		entry: {
			/**
			 * entry paths are hardcoded and need not be relative
			 * to the current 'config' directory as these will be considered
			 * as they are from the root webpack.config.js
			 */
			'modules': './src/modules/index.js',
			'projects': './src/projects/index.js'
		},
		output: {
			/**
			 * cannot hardcode the output path as it takes the
			 * entire path to the target folder via the 'path'
			 * dependency
			 * 
			 * this needs to be pointing to the root directory
			 * and hence is relative from the current directory
			 */
			path: path.resolve(__dirname, '../', 'dist'),
			/**
			 * generate contenthash only on production mode
			 */
			filename: env.dev ? 'scripts/[name].js' : 'scripts/[name].[contenthash].js',
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
					/**
					 * 
					 * @param {Object} param0 as 'resource
					 * destructuring the 'resource' key from the config object
					 * as it is used for setting further loader configuration
					 * 
					 * @returns appropriate loader configuration object
					 * with options that work for CSS modules and direct CSS imports
					 * 
					 */
					use: ({resource}) => {
						let isCssModuleFile = /.*\.module\.scss$/.test(resource);

						return [
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
							{
								loader: env.dev ? 'style-loader' : MiniCSSExtractPlugin.loader,
							},
							/**
							 * flag that is set based on the (SCSS) file, if it is
							 * a '<name>.module.scss' or '<name>.scss', based on the usage for
							 * CSS modules
							 */
							{
								loader: 'css-loader',
								/**
								 * we are using a function to return the loader configuration
								 * hence we need a unique identification for the "options" object
								 * which is passed to the loader
								 * this has to be passed to the "ident" key
								 * i.e., { loader, options, ident } have to be used
								 *  
								 * ref. links
								 * https://github.com/webpack/webpack/issues/8952#issuecomment-651269205
								 * https://webpack.js.org/configuration/module/#useentry
								 * 
								 * setting a different "ident" value based on the 'isCssModuleFile' flag
								 * as the "ident" key should be unique for each set of options
								 */
								ident: isCssModuleFile ? 'css_module' : 'non_css_module',
								/**
								 * conditionally setting the options object based on the 'isCssModuleFile' flag
								 * appropriate options are passed for files used for CSS modules
								 */
								options: isCssModuleFile ? {
									modules: {
										/**
										 * specify the format of identifiers (classNames or IDs)
										 * 
										 * <name-of-file>__<className>__<base64-number-with-specified-digits>
										 * e.g.: .Info-module__info___1ClHo
										 * 
										 * if not mentioned then a random hash will be generated
										 */
										localIdentName: env.dev ? '[name]__[local]___[hash:base64:5]' : '[hash:base64:7]'
									}
								} : {}
							},
							'sass-loader'
						]
					}
				},
				{
					test: /\.png/,
					use: {
						loader: 'file-loader',
						options: {
							/**
							 * use contenthash for referencing images on production mode
							 */
							name: env.dev ? 'images/[name].[ext]' : 'images/[contenthash].[ext]'
						}
					}
				}
			]
		},
		plugins: [
			new MiniCSSExtractPlugin({
				filename: 'styles/[name].[contenthash].css',
			}),
			/**
			 * ref: https://github.com/jantimon/html-webpack-plugin#options
			 */
			// generate HTML for 'modules' and include required chunks
			new HTMLWebpackPlugin({
				minify: false,
				template: './index.html',
				/**
				 * appends hash for query param to the script and style files
				 * in the final HTML
				 * useful for cache busting
				 *
				 */
				// hash: true
				chunks: ['modules'],
				filename: 'modules.html'
			}),
			// generate HTML for 'projects' and include required chunks
			new HTMLWebpackPlugin({
				minify: false,
				template: './index.html',
				chunks: ['projects'],
				filename: 'projects.html'
			})
		],
		/**
		 * configurations for webpack-dev-server
		 */
		devServer: {
			port: 8000,
			historyApiFallback: {
				rewrites: [
					{ from: /^\/modules/, to: '/modules.html' },
					{ from: /^\/projects/, to: '/projects.html' },
				]
			},
		},
	};
}
