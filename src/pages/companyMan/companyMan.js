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
		g.net.call("organizeQuery/organizePageList", _params).then(($data) =>
		{
			g.data.searchCompanyPool.removeAll();
			g.data.searchCompanyPool.update($data);
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
	d.comName = "";
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
	$dObj.hasOwnProperty("customerName") && (this.comName = $dObj.customerName);
	$dObj.hasOwnProperty("page") && (this.page = $dObj.page);
	$dObj.hasOwnProperty("pageSize") && (this.pageSize = $dObj.pageSize);
}

