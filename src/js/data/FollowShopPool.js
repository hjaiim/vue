import g from "./../../global";
var _hash = {};
var _shopHash = {};
var _currentHash = {};
export default class FollowShopPool {
	constructor()
	{

	}

	update($Obj)
	{
		if ($Obj)
		{
			var idList = g.data.constPool.getDataById('platList');
			for (var item of idList)
			{
				var platFormPool = _hash[item.id];
				if (!platFormPool)
				{
					_hash[item.id] = [];
					_currentHash[item.id] = 0;
				}

				for (var shopItem of $Obj[item.id])
				{
					if (!_shopHash[shopItem.id])
					{
						_shopHash[shopItem.id] = shopItem;
						_hash[item.id].push(shopItem.id);
						_currentHash[item.id] = _hash[item.id].length;
					}

				}

			}
		}
	}

	addShop($platId, $obj)
	{
		if (!_shopHash[$obj.id])
		{
			_shopHash[$obj.id] = $obj;
			if (!_hash[$platId])
			{
				_hash[$platId] = [];
			}
			_hash[$platId].push($obj.id);
		}
	}

	getShopListBy($platFromId, $page, $pageSize = g.data.constPool.getDataById("pageSize_orderShop"))
	{
		var data = {total:0};
		var platFormPool = _hash[$platFromId];
		if (platFormPool)
		{
			var start = ($page - 1) * $pageSize;
			var end = $page * $pageSize;
			data.id = $platFromId;
			data.list = platFormPool.slice(start, end)
			data.total = platFormPool.length;
		}
		return data;
	}

	getCurrent($platFromId)
	{
		return _currentHash[$platFromId];

	}

	getShopBy($shopId)
	{
		return _shopHash[$shopId];
	}

	getTotal($plat)
	{
		return _hash[$plat] &&_hash[$plat].length;
	}

	removeAll()
	{
		_hash = {};
		_shopHash = {};
		_currentHash = {};
	}

	isFollow($shopId)
	{
		return !!_shopHash[$shopId]
	}
}

