import g from "./../../global";
var _hash = {};

export default class FoodPool {
	constructor()
	{

	}

	update($type, $list)
	{
		if (!_hash[$type])
		{
			if ($type == "topFood")
			{
				_hash["topFood"] = $list.sort(function (a, b)
				{
					return b.soldNum - a.soldNum;
				});
			}
			else
			{
				_hash[$type] = $list;
			}

		}
	}

	getListBy($type, $page, $size = g.data.constPool.getDataById("pageSize_newFood"))
	{
		var data = {};
		data.total = _hash[$type].length;

		var start = ($page - 1) * $size;
		var end = $page * $size;
		data.list = _hash[$type].slice(start, end);
		return data;
	}

	removeAll()
	{
		_hash = {}
	}
}
