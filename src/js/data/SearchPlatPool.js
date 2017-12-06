import g from './../../global';
export default class SearchPlatPool {
	constructor()
	{
		this.hash = {};
		this.shopHash = {}
	}

	update($listObj, $brandId, $area, $page)
	{
		var brandPool = this.hash[$brandId];
		if (!brandPool)
		{
			this.hash[$brandId] = {};
			brandPool = this.hash[$brandId];
		}

		var areaPool = brandPool[$area];
		if (!areaPool)
		{
			brandPool[$area] = {total: $listObj.totalNum};
			areaPool = brandPool[$area];
		}

		var pageList = areaPool[$page];
		if (!pageList)
		{
			areaPool[$page] = [];
			pageList = areaPool[$page];
		}
		for (var $shopItem of $listObj.list)
		{
			if (!this.shopHash[$shopItem.id])
			{
				this.shopHash[$shopItem.id] = $shopItem;
			}
			if (pageList.indexOf($shopItem.id) < 0)
			{
				pageList.push($shopItem.id)
			}
		}
	}

	getShopListBy($brandId, $area, $page)
	{
		var brandPool = this.hash[$brandId];
		if (brandPool)
		{
			var areaPool = brandPool[$area];
			if (areaPool)
			{
				var pageList = areaPool[$page];
				if (pageList)
				{
					return {total: areaPool.total, list: pageList};
				}
				return null;
			}
			return null;
		}
		return null;
	}

	getShopById($shopId)
	{
		return this.shopHash[$shopId];
	}

	removeAll()
	{
		this.hash = {};
		this.shopHash = {}
	}
}

