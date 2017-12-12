/**
 * Created by Administrator on 2017/12/11.
 */
var _list = [], _hash = {};
export default class DepartmentPool {

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
			g.data.companyPool.addDepartment(itemData.parentId, itemData);
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
				g.data.companyPool.removeDepartment(itemData.parentId, itemData)
			}
		}
	}

	addDuty($id, $duty)
	{
		if (_hash[$id])
		{
			if (_hash[$id].children.indexOf($duty) < 0)
			{
				_hash[$id].children.push($duty);
			}
		}
	}

	removeDuty($id, $department)
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
	d.parentId = 0;
	d.creatorId = 0;
	d.children = [];
	d.update = updateData.bind(d);
	d.update($dObj);
	return d;

}

function updateData($dObj)
{
	$dObj.hasOwnProperty("departmenId") && (this.id = $dObj.departmenId)
	$dObj.hasOwnProperty("departmentName") && (this.name = $dObj.departmentName)
	$dObj.hasOwnProperty("companyId") && (this.parentId = $dObj.companyId)
	$dObj.hasOwnProperty("creatorId") && (this.creatorId = $dObj.creatorId)
	if ($dObj.hasOwnProperty("dutyResultList"))
	{
		g.data.dutyPool.update(children.dutyResultList);
	}
}