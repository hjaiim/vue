import g from "./../../global";
import loginManager from "./../../js/manager/LoginManager";
var _params = null;
export default function (to, next)
{
	loginManager.checkLogin(to, next, () =>
	{
		searchCompanyList(to.query).then(() =>
		{
			next();
		})
	})

}

export function searchCompanyList($params)
{
	_params = createData($params);
	var promise = new Promise((resolved, rejected) =>
	{
		g.ui.showLoading()
		g.net.call("organizeQuery/organizePageList", _params).then(($data) =>
		{
			g.ui.hideLoading();
			g.data.searchCompanyPool.removeAll();
			g.data.searchCompanyPool.update($data);
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
	d.comName = $dObj.customerName || "";
	d.page = $dObj.page || 1;
	d.pageSize = $dObj.pageSize || g.param.pageSize;
	return d;
}
