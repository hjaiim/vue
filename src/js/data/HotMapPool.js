var _hash = {};

export default class HotMapPool {
	constructor()
	{

	}

	update($plat, $lng, $lat, $radius, $list)
	{
		var key = $plat + '_' + $lng + '_' + $lat + '_' + $radius;
		if (!_hash[key])
		{
			_hash[key] = {};
			_hash[key].list = [];
		}
		var count = 0;
		for (var item of $list)
		{
			var obj = {};
			var arr = g.func.formatLocation(item.lng, item.lat);
			obj.lng = arr[0], obj.lat = arr[1], obj.count = item.count;
			count += obj.count;
			_hash[key].list.push(obj);
		}
		_hash[key].count = count;
		trace("$list",$list.length);
	}

	getListBy($plat, $lng, $lat, $radius)
	{
		return _hash[$plat + '_' + $lng + '_' + $lat + '_' + $radius];
	}

	removeAll()
	{
		_hash = {}
	}
}
