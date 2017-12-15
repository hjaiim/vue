/**
 * Created by Administrator on 2017/12/11.
 */
import g from './../../global';
var _list = [];
var _hash = {};
var _total = 0;
var _totalPage = 1;
export default class DutyPool {
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
			_list.push(itemData);
			g.data.departmentPool.addDuty(itemData.parentId, itemData);
		}
	}

	remove($id)
	{
		if (_hash[$id])
		{
			var index = _list.indexOf(_hash[$id]);
			if (index >= 0)
			{
				_list.splice(index, 1);
				g.data.departmentPool.removeDuty(itemData.parentId, itemData)
			}
		}
	}

	getDataById($id)
	{
		return _hash[$id];
	}

	get list()
	{
		return _list;
	}

	removeAll()
	{
		_list = [];
		_hash = {};
		_total = 0;
		_totalPage = 1;
	}
}

function createData($dObj)
{
	var d = {};
	d.id = 0;
	d.name = "";
	d.parentId = 0;
	d.companyId = 0;
	d.creatorId = 0;
	d.update = updateData.bind(d);
	d.update($dObj);
	return d;
}

function updateData($dObj)
{
	$dObj.hasOwnProperty("dutyId") && (this.id = $dObj.dutyId);
	$dObj.hasOwnProperty("dutyName") && (this.name = $dObj.dutyName);
	$dObj.hasOwnProperty("companyId") && (this.companyId = $dObj.companyId);
	$dObj.hasOwnProperty("departmentId") && (this.parentId = $dObj.departmentId);
	$dObj.hasOwnProperty("creatorId") && (this.creatorId = $dObj.creatorId);
}