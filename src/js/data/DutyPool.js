/**
 * Created by Administrator on 2017/12/11.
 */
import g from "./../../global";
var _list = [];
var _hash = {};

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
				g.data.departmentPool.removeDuty(_hash[$id].parentId, _hash[$id])
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
	}
}

function createData($dObj)
{
	var d = {};
	d.id = 0;
	d.name = "";
	d.isEdit = false;
	d.parentId = 0;
	d.companyId = 0;
	d.creatorId = 0;
	d.isEdit = false;
	d.errMsg = "";
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
	$dObj.hasOwnProperty("isEdit") && (this.isEdit = $dObj.isEdit);
	$dObj.hasOwnProperty("errMsg") && (this.errMsg = $dObj.errMsg);
}