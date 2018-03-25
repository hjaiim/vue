#!/usr/bin/env node
var wget = require("node-wget");
var parseArgs = require('./parseArgs.js');
var path = require("path");
var destPath = path.join(__dirname, '../', parseArgs()[1]);

wget({
		url: parseArgs()[0],
		dest: destPath,
		timeout: 5000 // duration to wait for request fulfillment in milliseconds, default is 2 seconds
	},
	function (error, response, body)
	{
		if (error)
		{
			console.log('--- error:');
			console.log(error); // error encountered
		}
		// else {
		// 	console.log('--- headers:');
		// 	console.log(response.headers); // response headers
		// 	console.log('--- body:');
		// 	console.log(body); // content of package
		// }
	});
