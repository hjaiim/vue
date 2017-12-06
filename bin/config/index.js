// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');
var merge = require('webpack-merge');

var base_config = {
	env: {NODE_ENV: '"development"'},
	assetsDir: 'static',
	assetsPublicPath: '/',
	sourceMap: false,
	compress: null
}

var dev = merge(base_config, {
	port: 8080,
	proxyTable: {}
});

var build = merge(base_config, {
	env: {NODE_ENV: '"production"'},
	index: path.resolve(__dirname, '../../dist/index.html'),
	assetsRoot: path.resolve(__dirname, '../../dist'),
	sourceMap: true,
	compress: ['js', 'css'],
});

var package = merge(build,
	{})

module.exports = {
	dev: dev,
	build: build,
	package: package
};
