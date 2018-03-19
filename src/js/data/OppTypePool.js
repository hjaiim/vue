/**
 * Created by Administrator on 2017/6/8.
 */

var _hash = {};
var _list = [];
var _tradeTypeList = [];
export default class OppTypePool {
	constructor()
	{

	}

	init($obj)
	{
		$obj.hasOwnProperty("tradeTypeList") && (_tradeTypeList = $obj.tradeTypeList);
		for (var item of $obj.businessTypeList)
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

	remove($navId)
	{
		var itemData = _hash[$navId];
		if (_list.indexOf(itemData) >= 0)
		{
			_list.splice(_list.indexOf(itemData), 1)
		}
	}

	getChildNameById($id,$childId)
	{
		let childList = _hash[$id].child;
		for(var i =0;i<childList.length;i++){
			if(childList[i].id ==$childId){
				return childList[i].name
			}
		}
	}
	getDataById($id){
		return _hash[$id]
	}
	
	get list()
	{
		return _list;
	}
	
	get tradeTypeList()
	{
		return _tradeTypeList;
	}


	removeAll()
	{
		_hash = {};
		_list = [];
	}

}

function createData($obj)
{
	var d = {};
	d.id = $obj.businessId;
	d.name = $obj.businessName;
	//更改child内的字段名
	if($obj.hasOwnProperty('child')){
		d.child = [];
		for(var i =0;i<$obj.child.length;i++){
			d.child.push( createData($obj.child[i]));
		}
	}

	return d;
}

