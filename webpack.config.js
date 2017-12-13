var path = require('path')
var webpack = require('webpack');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var os = require('os');
var localIp;
var netList = os.networkInterfaces();

var platform = os.platform();
if (platform == "win32")
{
	netList = netList['本地连接']
}
else
{
	netList = netList['en0']
}

for (var i = 0; i < netList.length; i++)
{
	if (netList[i].family == 'IPv4')
	{
		localIp = netList[i].address; 
	}
}

module.exports = {
	devServer: {
		historyApiFallback: true,
		progress: true,
		port: 8085,
		host: '0.0.0.0',
  		proxy: {
//   			'/milky-tea/*': {
//   				target: 'http://t.hy.hwu5.com',
//  				changeOrigin: true,
//   				secure: false
//   			}
  		}
	},
	context: path.resolve(__dirname, './src'),
	entry: {
		"index": [
			'webpack/hot/dev-server',
			'webpack-dev-server/client?http://' + localIp + ':8085',
			'./main.js'
		]
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: '/',
		filename: './[name].js'
	},
	resolve: {
		alias: {
			'vue-router': 'vue-router/dist/vue-router.js',
			'vue': 'vue/dist/vue.js'
		}
	},
	resolveLoader: {
		root: path.join(__dirname, 'node_modules'),
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
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				loader: 'style!css'
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file',
				query: {
					name: 'images/[name].[ext]?[hash]',
					limit: 10000
				}
			},
			{
				test: /\.scss$/,
				loaders: ['style', 'css', 'sass']
			}
		]
	},
	devtool: '#eval-source-map',
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new OpenBrowserPlugin({url: 'http://' + localIp + ':8085'})
	]
}

if (process.env.NODE_ENV === 'production')
{
	for (var k in module.exports.entry)
	{
		var dataObj = module.exports.entry[k];
		if (Array.isArray(dataObj) && dataObj.length > 0)
		{
			module.exports.entry[k] = dataObj[dataObj.length - 1];
		}
	}

	module.exports.output.path = path.resolve(__dirname, './release');
	module.exports.output.publicPath = '/release/';
	module.exports.devServer = null;
	module.exports.devtool = '#source-map';
	// http://vue-loader.vuejs.org/en/workflow/production.html
	module.exports.plugins = [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.optimize.OccurenceOrderPlugin()
	]
}
