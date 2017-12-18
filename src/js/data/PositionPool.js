var _list = [], _hash = {};
var _total = 0, _totalPage = 1;
export default class PositionPool {
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
	d.type = 0;
	d.typeDesc = "";
	d.creatorId = 0;
	d.creator = "";
	d.isShow = false;
	d.createTime = "";
	d.update = updateData.bind(d);
	d.update($dObj);
	return d;

}

function updateData($dObj)
{
	$dObj.hasOwnProperty("stationId") && (this.id = $dObj.stationId);
	$dObj.hasOwnProperty("stationName") && (this.name = $dObj.stationName);
	$dObj.hasOwnProperty("creatorId") && (this.creatorId = $dObj.creatorId);
	$dObj.hasOwnProperty("creatorName") && (this.creator = $dObj.creatorName);
	$dObj.hasOwnProperty("isShow") && (this.isShow = $dObj.isShow);
	$dObj.hasOwnProperty("createTime") && (this.createTime = $dObj.createTime);
	if ($dObj.hasOwnProperty("stationType"))
	{
		this.type = $dObj.stationType;
		$dObj.stationType == 1 && (this.typeDesc = "审核岗");
		$dObj.stationType == 2 && (this.typeDesc = "提交岗");
	}
}