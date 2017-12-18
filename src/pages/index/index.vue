<template>
	<com-layout currPath="/">
		<div class="percenter-wrap">
			<div class="menu-wrap">
				<percenter-tab @click="onClick_tabItem" :type="type"></percenter-tab>
			</div>
			<div class="percenter-inner" v-show="type=='personal'">

				<div class="icon-collect clear">
					<div class="relative upload-head right pointer">
						<img class="default-img" :src="avatar?avatar:g.path.images+'/default-icon.png'" alt="">
						<div class="upload-btn absolute">
							<p class="load-text">修改头像</p>
							<upload-btn @change="onChange_upload" resultType="base64" :multiType="false"></upload-btn>
							<img :src="g.path.images+'/del-head.png'" alt=""
								 class="del-head absolute pointer">
						</div>
					</div>
				</div>
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
					<input-bar class="personal-content pensonal-input" placeholder="" type="text"
							   v-model="phone"></input-bar>
					<span class="bind-phone pointer ani-time">解绑</span>
				</p>
				<p class="personal-form">
					<span class="personal-title">验证码</span>

					<input-bar class="personal-content pensonal-input code" placeholder="" type="text"
							   v-model="code" :errmsg="errData.code"></input-bar>
					<span class="btn-send pointer">发送验证码</span>
					<span class="bind-phone pointer ani-time">解绑</span>
				</p>
				<p class="personal-form"><span class="personal-title">固定电话</span>
					<input-bar class="personal-content pensonal-input" placeholder="" type="text"
							   v-model="telphone" :errmsg="errData.telphone"></input-bar>
				</p>
				<p class="personal-form"><span class="personal-title">电子邮箱</span>
					<input-bar class="personal-content pensonal-input" placeholder="" type="text"
							   v-model="email" :errmsg="errData.email"></input-bar>
				</p>
				<p class="personal-form"><span class="personal-title">备注</span>
					<input-bar class="personal-content pensonal-input note" placeholder="" type="text"
							   v-model="remark" :errmsg="errData.remark"></input-bar>
				<div class="btn btn-save pointer action-btn ani-time" @click="onClick_savePersonal">保存</div>
			</div>

			<div class="personal-message" v-show="type=='modpwd'">
				<div class="personal-form"><span class="personal-title">原密码</span>
					<input-bar class="personal-content pensonal-input" placeholder="" type="password"
							   v-model="password" :errmsg="errData.password"></input-bar>
				</div>
				<div class="personal-form"><span class="personal-title">新密码</span>
					<input-bar class="personal-content pensonal-input" placeholder="" type="password"
							   v-model="newPwd" :errmsg="errData.newPwd"></input-bar>
				</div>
				<div class="personal-form"><span class="personal-title">确认密码</span>
					<input-bar class="personal-content pensonal-input" placeholder="" type="password"
							   v-model="confirmPwd" :errmsg="errData.confirmPwd"></input-bar>
				</div>
				<div class="btn btn-save pointer action-btn ani-time" @click="onClick_updatePwd">保存</div>
			</div>
		</div>
	</com-layout>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import ComLayout from "../../components/comLayout.vue"
	import PercenterTab from "../../components/percenterTab.vue"
	import InputBar from "../../components/inputBar.vue"
	import UploadBtn from "../../components/upload.vue";
	var _params = null;
	var _isValid = true;
	export default{
		created(){
			this.routerUpdated();
		},
		data(){
			return {
				g: g,
				type: "personal",
				userInfo: {},
				avatar: '',
				phone: "",
				telphone: "",
				email: "",
				remark: "",
				password: "",
				newPwd: "",
				confirmPwd: "",
				errData: {}

			}
		},
		components: {
			ComLayout,
			PercenterTab,
			InputBar,
			UploadBtn
		},
		methods: {
			routerUpdated()
			{
				this.userInfo = g.data.userInfo;
				this.phone = this.userInfo.phone;
				this.avatar = this.userInfo.avatar;
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
				this.checkPwdDataValid();
				if (!_isValid)
				{
					_isValid = true;
					return;
				}
				_params = {
					oldPassword: this.password,
					newPassword: this.newPwd
				};
				g.net.call("user/updatePassword", _params).then(() =>
				{
					g.data.userInfo.update(_params);
					g.ui.toast("密码修改成功！");
				}, (err) =>
				{
					g.func.dealErr(err);
				})
			},
			onChange_upload($data)
			{
				trace("onChange_upload", $data);
				this.avatar = $data;
			},
			checkPersonalDataValid()
			{

			},
			checkPwdDataValid()
			{
				if (!this.password)
				{
					this.errData.password = "请输入原始密码";
					_isValid = false;
				}
				if (!this.newPwd)
				{
					this.errData.newPwd = "请输入新密码";
					_isValid = false;
				}
				if (!this.confirmPwd)
				{
					this.errData.confirmPwd = "请输入确认密码";
					_isValid = false;
				}
				if (this.newPwd != this.confirmPwd)
				{
					this.errData.confirmPwd = "两次新密码不一致";
					_isValid = false;
				}
				this.$forceUpdate();
			}
		}
	}

</script>
<style type="text/css" lang="sass" rel="stylesheet/css" scoped>
	@import "../../css/mixin.scss";
	@import "../../css/percenter.scss";
</style>
