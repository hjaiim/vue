
import g from './../../global';
var _hash = {};
export default class ShopDetailPool {
	constructor()
	{

	}

	update($Obj)
	{
		if(!_hash[$Obj.id]){
			_hash[$Obj.id] = $Obj;
		}

	}

	getShopDetailBy($shopId)
	{
		return _hash[$shopId]
	}

	getNewListBy($shopId,$page,$pageSize)
	{
		var start = ($page-1)*$pageSize;
		var end = $page*$pageSize;
		return _hash[$shopId].oneWeekNew.slice(start,end);
	}

	removeAll()
	{
		_hash = {};
	}
}

