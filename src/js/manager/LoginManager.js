/**
 * Created by Scc on 2017/3/28.
 */
import g from "../../global";
var _isLogin = false;
var _lastUrl = "";

function init($callback)
{
	g.addEventListener("APP_IS_LOGIN", onAppLogin_global);

	//假装登录了
	_isLogin = true;
	$callback && $callback();

//	g.net.calls('user/queryUserIsLogin',"user/getUserInfoByRefresh").then(($list) =>
//	{
//		_isLogin = true;
//		g.data.userInfo.update($list[1]);
//		$callback && $callback();
//	}, (err) =>
//	{
//		_isLogin = false;
//		$callback && $callback()
//	});
}

function checkLogin($to, $next, $callBack)
{

	_isLogin = true;
	initLogin($to, $next, $callBack);
//	g.net.call('user/queryUserIsLogin').then((d) =>
//	{
//		_isLogin = true;
//		g.data.userInfo.update(d);
//		initLogin($to, $next, $callBack);
//	}, (err) =>
//	{
//		_isLogin = false;
//		g.func.dealErr(err);
//		initLogin($to, $next, $callBack);
//	});
}

function initLogin($to, $next, $callBack)
{
	_lastUrl = "";
	var passUrl = ['/login'];
	if (_isLogin)
	{
		if (passUrl.indexOf($to.path) >= 0) //判断当前页面是否是login页面
		{
			$next("/");
		}
		else
		{
			$callBack && $callBack();//去'当前页'
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
		_isLogin = false;
		clearLoginInfo();
		g.url = "/login";
	});
}

export function forceExit()
{
	_isLogin = false;
	clearLoginInfo();
	g.url = "/login";
}

function onAppLogin_global(e)
{
	_isLogin = true;
	g.data.initStaticData();
	if (_lastUrl != "")
	{
		g.url = _lastUrl;
	}
	else
	{
		g.url = "/";
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
	forceExit: forceExit,
	checkLogin: checkLogin,
	initLogin: initLogin

};
defineProperty(d, "isLogin", () =>
{
	return _isLogin;
})

export default d;