<template>
	<com-layout currPath="/">
		<div class="percenter-wrap">
			<div class="menu-wrap">
				<percenter-tab @click="onClick_tabItem" :type="type"></percenter-tab>
			</div>
			<div class="percenter-inner" v-show="type=='personal'">
				<p class="icon-collect clear">
					<i class="default-img right">
						<img :src="userInfo.avatar?userInfo.avatar:g.path.images+'/default-icon.png'" alt="">
					</i>
				</p>
			</div>
			<div class="personal-message" v-show="type=='personal'">
				<p class="personal-form"><span class="personal-title">所属公司</span><span
						class="personal-content">{{userInfo.companyName}}</span></p>
				<p class="personal-form"><span class="personal-title">所属部门</span><span
						class="personal-content">{{userInfo.departmentName}}</span></p>
				<p class="personal-form"><span class="personal-title">职务名称</span><span
						class="personal-content">{{userInfo.dutyName}}</span></p>
				<p class="personal-form"><span class="personal-title">岗位名称</span><span
						class="personal-content">{{userInfo.positionName}}</span></p>
				<p class="personal-form"><span class="personal-title">角色</span><span
						class="personal-content">{{userInfo.roleName}}</span></p>
				<p class="personal-form"><span class="personal-title">姓名</span><span class="personal-content">
					{{userInfo.name}}</span>
				</p>
				<p class="personal-form">
					<span class="personal-title">手机</span>
					<input class="personal-content pensonal-input" v-model="phone">
					<span class="bind-phone pointer">解绑</span>
				</p>
				<p class="personal-form">
					<span class="personal-title">验证码</span>
					<input class="personal-content pensonal-input code" v-model="code">
					<span class="btn-send pointer" @click="onClick_sendCodeBtn">发送验证码</span>
					<span class="bind-phone pointer">解绑</span>
				</p>
				<p class="personal-form"><span class="personal-title">固定电话</span><input
						class="personal-content pensonal-input" v-model="telphone"></p>
				<p class="personal-form"><span class="personal-title">电子邮箱</span><input
						class="personal-content pensonal-input" v-model="email"></p>
				<p class="personal-form"><span class="personal-title">备注</span><input
						class="personal-content pensonal-input note" v-model="remark"></p>
				<div class="btn btn-save pointer" @click="onClick_savePersonal">保存</div>
			</div>

			<div class="personal-message" v-show="type=='modpwd'">
				<p class="personal-form"><span class="personal-title">原密码</span><input
						class="personal-content pensonal-input" v-model="password"></p>
				<p class="personal-form"><span class="personal-title">新密码</span><input
						class="personal-content pensonal-input" v-model="newPwd"></p>
				<p class="personal-form"><span class="personal-title">确认密码</span><input
						class="personal-content pensonal-input" v-model="confirmPwd"></p>
				<div class="btn btn-save pointer">保存</div>
			</div>
		</div>
	</com-layout>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import ComLayout from "../../components/comLayout.vue";
	import PercenterTab from "../../components/percenterTab.vue";
	var _params = null;
	export default{
		created(){
			this.routerUpdated();
		},
		data(){
			return {
				g: g,
				type: "personal",
				userInfo: {},
				phone: "",
				telphone: "",
				email: "",
				remark: "",
				password:"",
				newPwd:"",
				confirmPwd:""
			}
		},
		components: {
			ComLayout,
			PercenterTab
		},
		methods: {
			routerUpdated()
			{
				this.userInfo = g.data.userInfo;
				this.phone = this.userInfo.phone;
				this.telphone = this.userInfo.telphone;
				this.email = this.userInfo.email;
				this.remark = this.userInfo.remark;
				this.type = g.vue.getQuery('type', "personal");
			},
			onClick_tabItem($id)
			{
				g.url = {
					path: g.currentRoute.path,
					query: {
						type: $id
					}
				};
			},
			onClick_savePersonal()
			{
				_params = {
					avatar: this.avatar,
					telphone: this.telphone,
					email: this.email,
					remark: this.remark,
					mobile: this.phone,
					code: this.code
				};
				g.net.call("user/updateUserInfo", _params).then(() =>
				{
					g.data.userInfo.update(_params);
					g.ui.toast("用户信息修改成功！");
				})
			},
			onClick_sendCodeBtn()
			{
				_params = {
					mobile: this.phone
				};
				g.net.call("user/applyUserAuthSendCode", _params).then(() =>
				{
					g.data.userInfo.update(_params);
					g.ui.toast("用户手机修改成功！");
				})
			},
			onClick_updatePwd()
			{
				_params = {
					oldPassword: this.password,
					newPassword: this.newPwd
				};
				g.net.call("user/updatePassword", _params).then(() =>
				{
					g.data.userInfo.update(_params);
					g.ui.toast("用户信息修改密码！");
				})
			}
		}
	}

</script>
<style type="text/css" lang="sass" rel="stylesheet/css" scoped>
	@import "../../css/mixin.scss";
	@import "../../css/percenter.scss";
</style>
<style type="text/css" lang="sass" rel="stylesheet/css">
	@import "../../css/personal.scss";
</style>
