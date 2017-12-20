import g from "./../../global";
import loginManager from "./../../js/manager/LoginManager";
var _params = null;
export default function (to, next)
{
	loginManager.checkLogin(to, next, () =>
	{
		searchUserList(to.query).then(() =>
		{
			next();
		})
	})

}

export function searchUserList($data)
{
	if (_params)
	{
		_params.update($data)
	}
	else
	{
		_params = createData($data);
	}
	var promise = new Promise((resolved, rejected) =>
	{
		g.net.call("user/queryUserListByPage", _params).then(($data) =>
		{
			g.data.searchAccountPool.removeAll();
			g.data.searchAccountPool.update($data);
			resolved();
		}, (err) =>
		{
			g.func.dealErr(err);
			rejected();
		})
	});

	return promise;

}

function createData($dObj)
{
	var d = {};
	d.name = "";
	d.stationType = [-1,1,2].join(",");
	d.roleId =0;
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

