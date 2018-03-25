/**
 * Created by billy on 2017/6/19.
 */
var ver = "{$DATE_VER}";
var script = document.createElement("script");
script.src = "../ver.js?" + (new Date().getTime() + "").substr(0, 8);
document.head.appendChild(script);
script.onload = function ()
{
	checkVer(ver);
}
