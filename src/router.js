/**
 * Created by billy on 2016/11/30.
 */
import Index from "./pages/index/index.vue"; // 首页
import IndexMain from "./pages/index/index";
import Login from "./pages/login/login.vue"; // 登录
import LoginMain from "./pages/login/login";

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
	}
];