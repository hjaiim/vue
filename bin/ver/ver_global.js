/**
 * Created by billy on 2017/6/19.
 */
function checkVer($dateVer)
{
	var ver = "{$DATE_VER}";
	var timeVer = "{$TIME_VER}";
	if (ver != $dateVer)
	{
		var href = window.location.href;
		href = href.replace($dateVer, ver);
		href = href.replace(/\?\d{4}/g, "?" + timeVer);
		window.location.href = href;
	}
}