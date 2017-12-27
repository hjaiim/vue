/**
 * Created by Administrator on 2017/12/11.
 */
var _listData = [];
var _hash = {};
var _totalNum = 0;
var _totalPages = 1;
export default class SearchCompanyPool {
	constructor()
	{
		_listData = [];
		_hash = {};
		_totalNum = 0;
		_totalPages = 1;
	}

	update($dObj)
	{
		if (!$dObj)
		{
			return;
		}
		$dObj.hasOwnProperty("total") && (_totalNum = $dObj.total);
		$dObj.hasOwnProperty("totalPage") && (_totalPages = $dObj.totalPage);
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
			_listData.push(itemData);
		}

	}

	remove($id)
	{
		if (_hash[$id])
		{
			var index = _listData.indexOf(_hash[$id]);
			if (index >= 0)
			{
				_listData.splice(index, 1);
			}
		}
	}

	addDepartment($id, $department)
	{
		debugger;
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
		return _hash[$id] && _hash[$id].children.length > 0;
	}

	get list()
	{
		return _listData;
	}

	get total()
	{
		return _totalNum;
	}

	get totalPage()
	{
		return _totalPages;
	}

	removeAll()
	{
		_listData = [];
		_hash = {};
		_totalNum = 0;
		_totalPages = 1;
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
	d.telphone = "";
	d.departCount = 0;
	d.dutyCount = 0;
	d.isShow = false;
	d.isEdit = false;
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
	$dObj.hasOwnProperty("comLinkTel") && (this.telphone = $dObj.comLinkTel);
	$dObj.hasOwnProperty("departmentCount") && (this.departCount = $dObj.departmentCount);
	$dObj.hasOwnProperty("dutyCount") && (this.dutyCount = $dObj.dutyCount);
	$dObj.hasOwnProperty("isShow") && (this.isShow = $dObj.isShow);
	$dObj.hasOwnProperty("isEdit") && (this.isEdit = $dObj.isEdit);
}
