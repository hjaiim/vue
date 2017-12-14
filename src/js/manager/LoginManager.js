/**
 * Created by Scc on 2017/3/28.
 */
import g from "../../global";

var _isLogin = false;
var _lastUrl = "";

function init($callback)
{

	g.addEventListener("APP_IS_LOGIN", onAppLogin_global);
	$callback();
	g.net.call('user/queryUserIsLogin').then((d) =>
	{
		_isLogin = true;
// 		g.data.userInfo.update(d);
		$callback();
	}, (error) =>
	{
		_isLogin = false;
		$callback();
	});
}

function checkLogin($to, $next, $callBack)
{
	_lastUrl = "";
	var passUrl = ['/login', '/resetpwd', '/register']
	if (_isLogin)
	{
		//当前已登录
		if (passUrl.indexOf($to.path) >= 0) //判断当前页面是否是login页面
		{
			if (g.data.userInfo.authStatus !== 2)
			{
				$next("/verify")
			}
			else
			{
				$next("/");
			}
		}
		else
		{
			$callBack && $callBack();
		}
	}
	else
	{
		//当前未登录
		if (passUrl.indexOf($to.path) < 0) //判断当前是否登录页
		{
			_lastUrl = $to.path;  //记录当前页地址
			$next("/login");
		}
		else
		{
			//当前在登录
			$next();
		}
	}
}

//是否跳登录页，是否监听登录
export function logout()
{
	g.net.call("user/loginOut").then((d) =>
	{
		_isLogin = false;
		clearLoginInfo();
		g.url = "/login";
	}, (err) =>
	{
	});
}

function onAppLogin_global(e)
{
	_isLogin = true;
	g.data.initStaticData();
	if (_lastUrl != "")
	{
		g.url = _lastUrl;
	}
	else if (g.data.userInfo.authStatus !== 2)
	{
		$next("/verify")
	}
	else
	{
		$next("/");
	}
}

function clearLoginInfo()
{
	g.data.clear("loginTime");
	g.data.clear("userInfo");
	g.data.clear('globalParams');
	g.data.clearAll();
}

var d = {
	init: init,
	logout: logout,
	checkLogin: checkLogin

};
defineProperty(d, "isLogin", () =>
{
	return _isLogin;
})

export default d;