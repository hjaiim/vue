/**
 * Created by billy on 2016/12/21.
 */
var Path=require('path');
var file=require('./file');

module.exports=function()
{
	var i = 0;
	var options = {};
	var args = process.argv.concat();
	args.splice(0, 2);
	return args;
}