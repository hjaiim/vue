/**
 * Created by billy on 2016/12/19.
 */
import g from "../../global";
import UserInfo from "./UserInfo";
import RightPool from "./RightPool";
import LangPool from "./LangPool";
import StaticNavPool from "./StaticNavPool";
import StaticRightPool from "./StaticRightPool";
import CompanyPool from "./CompanyPool";
import MessagePool from "./MessagePool";
import DepartmentPool from "./DepartmentPool";
import PositionPool from "./PositionPool";
import AccountPool from "./AccountPool";
import BusinessPool from "./BusinessPool";
import RolePool from "./RolePool";
import StaffPool from "./StaffPool";

export var userInfo = new UserInfo(); //用户信息
export var langPool = new LangPool(); //语言包数据池
export var rightPool = new RightPool();
export var companyPool = new CompanyPool();
export var staticNavPool = new StaticNavPool(); //语言包数据池
export var staticRightPool = new StaticRightPool();
export var messagePool = new MessagePool();
export var departmentPool = new DepartmentPool();
export var positionPool = new PositionPool();
export var searchCompanyPool = new CompanyPool();
export var searchAccountPool = new AccountPool();
export var searchBusinessPool = new BusinessPool();
export var staffPool = new StaffPool();
export var searchRolePool = new RolePool();
export function initStaticData()
{
	var staticData = g.data.staticData;
	initLang(staticData);
	staticNavPool.update(staticData["nav.json"]);
	staticRightPool.update(staticData["right.json"]);
}

function initLang($staticData)
{
	langPool.init($staticData["lang/langList.json"]);
	(g.langPool.setLang = ($lang)=>
	{
		langPool.setLang($lang);
		g.langPool.setLang($staticData["lang/" + $lang + ".json"]);
	})(g.core.webParam.param.defaultLang);
}

export function clearAll()
{
	userInfo.removeAll();
	langPool.removeAll();
	rightPool.removeAll();
	companyPool.removeAll();
	staticNavPool.removeAll();
	staticFormPool.removeAll();
	staticRightPool.removeAll();
	messagePool.removeAll();
	departmentPool.removeAll();
	positionPool.removeAll();
	searchCompanyPool.removeAll();
	searchAccountPool.removeAll();
	searchBusinessPool.removeAll();
	auditorPool.removeAll();
}
