/**
 * Created by billy on 2017/6/6.
 */
var fs = require('fs');
var path = require('path');
var assetsPath = "release";

var md5 = require("md5");
var uglify = require("uglify-js");

createVer();

function createVer()
{
	//将index.html里面的3条script全部取出来，丢到数组里面
	//并且将原始index.html做一个处理
	//然后将文件名数组丢在ver.js里面？
	// 模板ver.js里面
	//将ver文件的最终版本号写入到index.html
	//然后
	var list = [];
	list.push(/\.\/\d+\/manifest\.\S+\.js/g);
	list.push(/\.\/\d+\/vendor\.\S+\.js/g);
	list.push(/\.\/\d+\/index\.\S+\.js/g);
	var fileList = [];
	var verListFile = "";

	var indexFile = fs.readFileSync(assetsPath + "/index.html", {endoing: "utf8"});
	indexFile = indexFile.toString();

	for (var i = 0; i < list.length; i++)
	{
		var reg = list[i];
		fileList = fileList.concat(indexFile.match(reg));
	}

	for (i = 0; i < fileList.length; i++)
	{
		verListFile += "loadScript(\"" + fileList[i] + "\");";
		indexFile = indexFile.replace("<script type=text/javascript src=" + fileList[i] + "></script>", "");
	}

	//生成ver文件
	if (!fs.existsSync(assetsPath + "/ver"))
	{
		fs.mkdirSync(assetsPath + "/ver");
	}

	var ver = md5(verListFile).substring(8, 24);
	fs.writeFileSync(assetsPath + "/ver/ver." + ver + ".js", verListFile, {encoding: "utf8"});

	//根据ver.js的模板，生成ver.js
	var verFile = fs.readFileSync("./bin/ver.js", {endoing: "utf8"});
	verFile = verFile.toString();
	verFile = verFile.replace("{$VER}", ver);
	verFile = uglify.minify(verFile).code;
	indexFile += "<script>" + verFile + "</script>";
	fs.writeFileSync(assetsPath + "/index1.html", indexFile, {encoding: "utf8"});
}

function trace()
{
	var arr = [];
	for (var i = 0; i < arguments.length; i++)
	{
		arr.push(arguments[i]);
	}
	console.log.apply(console, arr);
}