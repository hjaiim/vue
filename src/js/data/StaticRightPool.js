/**
 * Created by Administrator on 2017/12/11.
 */
var _list = [];
var _hash = {};
var _allList = [];
import g from './../../global';
export default class StaticRightPool {
	constructor()
	{

	}

	update($list)
	{
		if (!Array.isArray($list))
		{
			return;
		}

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
			_allList.push(itemData);
			if (itemData.parentId < 0)
			{
				_list.push(itemData);
			}
			else if (_hash[itemData.parentId])
			{
				_hash[itemData.parentId].children.push(itemData)
			}
		}

	}

	remove($id)
	{
		if (_hash[$id])
		{
			var index = _list.indexOf(_hash[$id]);
			if (index >= 0)
			{
				_allList.splice(index, 1);
			}
		}
	}

	getDataById($id)
	{
		return _hash[$id];
	}

	get list()
	{
		return _list.sort(function (a, b)
		{
			return a.sort - b.sort;

		});
	}

	get allList()
	{
		return _allList;
	}

	removeAll()
	{
		_list = [];
		_hash = {};
		_allList = [];
	}
}

function createData($dObj)
{
	var d = {};
	d.id = 0;
	d.name = "";
	d.url = "";
	d.parentId = 0;
	d.level = 0;
	d.sort = 0;
	d.children = [];
	d.update = updateData.bind(d);
	d.update($dObj);
	return d;
}

function updateData($dObj)
{
	$dObj.hasOwnProperty("permissionId") && (this.id = $dObj.permissionId);
	$dObj.hasOwnProperty("permissionName") && (this.name = $dObj.permissionName);
	$dObj.hasOwnProperty("url") && (this.url = $dObj.url);
	$dObj.hasOwnProperty("parentId") && (this.parentId = $dObj.parentId);
	$dObj.hasOwnProperty("catalogLevel") && (this.level = $dObj.catalogLevel);
	$dObj.hasOwnProperty("sort") && (this.sort = $dObj.sort);
}