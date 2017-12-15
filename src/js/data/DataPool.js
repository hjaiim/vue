/**
 * Created by billy on 2016/12/19.
 */
import g from "../../global";
import UserInfo from "./UserInfo";
import RightPool from "./RightPool";
import LangPool from "./LangPool";
import StaticNavPool from "./StaticNavPool";
import CompanyPool from "./CompanyPool";
import SearchCompanyPool from "./SearchCompanyPool";
import MessagePool from "./MessagePool";
import DepartmentPool from "./DepartmentPool";
import DutyPool from "./DutyPool";
import PositionPool from "./DutyPool";
import AccountPool from "./AccountPool";
import BusinessPool from "./BusinessPool";
import RolePool from "./RolePool";
import StaffPool from "./StaffPool";
import UnverifyPool from "./UnverifyPool";

export var userInfo = new UserInfo(); //用户信息
export var langPool = new LangPool(); //语言包数据池
export var rightPool = new RightPool();
export var companyPool = new CompanyPool();
export var departmentPool = new DepartmentPool();
export var dutyPool = new DutyPool();
export var staticNavPool = new StaticNavPool(); //语言包数据池
export var messagePool = new MessagePool();
export var searchPositionPool = new PositionPool();
export var searchCompanyPool = new SearchCompanyPool();
export var searchAccountPool = new AccountPool();
export var searchBusinessPool = new BusinessPool();
export var searchUnverifyPool = new UnverifyPool();
export var searchRolePool = new RolePool();
export var staffPool = new StaffPool();
export function initStaticData()
{
	var staticData = g.data.staticData;
	initLang(staticData);
	staticNavPool.init(staticData["nav.json"]);
}

function initLang($staticData)
{
	langPool.init($staticData["lang/langList.json"]);
	(($lang)=>
	{
		langPool.setLang($lang);
		g.langPool.setLang($staticData["lang/" + $lang + ".json"]);
	})(g.core.webParam.param.defaultLang);

}

export function clearAll()
{
	userInfo.removeAll();
	rightPool.removeAll();
	companyPool.removeAll();
	departmentPool.removeAll();
	dutyPool.removeAll();
	staticNavPool.removeAll();
	messagePool.removeAll();
	searchPositionPool.removeAll();
	searchCompanyPool.removeAll();
	searchAccountPool.removeAll();
	searchBusinessPool.removeAll();
	searchUnverifyPool.removeAll();
	searchRolePool.removeAll();
	staffPool.removeAll();
}
