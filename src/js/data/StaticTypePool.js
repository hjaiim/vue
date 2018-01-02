/**
 * Created by Administrator on 2017/6/8.
 */

var _hash = {};
var _list = [];
import g from './../../global';
export default class StaticTypePool {
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
		var itemData = createData($item);
		if (!_hash[itemData.id])
		{
			_hash[itemData.id] = itemData;
			_list.push(itemData);
		}
	}

	remove($navId)
	{
		var itemData = _hash[$navId];
		if (_list.indexOf(itemData) >= 0)
		{
			_list.splice(_list.indexOf(itemData), 1)
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


	removeAll()
	{
		_hash = {};
		_list = [];
	}

}

function createData($obj)
{
	var d = {};
	d.id = $obj.id;
	d.name = $obj.name;
	d.titles = $obj.titles;
	d.hash = $obj.hash;
	return d;
}

