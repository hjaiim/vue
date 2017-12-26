import g from "./../../global";
import loginManager from "./../../js/manager/LoginManager";
var _params = null;
export default function (to, next)
{
	loginManager.checkLogin(to, next, () =>
	{
		searchBusinessList(to.query).then(() =>
		{
			next();
		})
	})

}

export function searchBusinessList($params)
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
		g.net.call("bo/auditOrderList", _params).then(($data) =>
		{
			g.ui.hideLoading();
			g.data.searchBusinessPool.removeAll();
			g.data.searchBusinessPool.update($data);
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
	d.businessId = -1;
	d.auditStatusList = [-1, 1, 2].join(',');
	d.startTime = g.timeTool.getFullDate(1483200000000, true);
	d.endTime = g.timeTool.getFullDate(Date.now(), true);
	d.custComName = "";
	d.creatorName = "";
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

	$dObj.hasOwnProperty("companyName") && (this.custComName = $dObj.companyName);
	$dObj.hasOwnProperty("type") && (this.businessId = $dObj.type);
	$dObj.hasOwnProperty("statusList") && (this.auditStatusList = JSON.parse($dObj.statusList).join(','));
	$dObj.hasOwnProperty("startTime") && (this.startTime = g.timeTool.getFullDate(int($dObj.startTime), true));
	$dObj.hasOwnProperty("endTime") && (this.endTime = g.timeTool.getFullDate(int($dObj.endTime)), true);
	$dObj.hasOwnProperty("creatorName") && (this.creatorName = $dObj.creatorName);
	$dObj.hasOwnProperty("page") && (this.page = $dObj.page);
	$dObj.hasOwnProperty("pageSize") && (this.pageSize = $dObj.pageSize);
}

