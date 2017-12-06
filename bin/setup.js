var Path = require("path");
var child = require('child_process');
var fileList;
var configArr;
var currConfig;
var ver = "";

var trace = function ()
{
	console.log.apply(console, arguments);
};

function entry()
{
	var args = parseArgs();
	exec(args.batFile, function ()
	{
		setTimeout(function(){process.exit(0);},1000);
		
	})
}

function exec($batFile,$callBack)
{
	$batFile = $batFile.replace(/\//, "\\");
	var f = child.execFileSync(process.cwd() + '\\' + $batFile,
		function (error, stdout, stderr)
		{
			if (error !== null)
			{
				trace('exec error: ' + error);
			}
			trace(stdout);
		});
	f.on('message',function(d){
		trace(d);
	})
	f.on("exit", function (code, d)
	{
		if($callBack)
		{
			$callBack();
		}
	})
}

/**
 * 获取外部调用的入参
 */
function parseArgs()
{
	var i = 0;
	var options = {};
	var args = process.argv.concat();
	args.splice(0, 2);
	if (args.length > 0)
	{
		options.batFile = args[0];
	}
	return options;
}

entry();