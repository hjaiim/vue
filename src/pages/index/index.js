import g from "./../../global";
import loginManager from "./../../js/manager/LoginManager";
export default function (to, next)
{
	loginManager.checkLogin(to, next, () =>
	{
		getUserInfo().then(() =>
		{
			next();
		})
	})
}

export function getUserInfo()
{
	var promise = new Promise((resolved, rejected) =>
	{
		g.net.call("user/queryUserInfo").then(($data) =>
		{
			g.data.userInfo.update($data);
			resolved()
		}, (err) =>
		{
			g.func.dealErr(err);
			rejected();
		})
	})
	return promise;
}