/**
 * Created by Administrator on 2017/12/11.
 */
var _list = [], _hash = {};
import g from './../../global';
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
			g.data.searchCompanyPool.addDepartment(itemData.parentId, itemData);
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
				g.data.searchCompanyPool.removeDepartment(_hash[$id].parentId, _hash[$id])
				g.data.companyPool.removeDepartment(_hash[$id].parentId, _hash[$id])
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
	d.isEdit = false;
	d.creatorId = 0;
	d.dutyName = "";
	d.errMsg = "";
	d.departMsg = "";
	d.children = [];
	d.update = updateData.bind(d);
	d.update($dObj);
	return d;

}

function updateData($dObj)
{

	$dObj.hasOwnProperty("departmentId") && (this.id = $dObj.departmentId);
	$dObj.hasOwnProperty("departmentName") && (this.name = $dObj.departmentName);
	$dObj.hasOwnProperty("companyId") && (this.parentId = $dObj.companyId);
	$dObj.hasOwnProperty("creatorId") && (this.creatorId = $dObj.creatorId);
	$dObj.hasOwnProperty("isEdit") && (this.isEdit = $dObj.isEdit);
	$dObj.hasOwnProperty("dutyName") && (this.dutyName = $dObj.dutyName);
	$dObj.hasOwnProperty("errMsg") && (this.errMsg = $dObj.errMsg);
	$dObj.hasOwnProperty("departMsg") && (this.departMsg = $dObj.departMsg);
	if ($dObj.hasOwnProperty("organizeDutyResults"))
	{
		setTimeout(() =>
		{
			g.data.dutyPool.update($dObj.organizeDutyResults);
		}, 200);
// 		var duty = new Duty();
// 		this.children = duty.update($dObj.organizeDutyResults);
	}
}

// class Duty{
// 	constructor()
// 	{
// 		this.hash = {};
// 		this.list = [];
// 	}
// 	update($list)
// 	{
// 		for(var item of $list)
// 		{
// 			this.add(item);
// 		}
// 		return this.list;
// 	}
// 	add($item)
// 	{
// 		var item = createDuty($item);
// 		if(this.list.indexOf(item) < 0)
// 		{
// 			this.list.push(item)
// 			this.hash[item.id] = item;
// 		}
// 	}
//
// 	remove($id)
// 	{
// 		if(this.list.indexOf(this.hash[$id]) > 0)
// 		{
// 			this.list.splice(this.list.indexOf(this.hash[$id]),1);
// 		}
// 	}
//
// }
//
// function createDuty($dObj)
// {
// 	var d = {};
// 	d.id = 0;
// 	d.name = "";
// 	d.parentId = 0;
// 	d.companyId = 0;
// 	d.creatorId = 0;
// 	d.update = updateDuty.bind(d);
// 	d.update($dObj);
// 	return d;
// }
//
// function updateDuty($dObj)
// {
// 	$dObj.hasOwnProperty("dutyId") && (this.id = $dObj.dutyId);
// 	$dObj.hasOwnProperty("dutyName") && (this.name = $dObj.dutyName);
// 	$dObj.hasOwnProperty("companyId") && (this.companyId = $dObj.companyId);
// 	$dObj.hasOwnProperty("departmentId") && (this.parentId = $dObj.departmentId);
// 	$dObj.hasOwnProperty("creatorId") && (this.creatorId = $dObj.creatorId);
// }