var _hash = {};
var _list = [];
export default class LangPool {
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

	getDataById($id)
	{
		return _hash[$id];
	}

	get list()
	{
		return _list;
	}


	removeAll()
	{
		_hash = {};  //brandId:{item}
		_list = [];  //brandId:{item}
	}
}

function createData($dObj)
{
	var d = {};
	d.key = $dObj.key || '';
	d.content = $dObj.content || '';
	d.module = $dObj.module || '';
	($dObj.module && $dObj.key) && (d.id = d.module + d.key);
	return d;
}


