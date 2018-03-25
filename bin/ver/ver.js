var ver = "{$DATE_VER}";
var webParam = queryUrl(window.location.href);
if (webParam.query && webParam.query.ver)
{
	ver = webParam.query.ver;
}

window.location.href = ver + "/index.html{$TIME_VER}";

function queryUrl($query)
{
	var res = {};
	var url = $query.split("?")[0];
	var port = url.split("://")[0];
	port != "" && (port += "://");
	var tempurl = url.substr(port.length);
	var host = port + tempurl.substring(0, tempurl.indexOf("/"));
	$query = $query.replace(url, "");
	var query = {};
	var bookmark = "";
	$query = $query.trim().replace(/^(\?|#|&)/, '')
	if ($query.indexOf('#') > 0)
	{
		bookmark = $query.substr($query.indexOf('#') + 1);
		$query = $query.replace('#' + bookmark, '');
	}

	if ($query)
	{
		$query.split('&').forEach(function (param)
		{
			var parts = param.replace(/\+/g, ' ').split('=')
			var key = decodeURIComponent(parts.shift())
			var val = parts.length > 0
				? decodeURIComponent(parts.join('='))
				: null

			if (query[key] === undefined)
			{
				query[key] = val
			}
			else if (Array.isArray(query[key]))
			{
				query[key].push(val)
			}
			else
			{
				query[key] = [query[key], val]
			}
		})
	}
	res.url = url;
	res.host = host;
	res.bookmark = bookmark;
	res.query = query;
	return res
}