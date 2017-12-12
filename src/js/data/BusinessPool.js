var _list = [], _hash = {};
var _total = 0, _totalPage = 1;
export default class BusinessPool {
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

	addRecord($id, $record)
	{
		if (_hash[$id])
		{
			if (_hash[$id].recordList.indexOf($record) < 0)
			{
				_hash[$id].recordList.push($record);
			}
		}
	}

	removeRecord($id, $record)
	{
		if (_hash[$id])
		{
			var index = _hash[$id].recordList.indexOf($record);
			if (index >= 0)
			{
				_hash[$id].recordList.splice(index, 1);
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
		_total = 0;
		_totalPage = 1;
	}
}
function createData($dObj)
{
	var d = {};
	d.id = 0;
	d.type = "";
	d.formData = "";
	d.attachList = [];
	d.createTime = "";
	d.recordList = [];
	d.isCurrAudit = "";
	d.currAuditType = "";
	d.update = updateData.bind(d);
	d.update($dObj);
	return d;

}

function updateData($dObj, $recordId)
{
	$dObj.hasOwnProperty("id") && (this.id = $dObj.id)
	if ($dObj.hasOwnProperty("recordList"))
	{
		g.data.recordPool.update($dObj.recordList);
	}
}
