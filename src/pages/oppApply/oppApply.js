import g from "./../../global";
import loginManager from "./../../js/manager/LoginManager";
var _params = null;
export default function (to, next)
{
	loginManager.checkLogin(to, next, () =>
	{
		next();
		getBusinessDetail(to.query).then(() =>
		{
			next();
		})
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
		g.net.call("bo/auditOrderDetail", _params).then(($data) =>
		{
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
	d.type = 1;
	d.update = updateData.bind(d);
	$dObj = __merge({},$dObj);
	d.update($dObj);
	return d;
}

function updateData($dObj)
{
	if (!$dObj)
	{
		return;
	}
	$dObj.hasOwnProperty("type") && (this.type = $dObj.type);
}

