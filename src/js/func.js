
export function dealErr($err)
{
	var msgInfo = g.data.langPool.getDataById("error" + $err.error.code);
	g.ui.toast(msgInfo.content);
	g.ui.hideLoading();
	if ($err.error.code == 1000)
	{
		logout();
	}
}
export function oneOf($value, validList)
{
	if (typeOf(validList) == 'array')
	{
		return checkValid(validList);
	}
	else
	{
		var newList = Array.prototype.slice.call(validList);
		if (typeOf(newList) == 'array')
		{
			return checkValid(newList);
		}
	}
	function checkValid($list)
	{
		if ($list.indexOf($value) >= 0)
		{
			return true;
		}
		return false;
	}

}
export function typeOf(obj)
{
	const toString = Object.prototype.toString;
	const map = {
		'[object Boolean]': 'boolean',
		'[object Number]': 'number',
		'[object String]': 'string',
		'[object Function]': 'function',
		'[object Array]': 'array',
		'[object Date]': 'date',
		'[object RegExp]': 'regExp',
		'[object Undefined]': 'undefined',
		'[object Null]': 'null',
		'[object Object]': 'object'
	};
	return map[toString.call(obj)];
}