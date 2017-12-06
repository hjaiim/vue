import g from './../../global';
var _hash = {};
var _shopHash = {};
var _totalHash = {};
export default class SearchShopPool {
	constructor()
	{

	}

	update($Obj, $totalObj, $page)
	{
		if ($Obj)
		{
			var idList = g.data.constPool.getDataById('platList');
			for (var item of idList)
			{
				var platFormPool = _hash[item.id];
				if (!platFormPool)
				{
					_hash[item.id] = {};
					platFormPool = _hash[item.id];

				}
				var totalPool = _totalHash[item.id];
				if (!totalPool)
				{
					_totalHash[item.id] = $totalObj[item.id];
				}
				var pageListPool = platFormPool[$page]
				if (!pageListPool)
				{
					platFormPool[$page] = [];
					pageListPool = platFormPool[$page];
				}
				for (var shopItem of $Obj[item.id])
				{
					if (!_shopHash[shopItem.id])
					{
						_shopHash[shopItem.id] = shopItem;
						pageListPool.push(shopItem.id);
					}

				}

			}
		}

	}

	getShopListBy($platFromId, $page)
	{
		var platFormPool = _hash[$platFromId];
		if (platFormPool)
		{
			var pageList = platFormPool[$page];
			if (pageList)
			{
				return {id: $platFromId, list: pageList, total: _totalHash[$platFromId]};
			}
			return null;
		}
		return null;
	}
	

	getCurrent($platFromId)
	{
		return _currentHash[$platFromId];

	}

	getShopBy($shopId)
	{
		return _shopHash[$shopId];
	}

	removeAll()
	{
		_hash = {};
		_shopHash = {};
		_totalHash = {};
	}

}

