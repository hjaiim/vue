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
		g.net.call("bo/auditOrderDetail", _params).then(($data) =>
		{
			g.ui.hideLoading();
			g.data.searchCompanyPool.getDataById(_params.id).update($data);
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
	d.orderId = 0;
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
	$dObj.hasOwnProperty("id") && (this.orderId = $dObj.id);
}

