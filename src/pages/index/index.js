export default function (to, next)
{
	getUserInfo().then(() =>
	{
		next();
	})

}

export function getUserInfo()
{
	var promise = new Promise((resolved, rejected) =>
	{
		g.net.call("user/queryUserInfo").then(($data) =>
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