import g from './../../global';
var _searchBrandHash = {};
var _brandHash = {};
var _total = 0;
export default class SearchBrandPool {
	constructor()
	{

	}

	update($list, $total, $page)
	{
		if ($list)
		{
			var idListPool = _searchBrandHash[$page];
			if (!idListPool)
			{
				_searchBrandHash[$page] = [];
				_total = $total;
			}

			for (var item of $list)
			{
				if (_searchBrandHash[$page].indexOf(item.id) < 0)
				{
					_searchBrandHash[$page].push(item.id);
					_brandHash[item.id] = item;
				}
			}

		}
	}

	getBrandPageList($page)
	{
		var data = {
			list: _searchBrandHash[$page],
			total: _total
		}
		return data;
	}

	getBrandBy($id)
	{
		return _brandHash[$id];
	}

	removeAll()
	{
		_searchBrandHash = {};
		_brandHash = {};
	}

}

