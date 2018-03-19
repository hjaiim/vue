import g from "./../../global";
import loginManager from "./../../js/manager/LoginManager";
import {getOppTypeList} from "./../oppApply/oppApply"
var _params = null;
export default function (to, next)
{
	loginManager.checkLogin(to, next, () =>
	{
		let requestArr = [getMyBusinessList(to.query)];
		if(g.data.oppTypePool.list.length==0){
			requestArr.push(getOppTypeList())
		}
		Promise.all(requestArr).then(() =>
		{
			next();
		})
	})
}

export function getMyBusinessList($params)
{
	_params = createData($params);
	var promise = new Promise((resolved, rejected) =>
	{
		g.ui.showLoading()
		g.net.call("bo/myOrderList", _params).then(($data) =>
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
	$dObj = $dObj || {};
	d.businessId = $dObj.busId || -1;
	d.childBusinessId = $dObj.type || -1;
	$dObj.statusList = $dObj.statusList || JSON.stringify([-1, 1, 2]);
	d.auditStatus = JSON.parse($dObj.statusList).join(',');
	$dObj.startTime = int($dObj.startTime) || 1483200000;
	d.startTime = g.timeTool.getFullDate($dObj.startTime, true);
	$dObj.endTime = int($dObj.endTime) || Date.now();
	d.endTime = g.timeTool.getFullDate($dObj.endTime, true);
	d.custComName = $dObj.companyName || "";
	d.page = $dObj.page || 1;
	d.pageSize = $dObj.pageSize || g.param.pageSize;
	return d;
}


