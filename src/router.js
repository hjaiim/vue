/**
 * Created by billy on 2016/11/30.
 */
import Index from "./pages/index/index.vue"; // 首页
import IndexMain from "./pages/index/index";
import Login from "./pages/login/login.vue"; // 登录
import LoginMain from "./pages/login/login";
import ResetPwd from "./pages/resetPwd/resetPwd.vue";	 // 重置密码
import ResetPwdMain from "./pages/resetPwd/resetPwd";
import Register from "./pages/register/register.vue";	 // 注册
import RegisterMain from "./pages/register/register";
import AccountMan from "./pages/accountMan/accountMan.vue"; // 账号管理
import AccountManMain from "./pages/accountMan/accountMan";
import UnverifyMan from "./pages/unverifyMan/unverifyMan.vue"; // 待认证列表
import UnverifyManMain from "./pages/unverifyMan/unverifyMan";
import Verify from "./pages/verify/verify.vue";			 // 账号认证
import VerifyMain from "./pages/verify/verify";
import CompanyMan from "./pages/companyMan/companyMan.vue"; // 公司设置
import CompanyManMain from "./pages/companyMan/companyMan";
import Message from "./pages/message/message.vue"; //  个人消息
import MessageMain from "./pages/message/message";
import OppApply from "./pages/oppApply/oppApply.vue"; // 商机商机申请
import OppApplyMain from "./pages/oppApply/oppApply";
import OppMan from "./pages/oppMan/oppMan.vue";		 // 商机管理
import OppManMain from "./pages/oppMan/oppMan";
import ModPwd from "./pages/modPwd/modPwd.vue";     //修改密码
import ModPwdMain from "./pages/modPwd/modPwd";     //修改密码
import PositionMan from "./pages/positionMan/positionMan.vue";	 // 职位管理
import PositionManMain from "./pages/positionMan/positionMan";
import RoleMan from "./pages/roleMan/roleMan.vue";	 // 角色管理
import RoleManMain from "./pages/roleMan/roleMan";
import MyOpp from "./pages/myOpp/myOpp.vue";	 // 角色管理
import MyOppMain from "./pages/myOpp/myOpp";


export default [
	{
		path: '/',
		name: "首页",
		component: Index,
		preload: IndexMain
	},
	{
		path: '/login',
		name: "登录",
		component: Login,
		preload: LoginMain
	},
	{
		path: '/resetpwd',
		name: "重置密码",
		component: ResetPwd,
		preload: ResetPwdMain
	},
	{
		path: '/register',
		name: "注册",
		component: Register,
		preload: RegisterMain
	},
	{
		path: '/accountman',
		name: "账号管理",
		component: AccountMan,
		preload: AccountManMain
	},

	{
		path: '/verify',
		name: "账号认证",
		component: Verify,
		preload: VerifyMain
	},
	{
		path: '/unverifyman',
		name: "待认证列表",
		component: UnverifyMan,
		preload: UnverifyManMain
	},
	{
		path: '/companyman',
		name: "企业管理",
		component: CompanyMan,
		preload: CompanyManMain
	},
	{
		path: '/message',
		name: "消息",
		component: Message,
		preload: MessageMain
	},
	{
		path: '/oppapply',
		name: "商机申请",
		component: OppApply,
		preload: OppApplyMain
	},
	{
		path: '/oppman',
		name: "商机管理",
		component: OppMan,
		preload: OppManMain
	},
	{
		path: '/myopp',
		name: "我的商机",
		component: MyOpp,
		preload: MyOppMain
	},
	{
		path: '/modpwd',
		name: "修改密码",
		component: ModPwd,
		preload: ModPwdMain
	},
	{
		path: '/positionman',
		name: "职位管理",
		component: ModPwd,
		preload: ModPwd
	},
	{
		path: '/roleman',
		name: "角色管理",
		component: RoleMan,
		preload: ModPwd
	}
];