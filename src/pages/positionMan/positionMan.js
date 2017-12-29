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
	_params = createData($params);
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
	$dObj = $dObj || {};
	d.page = $dObj.page || 1;
	d.pageSize = $dObj.pageSize || g.param.pageSize;
	return d;
}
