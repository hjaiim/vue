import loginManager from "./../js/manager/LoginManager";
import g from "./../global";
export function dealErr($err)
{
	g.ui.hideLoading();
	if ($err.status == 4005)
	{
		loginManager.forceExit();
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

export function getUserInfo()
{
	if (!g.data.userInfo.username && g.data.get("userInfo"))
	{
		var data = JSON.parse(g.data.get("userInfo"));
		g.data.userInfo.update(data);
	}
}

export function updateUserInfo($data)
{
	debugger;
	if(g.data.get("userInfo"))
	{
		var data = JSON.parse(g.data.get("userInfo"));
		data = __merge(data, $data, true);
		g.data.save("userInfo", JSON.stringify(data));
	}
	else
	{
		g.data.save("userInfo", JSON.stringify($data));
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
export function autoTextarea(elem, extra, maxHeight)
{
	extra = extra || 0;
	var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
		isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
		addEvent = function (type, callback)
		{
			elem.addEventListener ?
				elem.addEventListener(type, callback, false) :
				elem.attachEvent('on' + type, callback);
		},
		getStyle = elem.currentStyle ? function (name)
		{
			var val = elem.currentStyle[name];

			if (name === 'height' && val.search(/px/i) !== 1)
			{
				var rect = elem.getBoundingClientRect();
				return rect.bottom - rect.top -
					parseFloat(getStyle('paddingTop')) -
					parseFloat(getStyle('paddingBottom')) + 'px';
			}
			;

			return val;
		} : function (name)
		{
			return getComputedStyle(elem, null)[name];
		},
		minHeight = parseFloat(getStyle('height'));

	elem.style.resize = 'none';

	var change = function ()
	{
		var scrollTop, height,
			padding = 0,
			style = elem.style;

		if (elem._length === elem.value.length)
		{
			return;
		}
		elem._length = elem.value.length;

		if (!isFirefox && !isOpera)
		{
			padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
		}
		;
		scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

		elem.style.height = minHeight + 'px';
		if (elem.scrollHeight > minHeight)
		{
			if (maxHeight && elem.scrollHeight > maxHeight)
			{
				height = maxHeight - padding;
				style.overflowY = 'auto';
			}
			else
			{
				height = elem.scrollHeight - padding;
				style.overflowY = 'hidden';
			}
			;
			style.height = height + extra + 'px';
			scrollTop += parseInt(style.height) - elem.currHeight;
			document.body.scrollTop = scrollTop;
			document.documentElement.scrollTop = scrollTop;
			elem.currHeight = parseInt(style.height);
		}
		;
	};

	addEvent('propertychange', change);
	addEvent('input', change);
	addEvent('focus', change);
	change();
}





