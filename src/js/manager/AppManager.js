/**
 * Created by billy on 2016/12/22.
 */
import g from "../../global";
import RouterList from "../../router";
import Mint from "mint-ui";
import "mint-ui/lib/style.css";
import loginManager from "./LoginManager";

var _moveList = [];
var _initList = [];
var _key;
_initList.push(initGlobal);
// _initList.push(initStaticData);
// _initList.push(initComponents);
// _initList.push(initLogin);
// _initList.push(initGlobalVariable);

export function init($callback)
{
	var FastClick = require('fastclick');
	window.FastClick = FastClick;
	FastClick.attach(document.body, {tapDelay: 10});

	//平台初始化
	g.core.initConfig(WEB_CONFIG);
	g.core.initApp("#app", RouterList, _initList, {
		plugin: Mint
	}).then(() =>
	{
		g.core.start();
	});

	if (g.core.onMode("debug"))
	{
		window.g = g;
	}
}

//初始化登录状态

function initLogin()
{
	loginManager.init(() =>
	{
		this.apply();
	});
}

//初始化全局方法
function initGlobal()
{
	g.core.initGlobal(g);
	this.apply();
}

//初始化静态数据
function initStaticData()
{
	g.data.initStaticData();
	this.apply();
}

function initComponents()
{
	this.apply();
}

function initGlobalVariable()
{
	g.isShowBrandPop = false;
	this.apply();
}

export function getKey()
{
	return _key
}

export function addMove($el)
{
	if (_moveList.indexOf($el) < 0)
	{
		_moveList.push($el);
	}
}

export function removeMove($el)
{
	if (_moveList.indexOf($el) >= 0)
	{
		_moveList.splice(_moveList.indexOf($el), 1);
	}
}




