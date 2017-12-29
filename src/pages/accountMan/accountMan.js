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
	_params = createData($params);
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
	$dObj = $dObj || {};
	d.name = $dObj.name || "";
	var typeList = $dObj.typeList || "[-1,1,2]";
	d.stationType = JSON.parse(typeList).join(",");
	d.roleId = $dObj.roleId || 0;
	d.page = $dObj.page || 1;
	d.pageSize = $dObj.pageSize || 10;
	return d;
}


