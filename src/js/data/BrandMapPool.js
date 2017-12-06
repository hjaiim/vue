import g from './../../global';
var _hash = {};
export default class BrandPool {
	constructor()
	{

	}

	update($dObj,$plat)
	{
		if (!_hash[$plat])
		{
			_hash[$plat] = $dObj;
		}
	}

	getDataById($plat)
	{
		return _hash[$plat];
	}
	getAreaDataById($brandId)
	{
		var dataList  = [];
		for(var index in _hash[$brandId].areaList){
			var name = g.data.staticAreaPool.getDataById(index).name;
			if(name.indexOf("省")!=-1||name=='上海市'){
				name = name.substr(0, name.length - 1);
			}
			var item ={
				name:name,
				value:_hash[$brandId].areaList[index]
			}
			dataList.push(item);
		}


		return dataList;
	}
	removeAll()
	{
		_hash = {}
	}
}

