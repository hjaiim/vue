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
		g.net.call("bo/auditOrderList", _params).then(($data) =>
		{
			g.data.searchBusinessPool.removeAll();
			g.data.searchBusinessPool.update($data);
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
	d.businessId = 1;
	d.auditStatusList = [];
	d.startTime = g.timeTool.getNowStamp();
	d.endTime = g.timeTool.getNowStamp();
	d.custComName = "";
	d.creatorName = "";
	d.page = 1;
	d.pageSize = 10;
	d.update = updateData.bind(d);
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
	$dObj.hasOwnProperty("auditStatusList") && (this.auditStatusList = $dObj.auditStatusList);
	$dObj.hasOwnProperty("startTime") && (this.startTime = $dObj.startTime);
	$dObj.hasOwnProperty("endTime") && (this.endTime = $dObj.endTime);
	$dObj.hasOwnProperty("creatorName") && (this.creatorName = $dObj.creatorName);
	$dObj.hasOwnProperty("page") && (this.page = $dObj.page);
	$dObj.hasOwnProperty("pageSize") && (this.pageSize = $dObj.pageSize);
}

