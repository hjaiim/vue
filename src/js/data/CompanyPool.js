/**
 * Created by Administrator on 2017/12/11.
 */

var _list = [], _hash = {};
export default class CompanyPool {
	constructor()
	{

	}

	update($list)
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

	addDepartment($id, $department)
	{
		if (_hash[$id])
		{
			if (_hash[$id].children.indexOf($department) < 0)
			{
				_hash[$id].children.push($department);
			}
		}
	}

	removeDepartment($id, $department)
	{
		if (_hash[$id])
		{
			var index = _hash[$id].children.indexOf($department);
			if (index >= 0)
			{
				_hash[$id].children.splice(index, 1);
			}
		}
	}

	getDataById($id)
	{
		return _hash[$id]
	}

	hasDetail($id)
	{
		return _hash[$id] && _hash[$id].leader;
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
	d.children = [];
	d.parentId = 0;
	d.leader = "";
	d.creatorId = 0;
	d.phone = "";
	d.contact = "";
	d.isShow = false;
	d.update = updateData.bind(d);
	d.update($dObj);
	return d;

}

function updateData($dObj)
{
	$dObj.hasOwnProperty("comId") && (this.id = $dObj.comId);
	$dObj.hasOwnProperty("comName") && (this.name = $dObj.comName);
	$dObj.hasOwnProperty("creatorId") && (this.creatorId = $dObj.creatorId);
	$dObj.hasOwnProperty("comLinkMan") && (this.leader = $dObj.comLinkMan);
	$dObj.hasOwnProperty("comLinkManTel") && (this.phone = $dObj.comLinkManTel);
	$dObj.hasOwnProperty("comLinkTel") && (this.contact = $dObj.comLinkTel);
	$dObj.hasOwnProperty("departmentCount") && (this.departCount = $dObj.departmentCount);
	$dObj.hasOwnProperty("dutyCount") && (this.dutyCount = $dObj.dutyCount);
	$dObj.hasOwnProperty("isShow") && (this.isShow = $dObj.isShow);
}
