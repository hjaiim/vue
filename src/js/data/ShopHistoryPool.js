import g from './../../global';

var _hash = {};
export default class ShopHistoryPool {
	constructor()
	{

	}

	update($dObj, $page)
	{
		for (var key in $dObj)
		{
			if (key == 'activity' || key == 'newFood')
			{
				var history = _hash[key];
				if (!history)
				{
					_hash[key] = {};

				}

				history = _hash[key];

				if ($dObj[key].list)
				{
// 					trace($dObj[key].list);
					for (var item of $dObj[key].list)
					{
						item.createDate = g.timeTool.getDate(item.createTime - 86400, true)
						item.createTime = item.createTime - 86400;
					}
				}

				history[$page] = $dObj[key];

			}
			else
			{
				_hash[key] = $dObj[key];
			}
		}
	}

	getShopBy($startDate, $endDate, $name, $page)
	{
		if ($name == 'startCost' || $name == 'carryCost')
		{
			var list = [];
			timeList = [];
			for (var item of _hash[$name])
			{
				list.push(item.value);
				timeList.push(g.timeTool.getDate(item.createTime - 86400, true));
			}
			if ($page)
			{
				var pageSize = g.data.constPool.getDataById('pageSize_log');
				var data = {};
				var start = ($page - 1) * pageSize;
				var end = $page * pageSize;
				data.list = list.slice(start, end);
				data.total = list.length;
				data.timeList2 = timeList.slice(start, end);

				var timeList = [];
				for (var i = 0; i < data.timeList2.length; i++)
				{
					if (data.timeList2[i - 1])
					{
						var time = data.timeList2[i] + ' - ' + data.timeList2[i - 1];
						timeList.push(time);
					}
					else
					{
						var time = data.timeList2[i] + ' - 至今';
						timeList.push(time);
					}
				}
				data.timeList = timeList;
				return data;
			}
			else
			{

				if (timeList[timeList.length - 1] != g.timeTool.getDate(g.timeTool.getNowStamp() - 86400, true))
				{
					timeList.unshift(g.timeTool.getDate(g.timeTool.getNowStamp() - 86400, true));
					list.unshift(list[0]);
				}
				;

				var newList = [];
				for (var i = 0; i < _hash[$name].length; i++)
				{
					var obj = {
						value: _hash[$name][i].value,
						createTime: _hash[$name][i].createTime,
						createDate: _hash[$name][i].createDate
					};
					newList.push(obj);
				}

				var date = g.timeTool.getDate(g.timeTool.getNowStamp(), true);
				date = new Date(Date.parse(date.replace(/-/g, "/")));
				var createTime = date.getTime();
				newList.unshift({
					value: newList[0].value,
					createTime:String(createTime).substring(0, 10),
					createDate: g.timeTool.getDate(g.timeTool.getNowStamp(), true)
				});

				var list = [];

				for (var i = 0; i <newList.length; i++)
				{

					var date = newList[i].createDate;
					date = new Date(Date.parse(date.replace(/-/g, "/")));
					var createTime = date.getTime() - 86400;
					var obj = {
						value: newList[i].value,
						createTime: String(createTime).substring(0, 10),
						createDate: newList[i].createDate
					}
					list.push(obj);
				}


				function setArr($list)
				{
					var timeArr = [], tempArr = [], testArr = [];
					$list.forEach(($item) => {
						timeArr.push($item.createTime);
						testArr.push($item.value);
					})
// 					trace(timeArr,testArr);

					for (var j = 0; j < timeArr.length - 1; j++)
					{
						var temp = testArr[j];
						for (var i = 1; i <= parseInt((timeArr[j + 1] - timeArr[j] - 86400) / 86400); i++)
						{
							var a = {
								value: temp,
								createTime: Number(timeArr[j]) + 86400 * i,
								createDate: g.timeTool.getDate(Number(timeArr[j]) + 86400 * i, true)
							};
							tempArr.push(a);
						}
					}
					;
					for (var i = 0; i < $list.length; i++)
					{
						var newObj = {
							value: $list[i].value,
							createTime: $list[i].createTime,
							createDate: g.timeTool.getDate($list[i].createTime, true)
						};
						tempArr.push(newObj);
					}
					;

					tempArr.sort(function ($item1, $item2) {
						if ($item1.createTime > $item2.createTime)
						{
							return -1
						}
						else if ($item1.createTime < $item2.createTime)
						{
							return 1
						}
						return 0
					});
					return tempArr;
				}

				var newList = setArr(list.reverse());

				timeList = [];
				list = [];
				for (var i = 0; i < newList.length; i++)
				{
					timeList.push(newList[i].createDate);
					list.push(newList[i].value)
				}
				return {
					timeList: timeList.reverse(),
					dataList: list.reverse()
				};
			}
		}
		else
		{
			var timeList = g.func.getDays($startDate, $endDate);
			var dataList = {};
			for (var i = 0; i < timeList.length; i++)
			{
				dataList[timeList[i]] = 0;
			}

			for (var item of _hash[$name])
			{
				for (var key in dataList)
				{
					if (g.timeTool.getDate(item.createTime - 86400, true) == key)
					{
						dataList[key] = item.value;
					}
				}
			}

			var list = [];
			for (var key in dataList)
			{
				list.push(dataList[key]);
			}

			list = list.reverse();
			timeList = timeList.reverse();

			if ($page)
			{
				var pageSize = g.data.constPool.getDataById('pageSize_log');
				var data = {};
				var start = ($page - 1) * pageSize;
				var end = $page * pageSize;
				data.list = list.slice(start, end);
				data.total = list.length;
				data.timeList = timeList.slice(start, end);
				return data;
			}
			else
			{
				return {
					timeList: timeList.reverse(),
					dataList: list.reverse()
				};
			}

		}

	}

	getActivityBy($page)
	{
		if (_hash['activity'][$page])
		{
			return _hash['activity'][$page];
		}
		else
		{
			return false;
		}
	}

	getNewFoodBy($page)
	{
		if (_hash['newFood'][$page])
		{
			return _hash['newFood'][$page];
		}
		else
		{
			return false;
		}

	}

	removeAll()
	{
		_hash = {};
	}

}

function createData($dObj)
{
	var d = {};
	d.id = $dObj.shopId || '';
	d.name = $dObj.shopName || '';
	d.oneWeekNew = []
	return d;
}


