var _list = [], _hash = {};
var _staffHash = {};
import g from './../../global';
export default class StaffPool {
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
			}
		}
	}

	getDataById($id)
	{
		return _hash[$id]
	}

	getChildById($id)
	{
		return _staffHash[$id];
	}

	removeChild($id, $childId)
	{
		var index = _staffHash[$id].children.indexOf(_staffHash[$childId]);
		if (index >= 0)
		{
			_staffHash[$id].children.splice(index, 1)
		}
	}

	get list()
	{
		return _list;
	}

	get total()
	{
		return _total;
	}

	get totalPage()
	{
		return _totalPage;
	}

	removeAll()
	{
		_list = [];
		_hash = {};
		_staffHash = {};
	}
}

function createData($dObj)
{
	var d = {};
	d.id = 0;
	d.name = "";
	d.children = [];
	d.update = updateData.bind(d);
	d.update($dObj);
	return d;

}

function updateData($dObj)
{
	$dObj.hasOwnProperty("stationId") && (this.id = $dObj.stationId);
	$dObj.hasOwnProperty("stationName") && (this.name = $dObj.stationName);
	if ($dObj.hasOwnProperty("auditorUserPageResult"))
	{
		var staff = new Staff();
		this.children = staff.update($dObj.auditorUserPageResult);
	}
}

class Staff {
	constructor()
	{
		this.listData = [];
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
		return this.listData;
	}

	add($item)
	{
		var itemData = createStaff($item);
		if (!_staffHash[itemData.id])
		{
			_staffHash[itemData.id] = itemData;

			if (itemData.flag == 1)
			{
				this.listData.push(itemData);
			}
		}
	}

	remove($id)
	{
		if (_staffHash[$id])
		{
			var index = _list.indexOf(_staffHash[$id]);
			if (index >= 0)
			{
				this.listData.splice(index, 1);
			}
		}
	}
}

function createStaff($dObj)
{
	var d = {};
	d.id = 0;
	d.name = "";
	d.avatar = "";
	d.companyName = "";
	d.departmentName = "";
	d.dutyName = "";
	d.checked = false;
	d.flag = 0;
	d.update = updateStaff.bind(d);
	d.update($dObj);
	return d;

}

function updateStaff($dObj)
{
	$dObj.hasOwnProperty("userId") && (this.id = $dObj.userId)
	$dObj.hasOwnProperty("name") && (this.name = $dObj.name);
	$dObj.hasOwnProperty("avatar") && (this.avatar = $dObj.avatar);
	$dObj.hasOwnProperty("companyName") && (this.companyName = $dObj.companyName);
	$dObj.hasOwnProperty("departmentName") && (this.departmentName = $dObj.departmentName);
	$dObj.hasOwnProperty("dutyName") && (this.dutyName = $dObj.dutyName);
	$dObj.hasOwnProperty("checked") && (this.checked = $dObj.checked);
	$dObj.hasOwnProperty("flag") && (this.flag = $dObj.flag);

}