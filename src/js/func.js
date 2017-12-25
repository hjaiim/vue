import loginManager from "./../js/manager/LoginManager";
export function dealErr($err)
{
	g.ui.hideLoading();
	if ($err.status == 4005)
	{
		loginManager.logout();
	}
	if ($err.errorMsg)
	{
		g.ui.toast($err.errorMsg);

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

export function getBase64($fileList, $quality)
{
	var list = [], promises = [];
	for (var item of $fileList)
	{
		var tmp = getBase64(item);
		promises.push(tmp);
	}
	return Promise.all(promises);

	function getBase64($imgFile)
	{
		var b = window.URL.createObjectURL($imgFile);
		var img = new Image();
		var promise = new Promise((okFunc, errFunc)=>
		{
			img.onload = ()=>
			{
				// 默认按比例压缩
				var w = img.width,
					h = img.height,
					scale = w / h;
				w = g.param.width || w;
				h = g.param.height || (w / scale);
				//生成canvas
				var canvas = document.createElement('canvas');
				var ctx = canvas.getContext('2d');
				// 创建属性节点
				var anw = document.createAttribute("width");
				anw.nodeValue = w;
				var anh = document.createAttribute("height");
				anh.nodeValue = h;
				canvas.setAttributeNode(anw);
				canvas.setAttributeNode(anh);
				ctx.drawImage(img, 0, 0, w, h);
				var quality = $quality || 0.7; // 默认图片质量为0.5
				var base64 = canvas.toDataURL('image/jpeg', quality * 10);
				// 回调函数返回base64的值
				okFunc(base64);
			};
			img.src = b;
		});
		return promise;
	}
}

export function updateUserInfo()
{
	if (!g.data.userInfo.username && g.data.get("userInfo"))
	{
		var data = JSON.parse(g.data.get("userInfo"));
		g.data.userInfo.update(data);
	}
}

export function updateRightList()
{
	if (!g.data.rightPool.list.length && g.data.get("rightList"))
	{
		var data = JSON.parse(g.data.get("rightList"));
		g.data.rightPool.update(data);
	}
}

export function firstUpperCase(str)
{
	return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}

export function insertOneOrZero($list, $item)
{
	if (!Array.isArray($list))
	{
		return;
	}
	if ($list.indexOf($item) < 0)
	{
		$list.push($item);
	}
	else
	{
		$list.splice($list.indexOf($item), 1)
	}
}
export function pushIn($list, $item)
{
	if (!Array.isArray($list))
	{
		return;
	}
	if ($list.indexOf($item) < 0)
	{
		$list.push($item)
	}
	return $list;
}

export function splice($list, $item)
{
	if (!Array.isArray($list))
	{
		return;
	}
	if ($list.indexOf($item) >= 0)
	{
		$list.splice($list.indexOf($item), 1)
	}
}