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
			if($data.companyList)
			{
				g.data.companyPool.update($data.companyList);
			}
			if($data.departmentList)
			{
				g.data.departmentPool.update($data.departmentList);
			}
			if($data.dutyList)
			{
				g.data.dutyPool.update($data.dutyList);
			}

			resolved()
		}, (err) =>
		{
			rejected();
		})
	})
	return promise;
}