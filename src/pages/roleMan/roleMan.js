import g from "./../../global";
import loginManager from "./../../js/manager/LoginManager";
var _params = null;
export default function (to, next)
{
	loginManager.checkLogin(to, next, () =>
	{
		debugger;
		searchRoleList(to.query).then(() =>
		{
			getRightList();
			next();
		})
	})

}

export function searchRoleList($params)
{
	_params = createData($params);
	var promise = new Promise((resolved, rejected) =>
	{
		g.ui.showLoading();
		g.net.call("permission/queryRoleListByPage", _params).then(($data) =>
		{
			g.ui.hideLoading();
			g.data.searchRolePool.removeAll();
			g.data.searchRolePool.update($data);
			resolved();
		}, (err) =>
		{
			g.func.dealErr(err);
			rejected();
		})
	});
	return promise;
}

function getRightList()
{
	if (g.data.staticRightPool.list.length > 0)
	{
		return;

	}
	else
	{
		g.ui.showLoading()
		g.net.call("permission/queryAllPermission").then(($data) =>
		{
			g.ui.hideLoading();
			g.data.staticRightPool.update($data.data);
		}, (err) =>
		{
			g.func.dealErr(err);
		})
	}
}

function createData($dObj)
{
	var d = {};
	$dObj = $dObj || {};
	d.page = $dObj.page || 1;
	d.pageSize = $dObj.pageSize || 10;
	return d;
}

