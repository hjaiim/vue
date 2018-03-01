// https://github.com/shelljs/shelljs
var File = require('./file');
var md5 = require("md5");
var uglify = require("uglify-js");
require('shelljs/global');
env.NODE_ENV = 'production';
var CleanCSS = require('clean-css');
var fs = require('fs');

var path = require('path');
var ora = require('ora');
var webpack = require('webpack');

global.LIBS_PATH = "./libs/";
global.TEMPLATE_PATH = "./template/";
global.BIN_VER_PATH = "./bin/ver/";
var dateVer = getDateVer(); //根据当前时间，生成日期版本号
global.FULL_VER = dateVer;
global.DATE_VER = dateVer;
global.TIME_VER = "";
//DATE_VER = FULL_VER.replace(",", "");
global.OUTPUT_PATH_ORIGIN = "./release";
global.OUTPUT_PATH = OUTPUT_PATH_ORIGIN + "/" + DATE_VER;
global.PAGE_TITLE = "";
global.SCRIPT_VER = "";
global.SCRIPT_LIBS = "";
global.EXTENDS_HEAD = "";
global.EXTENDS_BODY = "";
global.EXTENDS_HTML = "";

console.log("VER:", DATE_VER);
var webpackConfig = require('../webpack.production.config');

var spinner = ora('building for production...');
spinner.start();

mkdir('-p', OUTPUT_PATH_ORIGIN);

rm('-rf', OUTPUT_PATH);
mkdir('-p', OUTPUT_PATH);

//------------------------------------------------------------------------
var outputFileList = fs.readdirSync(OUTPUT_PATH_ORIGIN);
var dirList = [];
for (var i = 0; i < outputFileList.length; i++)
{
	var dirName = Number(outputFileList[i])
	if (!isNaN(dirName))
	{
		dirList.push(dirName);
	}
}

dirList.sort(function (a, b)
{
	if (a < b)
	{
		return -1
	}
	return 1
});

for (var i = 0; i < dirList.length; i++)
{
	if (i + 1 < dirList.length)
	{
		var n0 = dirList[i];
		var n1 = dirList[i + 1];
		if (Math.floor(n0 / 10000) == Math.floor(n0 / 10000))
		{
			rm('-rf', OUTPUT_PATH_ORIGIN + "/" + dirList[i]);
			dirList.splice(i, 1);
		}
	}
}

if (dirList.length > 3)
{
	for (var i = 0; i < dirList.length - 3; i++)
	{
		rm('-rf', OUTPUT_PATH_ORIGIN + "/" + dirList[i]);
	}
}
//------------------------------------------------------------------------

/*
 + 先创建 总输出目录
 + 然后获取到当前版本号
 + 创建 当前版本 目录

 + 读取 index.html
 + 从文件内获取 网页标题

 + 读取 ver.js文件

 + 读取 libs目录里面的所有文件名
 + 去除congfig.js，然后将所有文件进行合并打包
 + 记录文件名，并将文件写入到版本目录

 - 读取index_template.html
 - 替换 {$PAGE_TITLE} {$DATE_VER} {$SCRIPT_LIBS} {$SCRIPT_VER}
 - 写入到index_package.html
 - 开始webpack打包
 - 开始从指定目录中压缩css

 + 判断并读取template/static.list，将所有路径进行复制到版本目录下

 就是需要一份完整的服务器配置文件，然后打包的时候，全部复制一份
 这里配置文件，全部放在libs里面，config.js  config.server.js

 这个改动涉及到所有的config的文件的run data(外层有版本号，不用处理config文件)
 config.dev.js
 config.test.js
 config.server.js

 写一个脚本，复制文件即可
 这样就不需要template文件了
 只需要一个index_template文件就可以了

 */

cp('-R', 'assets', OUTPUT_PATH + '/assets/');
cp('-R', 'upload.html', OUTPUT_PATH);
cp('-R', 'uploadApi.html', OUTPUT_PATH);


//-----------------------------------------------------------------------
var indexHtml = fs.readFileSync("./index.html");
indexHtml = indexHtml.toString();
var matchArr = indexHtml.match(/\<title\>.+\<\/title\>/g);
if (matchArr.length > 0)
{
	PAGE_TITLE = matchArr[0].replace("<title>", "").replace("</title>", "");
}

