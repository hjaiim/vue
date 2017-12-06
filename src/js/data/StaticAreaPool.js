/**
 * Created by billy on 2017/10/26.
 */
import g from './../../global';
var _hash = {};
var _idList = [];
var _nameHash = {};


export default class StaticAreaPool {
	constructor()
	{

	}

	update($areaList)
	{
		for (var areaItem of $areaList)
		{
			_hash[areaItem.id] = areaItem;
			_nameHash[areaItem.type + "_" + areaItem.name] = areaItem.id;
			if (areaItem.type == 1 || areaItem.type == 2)
			{
				areaItem.list = [];
			}
		}

		for (var areaItem of $areaList)
		{
			if (areaItem.type == 2 || areaItem.type == 3)
			{
				var parentItem = _hash[areaItem.parentId];
				parentItem.list.push(areaItem.id);
			}
		}
	}

	getDataById($id)
	{
		return _hash[$id];
	}

// 	$type  1省 2 市
	getIdByName($type, $name)
	{
		return _nameHash[$type + "_" + $name];
	}


	removeAll()
	{
		_hash = {};
		_idList = [];
		_nameHash = {};

	}
}