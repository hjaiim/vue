import g from './../../global';
var _hash = {};  //brandId:{item}
var _shopHash = {};

export default class SearchPlatPool {
	constructor()
	{

	}

	update($listObj,$brandId,$area,$page)
	{

		var brandPool=_hash[$brandId];
		if(!brandPool)
		{
			_hash[$brandId]={};
			brandPool=_hash[$brandId];
		}

		var areaPool=brandPool[$area];
		if(!areaPool)
		{
			brandPool[$area]={total:$listObj.total};
			areaPool=brandPool[$area];
		}
		var pageList=areaPool[$page];
		if(!pageList)
		{
			areaPool[$page]=[];
			pageList=areaPool[$page];
		}

		for (var $shopItem of $listObj.list)
		{
			_shopHash[$shopItem.shopId] = $shopItem;
			pageList.push($shopItem.shopId);
		}
	}

	getShopListBy($brandId,$area,$page)
	{
		var brandPool=_hash[$brandId];
		if(brandPool)
		{
			var areaPool=brandPool[$area];
			if(areaPool)
			{
				var pageList=areaPool[$page];
				if(pageList)
				{
					return {totalPage:areaPool.total,list:pageList};
				}
				return null;
			}
			return null;
		}
		return null;
	}

	getShopById($shopId)
	{
		return _shopHash[$shopId];
	}

	removeAll()
	{
		_hash = {};  //brandId:{item}
		_shopHash = {};
	}
}

