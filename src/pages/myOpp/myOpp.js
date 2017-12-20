import g from "./../../global";
import loginManager from "./../../js/manager/LoginManager";
var _params = null;
export default function (to, next)
{
	loginManager.checkLogin(to, next, () =>
	{
		getMyBusinessList(to.query).then(() =>
		{
			next();
		})
	})

}

export function getMyBusinessList($params)
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
		g.net.call("bo/myOrderList", _params).then(($data) =>
		{
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
	d.auditStatusList = [-1,1,2].join(',');
	d.startTime = g.timeTool.getFullDate(1400000000,true);
	d.endTime = g.timeTool.getFullDate(Date.now(),true);
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
	$dObj.hasOwnProperty("customerName") && (this.comName = $dObj.customerName);
	$dObj.hasOwnProperty("statusList") && (this.auditStatusList =JSON.parse($dObj.statusList).join(','));
	$dObj.hasOwnProperty("startTime") && (this.startTime = $dObj.startTime);
	$dObj.hasOwnProperty("endTime") && (this.endTime = $dObj.endTime);
	$dObj.hasOwnProperty("creatorName") && (this.creatorName = $dObj.creatorName);
	$dObj.hasOwnProperty("page") && (this.page = $dObj.page);
	$dObj.hasOwnProperty("pageSize") && (this.pageSize = $dObj.pageSize);
}

