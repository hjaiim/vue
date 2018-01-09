import loginManager from "./../../js/manager/LoginManager";
export default function (to, next)
{
	loginManager.initLogin(to, next, () =>
	{
		next();
	})
}