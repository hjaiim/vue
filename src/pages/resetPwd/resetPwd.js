import g from "./../../global";
import loginManager from "./../../js/manager/LoginManager";
export default function (to, next)
{
	loginManager.checkLogin(to, next, () =>
	{

	})
}