import g from "./../../global";
import loginManager from "./../../js/manager/LoginManager";
var _params = null;
export default function (to, next)
{
	loginManager.checkLogin(to, next, () =>
	{
		searchUserList(to.query).then(($data) =>
		{
			next();
		})
	})

}

export function searchUserList($params)
{
	var list = [], _hash = {};
	if (_params)
	{
		_params.update($params)
	}
	else
	{
		_params = createData($params);
	}
	_hash["user/queryUserListByPage"] = _params;
	_hash["permission/queryAllRole"] = {};
	_hash["organizeQuery/queryAllStation"] = {};
	for (var key in _hash)
	{
		var promise = new Promise((resolved, rejected) =>
		{
			g.net.call(key, _hash[key]).then(($data) =>
			{
				resolved($data);
			}, (err) =>
			{
				g.func.dealErr(err);
				rejected();
			})
		});
		list.push(promise);
	}
	var promise = new Promise((resolved, rejected) =>
	{
		g.ui.showLoading()
		Promise.all(list).then(($list) =>
		{
			g.ui.hideLoading();
			g.data.searchAccountPool.removeAll();
			g.data.searchAccountPool.update($list[0]);
			g.data.searchRolePool.removeAll();
			g.data.searchRolePool.update($list[1]);
			g.data.searchPositionPool.removeAll();
			g.data.searchPositionPool.update($list[2])
			resolved();
		}, (err) =>
		{
			rejected();
		});
	});
	return promise;
}

function createData($dObj)
{
	var d = {};
	d.name = "";
	d.stationType = [-1, 1, 2].join(",");
	d.roleId = 0;
	d.page = 1;
	d.pageSize = 10;
	d.update = updateData.bind(d);
	$dObj = __merge({}, $dObj);
	d.update($dObj);
	return d;
}

function updateData($dObj)
{
	if (!$dObj)
	{
		return;
	}
	$dObj.hasOwnProperty("name") && (this.name = $dObj.name);
	$dObj.hasOwnProperty("roleId") && (this.roleId = $dObj.roleId);
	$dObj.hasOwnProperty("typeList") && (this.stationType = JSON.parse($dObj.typeList).join(","));
	$dObj.hasOwnProperty("page") && (this.page = $dObj.page);
}

