var path = require('path')
var webpack = require('webpack');
var CompressionWebpackPlugin = require('compression-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var projectRoot = path.resolve(__dirname, './src')

var cssLoaderConf = {
	sourceMap: false,
	extract: true
};

module.exports = {
	context: path.resolve(__dirname, './src'),
	entry: {
		"index": './main.js'
	},
	output: {
		path: path.resolve(__dirname, OUTPUT_PATH),
		publicPath: './',
		filename: '[name].js',
		chunkFilename: '[id].js'
	},
// 	resolve: {
// 		alias: {
// 			'vue-router': 'vue-router/dist/vue-router.js',
// 			'vue': 'vue/dist/vue.js'
// 		}
// 	},

	resolve: {
		extensions: ['', '.js', '.vue'],
		fallback: [path.join(__dirname, './node_modules')],
		alias: {
			'vue': 'vue/dist/vue.js',
			'src': path.resolve(__dirname, './src'),
			'components': path.resolve(__dirname, './src/components')
		}
	},

	resolveLoader: {
		fallback: path.join(__dirname, './node_modules'),
	},

	vue: {
		loaders: cssLoaders(cssLoaderConf),
//		loaders:{"scss":ExtractTextPlugin.extract('vue-style-loader', "css-loader!scss-loader")},
		postcss: [
			require('autoprefixer')({
				browsers: ['last 5 versions', 'ie>=9']
			})
		]
	},

	module: {
		loaders: [
			{
				test: /\.vue$/,
				loader: 'vue'
			},
			{
				test: /\.js$/,
				loader: 'babel',
				include: projectRoot,
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file',
				query: {
					name: '../assets/images/[name].[ext]',
					limit: 10000
				}
			}
			, styleLoaders(cssLoaderConf)
		]
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.DefinePlugin({
			'process.env': "production"
		}),
// 		new ExtractTextPlugin(path.resolve(__dirname, './release/[name].[contenthash].css')),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: function (module, count)
			{
				return (
					module.resource &&
					/\.js$/.test(module.resource) &&
					module.resource.indexOf(
						path.join(__dirname, './node_modules')
					) === 0
				)
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest',
			chunks: ['vendor']
		}),
		new ExtractTextPlugin('css/[name].css'),
		new HtmlWebpackPlugin({
			filename: path.resolve(__dirname, OUTPUT_PATH + '/index.html'),
			template: path.resolve(__dirname, TEMPLATE_PATH + 'index_package.html'),
			inject: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true
			},
			chunksSortMode: 'dependency'
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new CompressionWebpackPlugin({
			asset: '[path].gz[query]',
			algorithm: 'gzip',
			test: /\.([js|css])$/,
			threshold: 10240,
			minRatio: 0.8
		})
	]
}

function cssLoaders(options)
{
	options = options || {}
	function generateLoaders(loaders)
	{
		var sourceLoader = loaders.map(function (loader)
		{
			var extraParamChar
			if (/\?/.test(loader))
			{
				loader = loader.replace(/\?/, '-loader?')
				extraParamChar = '&'
			}
			else
			{
				loader = loader + '-loader'
				extraParamChar = '?'
			}
			return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
		}).join('!')

		if (options.extract)
		{
			return ExtractTextPlugin.extract('vue-style-loader', sourceLoader)
		}
		else
		{
			return ['vue-style-loader', sourceLoader].join('!')
		}
	}

	return {
		css: generateLoaders(['css']),
		postcss: generateLoaders(['css']),
		less: generateLoaders(['css', 'less']),
		sass: generateLoaders(['css', 'sass']),
		scss: generateLoaders(['css', 'scss']),
		stylus: generateLoaders(['css', 'stylus']),
		styl: generateLoaders(['css', 'stylus'])
	}
}

function styleLoaders(options)
{
	var output = []
	var loaders = cssLoaders(options)
	for (var extension in loaders)
	{
		var loader = loaders[extension]
		output.push({
			test: new RegExp('\\.' + extension + '$'),
			loader: loader
		})
	}
	return output
}