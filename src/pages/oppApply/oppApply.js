import g from "./../../global";
import loginManager from "./../../js/manager/LoginManager";
var _params = null;
export default function (to, next)
{
	loginManager.checkLogin(to, next, () =>
	{
		if (to.query.id)
		{
			getBusinessDetail(to.query).then(() =>
			{
				next();
			})
		}
		else
		{
			next();
		}

	})

}

export function getBusinessDetail($params)
{
	_params = createData($params);
	var promise = new Promise((resolved, rejected) =>
	{
		g.ui.showLoading()
		g.net.call("bo/viewOrderDetail", _params).then(($data) =>
		{
			g.ui.hideLoading();
			var data = g.data.searchBusinessPool.getDataById(_params.orderId);
			if (data)
			{
				data.update($data);
			}
			else
			{
				g.data.searchBusinessPool.add($data);
			}
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
	d.orderId = $dObj.id || 0;
	return d;
}

