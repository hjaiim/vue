import g from "./../../global";
var _params = null;
export default function (to, next)
{
	next();
	debugger;
	searchUnverifyList(to.query).then(() =>
	{
		next();
	})
}

export function searchUnverifyList($params)
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
		g.net.call("user/queryUserAuthListByPage", _params).then(($data) =>
		{
			g.data.searchUnverifyPool.removeAll();
			g.data.searchUnverifyPool.update($data);
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
	d.name = "";
	d.pageSize = 10;
	d.page = 1;
	d.update = updateData.bind(d);
	d.update($dObj);
	return d;
}

function updateData($dObj)
{
	$dObj.hasOwnProperty("name") && (this.name = $dObj.name);
	$dObj.hasOwnProperty("pageSize") && (this.pageSize = $dObj.pageSize);
	$dObj.hasOwnProperty("page") && (this.page = $dObj.page);
}
