/**
 * Created by billy on 2017/6/20.
 */
var fs = require("fs");
var str = "";
var indexHtml = fs.readFileSync("./index.html");
indexHtml = indexHtml.toString();
var matchArr = indexHtml.match(/\<script.+\<\/script\>/g);
for (var i = 0; i < matchArr.length; i++)
{
	str = matchArr[i];
	str = str.replace("<script src=", "");
	str = str.replace("</script>", "");
	str = str.replace(/\"/g, "");
	str = str.replace(/\'/g, "");
	str = str.replace(/\</g, "");
	str = str.replace(/>/g, "");
	if (fs.existsSync(str))
	{
		var stat = fs.statSync(str);
		console.log(str, stat.size);
	}
}