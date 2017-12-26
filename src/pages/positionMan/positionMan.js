import g from "./../../global";
import loginManager from "./../../js/manager/LoginManager";
var _params = null;
export default function (to, next)
{
	loginManager.checkLogin(to, next, () =>
	{
		searchPositionList(to.query).then(() =>
		{
			next();
		})
	})

}

export function searchPositionList($params)
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
		g.ui.showLoading()
		g.net.call("organizeQuery/stationPageList", _params).then(($data) =>
		{
			g.ui.hideLoading();
			g.data.searchPositionPool.removeAll();
			g.data.searchPositionPool.update($data);
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

