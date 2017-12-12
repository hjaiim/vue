var _list = [], _hash = {};
var _total = 0, _totalPage = 1;
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
	d.company = "";
	d.department = "";
	d.position = "";
	d.dutyName = "";
	d.dutyType = "";
	d.role = "";
	d.update = updateData.bind(d);
	d.update($dObj);
	return d;

}

function updateData($dObj)
{
	$dObj.hasOwnProperty("id") && (this.id = $dObj.id);
	$dObj.hasOwnProperty("id") && (this.name = $dObj.id);
	$dObj.hasOwnProperty("id") && (this.company = $dObj.id);
	$dObj.hasOwnProperty("id") && (this.department = $dObj.id);
	$dObj.hasOwnProperty("id") && (this.position = $dObj.id);
	$dObj.hasOwnProperty("id") && (this.dutyName = $dObj.id);
	$dObj.hasOwnProperty("id") && (this.dutyType = $dObj.id);
	$dObj.hasOwnProperty("id") && (this.role = $dObj.id);
}