var _list = [], _hash = {};
var _total = 0, _totalPage = 1;
export default class RolePool {
	constructor()
	{
	}

	update($dObj)
	{
		if (!$dObj)
		{
			return;
		}
		$dObj.hasOwnProperty("total") && (_total = $dObj.total);
		$dObj.hasOwnProperty("totalPage") && (_totalPage = $dObj.totalPage);
		for (var item of $dObj.data)
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
		_total = 0;
		_totalPage = 1;
	}
}

function createData($dObj)
{
	var d = {};
	d.id = 0;
	d.name = "";
	d.desc = "";
	d.setter = "";
	d.distribute = "";
	d.rights = "";
	d.isShow = false;
	d.update = updateData.bind(d);
	d.update($dObj);
	return d;

}

function updateData($dObj)
{
	$dObj.hasOwnProperty("roleId") && (this.id = $dObj.roleId);
	$dObj.hasOwnProperty("roleName") && (this.name = $dObj.roleName);
	$dObj.hasOwnProperty("roleDesc") && (this.desc = $dObj.roleDesc);
	$dObj.hasOwnProperty("userName") && (this.setter = $dObj.userName);
	$dObj.hasOwnProperty("userNum") && (this.distribute = $dObj.userNum);
	$dObj.hasOwnProperty("permissionIds") && (this.rights = $dObj.permissionIds);
	$dObj.hasOwnProperty("isShow") && (this.isShow = $dObj.isShow);
}