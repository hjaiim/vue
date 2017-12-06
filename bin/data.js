// https://github.com/shelljs/shelljs
require('shelljs/global');
var Path = require('path');
var FS = require('fs');
var File = require('./file');
var parseArgs = require('./parseArgs');
var fnv = require('fnv-plus');

var trace = function ()
{
	console.log.apply(console, arguments);
};

var sourcePath; //数据源目录路径
var distPath;   //目标目录路径
var distFileName; //目标文件名
var distFileExt;  //目标文件扩展名
var configFilePathList; //项目配置文件路径
var fileList;
var fileHash;
var args = parseArgs();

process.on('uncaughtException', function (e)
{
	trace("\x1B[32m", e);
	trace("\x1B[37m", "");
})

entry();

function entry()
{
	fileHash = Object.create(null);

	sourcePath = File.joinPath(process.cwd(), args[0]);
	distPath = File.joinPath(process.cwd(), args[1]);
	var $distFileName = args[2];
	distFileName = $distFileName.split(".")[0];
	distFileExt = $distFileName.split(".")[1];
	configFilePathList = [];
	for (var i = 3; i < args.length; i++)
	{
		var tempFilePath = File.joinPath(process.cwd(), args[i]);
		if (File.isDirectory(tempFilePath))
		{
			var dirFileList = File.getDirectoryListing(tempFilePath);
			for (var j = 0; j < dirFileList.length; j++)
			{
				var filePath = dirFileList[j];
				if ((/config\..+\.js/g).test(filePath))
				{
					configFilePathList.push(filePath);
				}
			}
		}
		else
		{
			configFilePathList.push(tempFilePath);
		}
	}

	if (File.isDirectory(sourcePath))
	{
		fileList = getAllFile(sourcePath);
	}

	if (fileList)
	{
		readFile();
	}
}

function getAllFile($path)
{
	var list = [];
	if (File.isDirectory($path))
	{
		var templist = File.getDirectoryListing($path);
		for (var file of templist)
		{
			list = list.concat(getAllFile(file));
		}
	}
	else
	{
		list.push($path);
	}

	return list;
}

function readFile()
{
	for (var file of fileList)
	{
		var fd = FS.readFileSync(file);
		var content = fd.toString('utf-8');
		content = content.replace(/ /g, '');
		content = content.replace(/\r/g, '');
		content = content.replace(/\t/g, '');
		content = content.replace(/\n/g, '');
		var filePath = file;
		filePath = filePath.replace(sourcePath + "/", "");
		trace(filePath);
		JSON.parse(content);
		fileHash[filePath] = content
	}

	mergeFile();
}

function mergeFile()
{
	var fileList = [];
	var count = 0;
	var content = "";
	for (var filePath in fileHash)
	{
		var file = fileHash[filePath];
		fileList.push([filePath, count, count += file.length]);
		content += file;
	}
	var fileListStr = JSON.stringify(fileList);
	content = fileListStr.length + "||||" + fileListStr + content;

	createFile(content);
}

function createFile(content)
{
	var fileList = getAllFile(distPath);
	for (var file of fileList)
	{
		if (file.replace(distPath, "").indexOf(distFileName) == 0 && file.split(".")[1] == distFileExt)
		{
			FS.unlinkSync(file);
		}
	}
//	var contentHash = fnv.hash(content).dec();
	var contentHash = "";
	var fileName = distPath + distFileName + "." + distFileExt;
	FS.writeFileSync(fileName, content);
	trace("\x1B[32m", "created: " + fileName);
//	resetConfig(contentHash);
	trace("\x1B[37m", "-------- All Done! ------");
	process.exit(0);
}

function resetConfig(contentHash)
{
	for (var i = 0; i < configFilePathList.length; i++)
	{
		var configFilePath = configFilePathList[i];
		if (FS.existsSync(configFilePath))
		{
			var fd = FS.readFileSync(configFilePath).toString('utf-8');
			if (fd.indexOf("staticData") > 0)
			{
				var index = fd.indexOf("staticData");
				var start = 0;
				var end = 0;
				var count = 0;
				while (start == 0 || end == 0)
				{
					count++;
					if (fd.charAt(index + count) == "\"")
					{
						if (start == 0)
						{
							start = index + count;
						}
						else
						{
							end = index + count;
						}
					}
				}
				var fileUrl = fd.substring(start + 1, end);
				var newFileUrl = fileUrl.substr(0, fileUrl.lastIndexOf("/") + 1);
				newFileUrl = newFileUrl + distFileName + "_" + contentHash + "." + distFileExt;
				fd = fd.replace(fileUrl, newFileUrl);
				FS.writeFileSync(configFilePath, fd);
				trace("\x1B[32m", "created: " + configFilePath);
			}
		}
	}
	trace("\x1B[37m", "-------- All Done! ------");
	process.exit(0);
}