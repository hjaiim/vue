var _list = [], _hash = {};
var _total = 0, _totalPage = 1;
import g from './../../global';
export default class AccountPool {
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
	d.username = "";
	d.name = "";
	d.phone = "";
	d.companyId = "";
	d.companyName = "";
	d.departmentId = "";
	d.departmentName = "";
	d.dutyId = "";
	d.dutyName = "";
	d.roleId = 0;
	d.roleName = "";
	d.positionId = 0;
	d.positionName = "";
	d.positionType = 1;
	d.positionTypeDesc = "";
	d.authStatus = 0;
	d.status = 0;
	d.avatar = "";
	d.update = updateData.bind(d);
	d.update($dObj);
	return d;

}

function updateData($dObj)
{
	$dObj.hasOwnProperty("userId") && (this.id = $dObj.userId);
	$dObj.hasOwnProperty("logon") && (this.username = $dObj.logon);
	$dObj.hasOwnProperty("mobile") && (this.phone = $dObj.mobile);
	$dObj.hasOwnProperty("roleId") && (this.roleId = $dObj.roleId);
	$dObj.hasOwnProperty("roleName") && (this.roleName = $dObj.roleName);
	$dObj.hasOwnProperty("name") && (this.name = $dObj.name);
	$dObj.hasOwnProperty("authStatus") && (this.authStatus = $dObj.authStatus);
	$dObj.hasOwnProperty("companyId") && (this.companyId = $dObj.companyId);
	$dObj.hasOwnProperty("companyName") && (this.companyName = $dObj.companyName);
	$dObj.hasOwnProperty("departmentId") && (this.departmentId = $dObj.departmentId);
	$dObj.hasOwnProperty("departmentName") && (this.departmentName = $dObj.departmentName);
	$dObj.hasOwnProperty("dutyId") && (this.dutyId = $dObj.dutyId);
	$dObj.hasOwnProperty("dutyName") && (this.dutyName = $dObj.dutyName);
	$dObj.hasOwnProperty("status") && (this.status = $dObj.status);
	$dObj.hasOwnProperty("stationId") && (this.positionId = $dObj.stationId);
	$dObj.hasOwnProperty("stationName") && (this.positionName = $dObj.stationName);
	$dObj.hasOwnProperty("stationType") && (this.positionType = $dObj.stationType);
	$dObj.hasOwnProperty("stationTypeDesc") && (this.positionTypeDesc = $dObj.stationTypeDesc);
	$dObj.hasOwnProperty("avatar") && (this.avatar = $dObj.avatar);
}