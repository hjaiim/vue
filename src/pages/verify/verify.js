import g from "./../../global";
import loginManager from "./../../js/manager/LoginManager";
var _params = null;
export default function (to, next)
{
	loginManager.checkLogin(to, next, () =>
	{
		getVerifyInfo(to.query).then(() =>
		{
			next();
		})
	})
}
export function getVerifyInfo()
{
	var promise = new Promise((resolved, rejected) =>
	{
		g.net.call("user/queryUserAuthInfo").then(($data) =>
		{
			g.data.userInfo.update($data);
			resolved()
		}, (err) =>
		{
			rejected();
		})
	})
	return promise;
}