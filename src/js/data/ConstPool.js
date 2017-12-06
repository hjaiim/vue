/**
 * Created by billy on 2017/10/26.
 */

var _hash = {};
export default class ConstPool {
	constructor()
	{

	}

	update($dObj)
	{
		if (Array.isArray($dObj))
		{
			_hash["platList"] = $dObj;
		}
		else
		{
			_hash = __merge(_hash, $dObj)
		}
	}

	getDataById($constKey)
	{
		return _hash[$constKey];
	}

	removeAll()
	{
		_hash = {};  //brandId:{item}
	}
}
