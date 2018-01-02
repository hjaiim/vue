/**
 * Created by Administrator on 2017/6/8.
 */

var _hash = {};
var _list = [];
var _childHash = {};
import g from './../../global';
export default class StaticNavPool {
	constructor()
	{

	}

	init($list)
	{
		for (var item of $list)
		{
			this.add(item);
		}
	}

	add($item)
	{
		var navData = createData($item);
		if (!_hash[navData.id])
		{
			_hash[navData.id] = navData;
			_list.push(navData);
		}
	}

	remove($navId)
	{
		var navData = _hash[$navId];
		if (_list.indexOf(navData) >= 0)
		{
			_list.splice(_list.indexOf(navData), 1)
		}
	}

	getDataById($navId)
	{
		return _hash[$navId]
	}

	get list()
	{
		return _list;
	}

	getChildByPath($path)
	{
		return _childHash[$path]
	}

	removeAll()
	{
		_hash = {};
		_list = [];
	}

}

class Child {
	constructor()
	{
		this.list = [];
	}

	update($list)
	{

		for (var item of $list)
		{
			this.add(item);
		}
		return this.list;
	}

	add($item)
	{
		_childHash[$item.path] = $item;
		if (this.list.indexOf($item) < 0)
		{
			this.list.push($item);
		}
	}
}

function createData($obj)
{
	var d = {};
	d.id = $obj.id;
	d.name = $obj.name;
	d.desc = $obj.desc;
	d.rightId = $obj.rightId;
	d.positionJudge = $obj.positionJudge;
	d.highLightList = $obj.highLightList;
	var child = new Child();
	d.children = child.update($obj.children);
	return d;
}

