/**
 * Created by billy on 2016/12/19.
 */
import g from "../../global";
import UserInfo from "./UserInfo";
import LangPool from "./LangPool";
import StaticNavPool from "./StaticNavPool";
import FollowBrandPool from "./FollowBrandPool";
import BrandPool from "./BrandPool";
import BrandProvincePool from "./BrandProvincePool";
import BrandShopPool from "./BrandShopPool";
import ShopHistoryPool from "./ShopHistoryPool";
import FollowShopPool from "./FollowShopPool";
import ShopDetailPool from "./ShopDetailPool";
import ShopPool from "./SearchShopPool";
import ConstPool from "./ConstPool";
import StaticAreaPool from "./StaticAreaPool";
import SearchBrandPool from "./SearchBrandPool";
import SearchPlatPool from "./SearchPlatPool";
import FoodPool from "./FoodPool";
import HotMapPool from "./HotMapPool";
import RightPool from "./RightPool";

export var userInfo = new UserInfo(); //用户信息
export var langPool = new LangPool(); //语言包数据池
export var followShopPool = new FollowShopPool();
export var staticNavPool = new StaticNavPool(); //语言包数据池
export var brandPool = new BrandPool();
export var brandProvincePool = new BrandProvincePool();

export var followBrandPool = new FollowBrandPool();
export var brandShopPool = new BrandShopPool();
export var shopPool = new ShopPool();
export var shopDetailPool = new ShopDetailPool();
export var shopHistoryPool = new ShopHistoryPool();
export var constPool = new ConstPool();
export var staticAreaPool = new StaticAreaPool();
export var searchBrandPool = new SearchBrandPool();
export var foodPool = new FoodPool();
export var hotMapPool = new HotMapPool();
export var rightPool = new RightPool();


var _platHash = {};
_platHash[1] = new SearchPlatPool();
_platHash[2] = new SearchPlatPool();
_platHash[3] = new SearchPlatPool();

export function getPoolBy($plat)
{
	return _platHash[$plat];
}

export function initStaticData()
{
	var staticData = g.data.staticData;
	langPool.update(staticData["lang"]);
	constPool.update(staticData["const"]);
	constPool.update(staticData["plat"], "platList");
	staticAreaPool.update(staticData["area"]);
}

function initLang($staticData)
{
// 	langPool.init($staticData["lang/langList.json"]);
// 	(g.setLang = ($lang)=>
// 	{
// 		langPool.setLang($lang);
// 		g.langPool.setLang($staticData["lang/" + $lang + ".json"]);
// 	})(g.core.webParam.param.defaultLang);
}

export function clearAll()
{
	userInfo.removeAll();
	langPool.removeAll();
	followShopPool.removeAll();
	staticNavPool.removeAll();
	brandPool.removeAll();
	brandProvincePool.removeAll();
	followBrandPool.removeAll();
	brandShopPool.removeAll();
	shopPool.removeAll();
	shopDetailPool.removeAll();
	shopHistoryPool.removeAll();
	constPool.removeAll();
	staticAreaPool.removeAll();
	searchBrandPool.removeAll();
	foodPool.removeAll();
	hotMapPool.removeAll();
	rightPool.removeAll();

}
