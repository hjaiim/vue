export default function (to, next)
{
	getVerifyInfo().then(() =>
	{
		next();
	},(err) => {
		next();

	})
}

export function getVerifyInfo()
{
	var promise = new Promise((resolved, rejected) =>
	{
		g.net.call("user/queryUserAuthInfo").then(($data) =>
		{
			trace($data);
			resolved()
		}, (err) =>
		{
			rejected();
		})
	})
	return promise;
}