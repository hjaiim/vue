import g from "./../../global";
import loginManager from "./../../js/manager/LoginManager";
var _params = null;
export default function (to, next)
{

	loginManager.checkLogin(to, next, () =>
	{
		searchUnverifyList(to.query).then(() =>
		{
			next();
		})
	})

}

export function searchUnverifyList($params)
{

	_params = createData($params);
	var promise = new Promise((resolved, rejected) =>
	{
		g.ui.showLoading()
		g.net.call("user/queryUserAuthListByPage", _params).then(($data) =>
		{
			g.ui.hideLoading();
			g.data.searchUnverifyPool.removeAll();
			g.data.searchUnverifyPool.update($data);
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
	d.name =$dObj.name ||  "";
	d.pageSize = $dObj.pageSize || g.param.pageSize;
	d.page = $dObj.page || 1;
	return d;
}
