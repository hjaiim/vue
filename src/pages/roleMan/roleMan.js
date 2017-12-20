import g from "./../../global";
import loginManager from "./../../js/manager/LoginManager";
var _params = null;
export default function (to, next)
{
	loginManager.checkLogin(to, next, () =>
	{
		searchRoleList(to.query).then(() =>
		{
			getRightList();
			next();
		})
	})

}

export function searchRoleList($params)
{
	if (_params)
	{
		_params.update($params)
	}
	else
	{
		_params = createData($params);
	}
	var promise = new Promise((resolved, rejected) =>
	{
		g.net.call("permission/queryRoleListByPage", _params).then(($data) =>
		{
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
		g.net.call("permission/queryAllPermission").then(($data) =>
		{
			g.data.staticRightPool.update($data.data);
		})
	}
}

function createData($dObj)
{
	var d = {};
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
	$dObj.hasOwnProperty("page") && (this.page = $dObj.page);
	$dObj.hasOwnProperty("pageSize") && (this.pageSize = $dObj.pageSize);
}

