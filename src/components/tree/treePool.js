var _list = [], _hash = {};

class TreePool {
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
			if (itemData.parentId <= 0)
			{
				_list.push(itemData);
			}
		}

	}

	remove($id)
	{
		var index;
		if (_hash[$id])
		{
			index = _list.indexOf(_hash[$id]);
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
	}
}

function createData($dObj)
{
	var d = {};
	d.id = $dObj.id || 0;
	d.name = $dObj.name || "";
	d.parentId = $dObj.parentId || 0;
	d.children = $dObj.children || [];
	return d;
}

export default new TreePool();