var libsJsFile = "";
scriptMatchArr = indexHtml.match(/\<script.+\<\/script\>/g);
for (var i = 0; i < scriptMatchArr.length; i++)
{
	var fName = scriptMatchArr[i];
	fName = fName.replace("<script src=", "");
	fName = fName.replace("</script>", "");
	fName = fName.replace(/\"/g, "");
	fName = fName.replace(/\'/g, "");
	fName = fName.replace(/\</g, "");
	fName = fName.replace(/>/g, "");
	if (fs.existsSync(fName) && fName.indexOf(LIBS_PATH) >= 0)
	{
		if (!(/config\..+\.js/g).test(fName))
		{
			var tempJsFile = fs.readFileSync(fName);
			tempJsFile = tempJsFile.toString();
			libsJsFile += tempJsFile + "\r\n";
		}
	}
}

if (libsJsFile != "")
{
	var libsFileName = "libs." + md5(libsJsFile).substring(8, 24);
	SCRIPT_LIBS = "<script src='./" + libsFileName + ".js'></script>";
	libsJsFile = uglify.minify(libsJsFile).code;
	fs.writeFileSync(OUTPUT_PATH + "/" + libsFileName + ".js", libsJsFile);
}
//-----------------------------------------------------------------------
var indexVerFile = fs.readFileSync(BIN_VER_PATH + "ver.js");
indexVerFile = indexVerFile.toString();
indexVerFile = indexVerFile.replace(/\{\$DATE_VER\}/g, DATE_VER);
indexVerFile = indexVerFile.replace(/\{\$TIME_VER\}/g, TIME_VER);
indexVerFile = uglify.minify(indexVerFile).code;
indexVerFile = "<script>" + indexVerFile + "</script>"
fs.writeFileSync(OUTPUT_PATH_ORIGIN + "/index.html", indexVerFile);
//-------------------------------------------------------------------------------------------
var scriptVerFile = fs.readFileSync(BIN_VER_PATH + "ver_script.js");
scriptVerFile = scriptVerFile.toString();
scriptVerFile = scriptVerFile.replace("{$DATE_VER}", DATE_VER);
scriptVerFile = uglify.minify(scriptVerFile).code;
SCRIPT_VER = "<script>" + scriptVerFile + "</script>";
//-----------------------------------------------------------------------
var globalVerFile = fs.readFileSync(BIN_VER_PATH + "ver_global.js");
globalVerFile = globalVerFile.toString();
globalVerFile = globalVerFile.replace("{$DATE_VER}", DATE_VER);
globalVerFile = globalVerFile.replace("{$TIME_VER}", TIME_VER);
globalVerFile = uglify.minify(globalVerFile).code;
fs.writeFileSync(OUTPUT_PATH_ORIGIN + "/ver.js", globalVerFile);
//------------------------------------------------------------------------
var libsFileList = fs.readdirSync(LIBS_PATH);
for (var i = 0; i < libsFileList.length; i++)
{
	var tempLibPath = libsFileList[i];
	if ((/config\..+\.js/g).test(tempLibPath))
	{
		cp('-R', LIBS_PATH + tempLibPath, OUTPUT_PATH + '/' + tempLibPath);
	}
}
//-------------------------------------------------------------------------
if (fs.existsSync(TEMPLATE_PATH + "head_template.html"))
{
	EXTENDS_HEAD = fs.readFileSync(TEMPLATE_PATH + "head_template.html").toString();
	EXTENDS_HEAD = EXTENDS_HEAD.replace("{$DATE_VER}", DATE_VER);
}
if (fs.existsSync(TEMPLATE_PATH + "body_template.html"))
{
	EXTENDS_BODY = fs.readFileSync(TEMPLATE_PATH + "body_template.html").toString();
	EXTENDS_BODY = EXTENDS_BODY.replace("{$DATE_VER}", DATE_VER);
}
if (fs.existsSync(TEMPLATE_PATH + "html_template.html"))
{
	EXTENDS_HTML = fs.readFileSync(TEMPLATE_PATH + "html_template.html").toString();
	EXTENDS_HTML = EXTENDS_HTML.replace("{$DATE_VER}", DATE_VER);
}
//-------------------------------------------------------------------------
var indexFile = fs.readFileSync(TEMPLATE_PATH + "index_template.html");
indexFile = indexFile.toString();
indexFile = indexFile.replace(/\{\$DATE_VER\}/g, DATE_VER);
indexFile = indexFile.replace("{$PAGE_TITLE}", PAGE_TITLE);
indexFile = indexFile.replace("{$SCRIPT_VER}", SCRIPT_VER);
indexFile = indexFile.replace("{$SCRIPT_LIBS}", SCRIPT_LIBS);
indexFile = indexFile.replace("{$EXTENDS_HTML}", EXTENDS_HTML);
indexFile = indexFile.replace("{$EXTENDS_HEAD}", EXTENDS_HEAD);
indexFile = indexFile.replace("{$EXTENDS_BODY}", EXTENDS_BODY);
fs.writeFileSync(TEMPLATE_PATH + "index_package.html", indexFile);
//mv('-n', OUTPUT_PATH + '/libs/config.js', OUTPUT_PATH + '/libs/config_' + DATE_VER + '.js');

webpack(webpackConfig, function (err, stats)
{
//	rm('-rf', 'assets/images/' + DATE_VER);
	spinner.stop();
	if (err)
	{
		throw err;
	}
	process.stdout.write(stats.toString({
			colors: true,
			modules: false,
			children: false,
			chunks: false,
			chunkModules: false
		}) + '\n');

	mergeJsFile();
})

function mergeJsFile()
{
	var list = [];
	list.push(/\.\/manifest\.js/g);
	list.push(/\.\/vendor\.js/g);
	var fileList = [];

	var indexFile = fs.readFileSync(OUTPUT_PATH + "/index.html", {endoing: "utf8"});
	indexFile = indexFile.toString();

	for (var i = 0; i < list.length; i++)
	{
		var reg = list[i];
		fileList = fileList.concat(indexFile.match(reg));
	}

	var vendor = "";
	for (i = 0; i < fileList.length; i++)
	{
		console.log(OUTPUT_PATH + "/" + fileList[i])
		var tempFile = fs.readFileSync(OUTPUT_PATH + "/" + fileList[i]).toString();
		vendor += tempFile;
		if (i < fileList.length - 1)
		{
			indexFile = indexFile.replace("<script type=text/javascript src=" + fileList[i] + "></script>", "");
		}
		rm('-rf', OUTPUT_PATH + "/" + fileList[i]);
	}

	indexFile = indexFile.replace("<script type=text/javascript src=" + fileList[i] + "></script>", "<script type=text/javascript src=./vendor.js></script>");

	fs.writeFileSync(OUTPUT_PATH + "/vendor.js", vendor);
	fs.writeFileSync(OUTPUT_PATH + "/index.html", indexFile);

	copyStaticFile();
}

function copyStaticFile()
{
	//-----------------------------------------------------------------------------
	if (fs.existsSync(global.TEMPLATE_PATH + "static.list"))
	{
		var staticFile = fs.readFileSync(TEMPLATE_PATH + "static.list").toString();
		var staticFileList = staticFile.split("\n");
		for (let item of staticFileList)
		{
			item = item.replace(/\r/g, "");
			if (fs.existsSync(item))
			{
				var targetPath = path.join(OUTPUT_PATH, item);
				checkAndCreateDir(targetPath);
				cp('-R', item, targetPath);
			}
		}
	}

	cssmin();
}

function checkAndCreateDir($filePath)
{
	if (!File.isDirectory($filePath))
	{
		$filePath = path.dirname($filePath);
	}
	if (!fs.existsSync($filePath))
	{
		var parentDir = path.dirname($filePath);
		checkAndCreateDir(parentDir);
		mkdir('-p', $filePath);
	}
}

function cssmin()
{
	spinner = ora('now start to compress css, please waiting...');
	spinner.start();
	var cssFilePath;

	setTimeout(function ()
	{
		fs.readdir(OUTPUT_PATH + '/css', onCompleteDir_fs);
	}, 1000);

	function onCompleteDir_fs(err, data)
	{
		if (err)
		{
			throw err;
		}

		if (Array.isArray(data) && data.length > 0)
		{
			cssFilePath = OUTPUT_PATH + '/css' + '/' + data[0];
			readCss();
		}
	}

	function readCss()
	{
		fs.readFile(cssFilePath, 'utf-8', function (err, data)
		{
			if (err)
			{
				throw err;
			}
			new CleanCSS({}).minify(data, onComplete_cleanCss);
		})
	}

	function onComplete_cleanCss(err, output)
	{
		fs.writeFile(cssFilePath, output.styles, function (err, data)
		{
			if (err)
			{
				throw err;
			}
			spinner.stop();
			console.log("All Done!------------------------------------------------------------------");
			rm('-rf', TEMPLATE_PATH + "index_package.html");
		});
	}
}

function getDateVer()
{
	var date = new Date();
	var dateStr = date.getFullYear() + formatTime(date.getMonth() + 1) + formatTime(date.getDate());
//	dateStr += ",";
	dateStr += formatTime(date.getHours()) + formatTime(date.getMinutes());
	return dateStr;
	function formatTime($timeNum)
	{
		$timeNum = "0" + $timeNum;
		$timeNum = $timeNum.substr($timeNum.length - 2, 2);
		return $timeNum;
	}
}