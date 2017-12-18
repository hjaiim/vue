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
	_params.roleId = g.data.userInfo.roleId;
	var promise = new Promise((resolved, rejected) =>
	{
		g.net.call("user/queryUserListByPage", _params).then(($data) =>
		{
			g.data.searchAccountPool.removeAll();
			g.data.searchAccountPool.update($data);
			resolved();
		}, (err) =>
		{
			rejected();
		})
	});

	return promise;

}

function createData($dObj)
{
	var d = {};
	d.name = "jasmine";
// 	d.stationType = JSON.stringify([-1,1,2]);
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
// 	$dObj.hasOwnProperty("typeList") && (this.stationType = $dObj.typeList);
	$dObj.hasOwnProperty("page") && (this.page = $dObj.page);
}

