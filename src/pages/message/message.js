import g from "./../../global";
import loginManager from "./../../js/manager/LoginManager";
var _params = null;
export default function (to, next)
{
	loginManager.checkLogin(to, next, () =>
	{
		searchMessageList(to.query).then(() =>
		{
			next();
		})
	})

}

export function searchMessageList($params)
{
	_params = createData($params);
	var promise = new Promise((resolved, rejected) =>
	{
		g.ui.showLoading()
		g.net.call("message/queryMessageListByPage", _params).then(($data) =>
		{
			g.ui.hideLoading();
			g.data.searchMessagePool.removeAll();
			g.data.searchMessagePool.update($data);
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
	var typeList = $dObj.typeList || JSON.stringify([0, 1]);
	d.readStatus = JSON.parse(typeList).join(',');
	d.page = $dObj.page || 1;
	d.pageSize = $dObj.pageSize || g.param.pageSize;
	return d;
}
