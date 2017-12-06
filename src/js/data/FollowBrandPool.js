import g from "./../../global";
var _followBrandList = [];
var _brandHash = {};

export default class FollowBrandPool {
	constructor()
	{

	}

	update($list)
	{
		for (var item of $list)
		{
			if (_followBrandList.indexOf(item.id) < 0)
			{
				_followBrandList.push(item.id);
				_brandHash[item.id] = item

			}
		}
	}

	addBrand($obj)
	{
		if (_followBrandList.indexOf($obj.id) < 0)
		{
			_followBrandList.push($obj.id);
			_brandHash[$obj.id] = $obj;
		}
	}

	getBrandPageList($page, $size = g.data.constPool.getDataById("pageSize_searchBrand"))
	{
		var data = {total:0};
		var start = ($page - 1) * $size;
		var end = $page * $size;
		data.list = _followBrandList.slice(start, end);
		data.total = _followBrandList.length;
		return data;
	}

	getDataById($id)
	{
		return _brandHash[$id];
	}

	getTotal()
	{
		trace("_followBrandList", _followBrandList);
		return _followBrandList.length;
	}

	isFollow($id)
	{
		return !!_brandHash[$id];
	}

	removeAll()
	{
		_followBrandList = [];
		_brandHash = {};
	}
}

