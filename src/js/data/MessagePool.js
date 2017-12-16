/**
 * Created by Administrator on 2017/12/11.
 */
var _list = [], _hash = {};
var _total = 0, _totalPage = 1;
export default class MessagePool {
	constructor()
	{

	}

	update($dObj)
	{
		if (!$dObj)
		{
			return;
		}
		$dObj.hasOwnProperty("total") && (_total = $dObj.total);
		$dObj.hasOwnProperty("totalPage") && (_totalPage = $dObj.totalPage);
		for (var item of $dObj.data)
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

	remove($id)
	{
		if (_hash[$id])
		{
			var index = _list.indexOf(_hash[$id]);
			if (index >= 0)
			{
				_list.splice(index, 1);
			}
		}
	}

	getDataById($id)
	{
		return _hash[$id]
	}

	get list()
	{
		return _list;
	}

	get total()
	{
		return _total;
	}

	get totalPage()
	{
		return _totalPage;
	}


	removeAll()
	{
		_list = [];
		_hash = {};
	}
}

function createData($dObj)
{
	var d = {};
	d.id = 0;
	d.userId = 0;
	d.businessId = 0;
	d.title = "";
	d.source = "";
	d.createTime = "";
	d.desc = "";
	d.readStatus = 0;
	d.isShow = false;
	d.update = updateData.bind(d);
	d.update($dObj);
	return d;

}

function updateData($dObj)
{
	$dObj.hasOwnProperty("msgId") && (this.id = $dObj.msgId);
	$dObj.hasOwnProperty("userId") && (this.userId = $dObj.userId);
	$dObj.hasOwnProperty("relationId") && (this.businessId = $dObj.relationId);
	$dObj.hasOwnProperty("msgTitle") && (this.title = $dObj.msgTitle);
	$dObj.hasOwnProperty("msgSource") && (this.source = $dObj.msgSource);
	$dObj.hasOwnProperty("msgContent") && (this.desc = $dObj.msgContent);
	$dObj.hasOwnProperty("sendTime") && (this.createTime = $dObj.sendTime);
	$dObj.hasOwnProperty("readStatus") && (this.readStatus = $dObj.readStatus);
	$dObj.hasOwnProperty("isShow") && (this.isShow = $dObj.isShow);
};

