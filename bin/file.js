/**
 * Created by billy on 2016/12/21.
 */
var Path=require('path');
var FS = require('fs');

var file={};
var charset = "utf-8";
/**
 * 指定路径的文件或文件夹是否存在
 */
function exists(path)
{
	path = escapePath(path);
	return FS.existsSync(path);
}
file.exists = exists;

/**
 * 转换本机路径为Unix风格路径。
 */
function escapePath(path)
{
	if (!path)
	{
		return "";
	}
	return path.split("\\").join("/");
}
file.escapePath = escapePath;

/**
 * 读取文本文件,返回打开文本的字符串内容，若失败，返回"".
 * @param path 要打开的文件路径
 */
function read(path, ignoreCache)
{
	if (ignoreCache === void 0)
	{
		ignoreCache = false;
	}
	path = escapePath(path);
	try
	{
		var text = FS.readFileSync(path, charset);
		text = text.replace(/^\uFEFF/, '');
	}
	catch (err0)
	{
		return "";
	}
	return text;
}
file.read = read;

/**
 * 连接路径,支持传入多于两个的参数。也支持"../"相对路径解析。返回的分隔符为Unix风格。
 */
function joinPath(dir)
{
	var filename = [];
	for (var _i = 1; _i < arguments.length; _i++)
	{
		filename[_i - 1] = arguments[_i];
	}
	var path = Path.join.apply(null, arguments);
	path = escapePath(path);
	return path;
}
file.joinPath = joinPath;
function isDirectory(path)
{
	path = escapePath(path);
	try
	{
		var stat = FS.statSync(path);
	}
	catch (e)
	{
		return false;
	}
	return stat.isDirectory();
}
file.isDirectory = isDirectory;

/**
 * 获取指定文件夹下的文件或文件夹列表，不包含子文件夹内的文件。
 * @param path 要搜索的文件夹
 * @param relative 是否返回相对路径，若不传入或传入false，都返回绝对路径。
 */
function getDirectoryListing(path, relative)
{
	if (relative === void 0)
	{
		relative = false;
	}
	path = escapePath(path);
	try
	{
		var list = FS.readdirSync(path);
	}
	catch (e)
	{
		return [];
	}
	var length = list.length;
	if (!relative)
	{
		for (var i = length - 1; i >= 0; i--)
		{
			if (list[i].charAt(0) == ".")
			{
				list.splice(i, 1);
			}
			else
			{
				list[i] = joinPath(path, list[i]);
			}
		}
	}
	else
	{
		for (i = length - 1; i >= 0; i--)
		{
			if (list[i].charAt(0) == ".")
			{
				list.splice(i, 1);
			}
		}
	}
	return list;
}
file.getDirectoryListing = getDirectoryListing;
/**
 * 获取路径的文件名(不含扩展名)或文件夹名
 */
function getFileName(path)
{
	if (!path)
	{
		return "";
	}
	path = escapePath(path);
	var startIndex = path.lastIndexOf("/");
	var endIndex;
	if (startIndex > 0 && startIndex == path.length - 1)
	{
		path = path.substring(0, path.length - 1);
		startIndex = path.lastIndexOf("/");
		endIndex = path.length;
		return path.substring(startIndex + 1, endIndex);
	}
	endIndex = path.lastIndexOf(".");
	if (endIndex == -1 || isDirectory(path))
	{
		endIndex = path.length;
		return path.substring(startIndex + 1, endIndex);
	}
	else
	{
		return path.substring(startIndex + 1);
	}
}
file.getFileName = getFileName;

/**
 * 获取文件的扩展名
 */
function getExtName(path)
{
	var fileName = getFileName(path);
	if (fileName.indexOf(".") < 0)
	{
		return "";
	}
	else
	{
		return fileName.substr(fileName.indexOf(".") + 1);
	}
}
file.getExtName = getExtName;

module.exports=file;