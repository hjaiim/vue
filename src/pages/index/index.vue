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
						<iframe name="fileUpload" src=""></iframe>
						<form action="http://192.168.12.219:8001/file/upload" method="post"
							  enctype="multipart/form-data" name="fileForm" target="fileUpload">
							<input type="file" class="file-input" name="fileInput" @change="onChange_upload">
							<input type="submit" value="提交"/>
						</form>
						<div class="upload-btn absolute">
							<p class="load-text">修改头像</p>
							<!--<upload-btn @change="onChange_upload" resultType="base64" :multiType="false"></upload-btn>-->
							<img :src="g.path.images+'/del-head.png'" alt=""
								 class="del-head absolute pointer">
						</div>

					</div>
				</div>
			</div>
			<div class="personal-message" v-show="type=='personal'">
				<p class="personal-form diff-personal"><span class="personal-title">所属公司</span><span
						class="personal-content">{{userInfo.companyName}}</span></p>
				<p class="personal-form diff-personal"><span class="personal-title">所属部门</span><span
						class="personal-content">{{userInfo.departmentName}}</span></p>
				<p class="personal-form diff-personal"><span class="personal-title">职务名称</span><span
						class="personal-content">{{userInfo.dutyName}}</span></p>
				<p class="personal-form diff-personal"><span class="personal-title">岗位名称</span><span
						class="personal-content">{{userInfo.positionName}}</span></p>
				<p class="personal-form diff-personal"><span class="personal-title">角色</span><span
						class="personal-content">{{userInfo.roleName}}</span></p>
				<p class="personal-form diff-personal"><span class="personal-title">姓名</span><span
						class="personal-content">
					{{userInfo.name}}</span>
				</p>
				<p class="personal-form">
					<span class="personal-title">手机</span>
					<input-bar class="personal-content pensonal-input" placeholder="" type="text"
							   v-model="phone" :readonly="readonly" :errmsg="errData.phone"></input-bar>
					<span class="bind-phone pointer ani-time" @click="onClick_unbindBtn">解绑</span>
				</p>
				<p class="personal-form" v-if="!readonly">
					<span class="personal-title">验证码</span>
					<input-bar class="personal-content pensonal-input code" placeholder="" type="text"
							   v-model="code" :errmsg="errData.code" @focus="onFocus_inputBar('code')"></input-bar>
					<span class="btn-send pointer" @click="onClick_sendCodeBtn">发送验证码</span>
					<span class="bind-phone pointer ani-time" @click="onClick_savePhoneBtn">保存</span>
				</p>
				<p class="personal-form"><span class="personal-title">固定电话</span>
					<input-bar class="personal-content pensonal-input" placeholder="" type="text"
							   v-model="telphone" :errmsg="errData.telphone"
							   @focus="onFocus_inputBar('telphone')"></input-bar>
				</p>
				<p class="personal-form"><span class="personal-title">电子邮箱</span>
					<input-bar class="personal-content pensonal-input" placeholder="" type="text"
							   v-model="email" :errmsg="errData.email" @focus="onFocus_inputBar('email')"></input-bar>
				</p>
				<p class="personal-form"><span class="personal-title">备注</span>
					<input-bar class="personal-content pensonal-input note" placeholder="" type="text"
							   v-model="remark" :errmsg="errData.remark"
							   @focus="onFocus_inputBar('remark')"></input-bar>
				<div class="btn btn-save pointer action-btn ani-time" @click="onClick_savePersonal">保存</div>
			</div>

			<div class="personal-message" v-show="type=='modpwd'">
				<div class="personal-form"><span class="personal-title">原密码</span>
					<input-bar class="personal-content pensonal-input" placeholder="" type="password"
							   v-model="password" :errmsg="errData.password"
							   @focus="onFocus_inputBar('password')"></input-bar>
				</div>
				<div class="personal-form"><span class="personal-title">新密码</span>
					<input-bar class="personal-content pensonal-input" placeholder="" type="password"
							   v-model="newPwd" :errmsg="errData.newPwd"
							   @focus="onFocus_inputBar('newPwd')"></input-bar>
				</div>
				<div class="personal-form"><span class="personal-title">确认密码</span>
					<input-bar class="personal-content pensonal-input" placeholder="" type="password"
							   v-model="confirmPwd" :errmsg="errData.confirmPwd"
							   @focus="onFocus_inputBar('confirmPwd')"></input-bar>
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
	import sha256 from "sha256";
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
				readonly: true,
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
				this.readonly = true;
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
			onClick_unbindBtn()
			{
				this.readonly = false;
			},
			onClick_sendCodeBtn()
			{

				this.checkPhone();
				if (!_isValid)
				{
					_isValid = true;
					return;
				}
				_params = {mobile: this.phone};
				g.net.call("user/applyUserAuthSendCode", _params).then(($data) =>
				{
					g.ui.toast("验证码发送成功");
				})
			},
			onClick_savePhoneBtn()
			{
				this.checkCode();
				if (!_isValid)
				{
					_isValid = true;
					return;
				}
				_params = {
					mobile: this.phone,
					code: this.code
				};
				g.net.call("user/updateUserMobile", _params).then(($data) =>
				{
					g.data.userInfo.update(_params);
					g.ui.toast("手机号修改成功")
					this.readonly = true;

				})
			},
			onClick_savePersonal()
			{
				this.checkPersonalInfo();
				if (!_isValid)
				{
					_isValid = true;
					return;
				}
				_params = {
					telphone: this.telphone,
					email: this.email,
					remark: this.remark,
					avatar: this.avatar
				};
				g.net.call("user/updateUserInfo", _params).then(() =>
				{
					g.data.userInfo.update(_params);
					g.ui.toast("用户信息修改成功！");
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
					oldPassword: sha256(this.password),
					newPassword: sha256(this.newPwd)
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
			onFocus_inputBar($type)
			{
				this.errData[$type] = "";
				this.$forceUpdate();
			},
			onChange_upload(e)
			{
				var file = e.target.files[0];
				var fileName = file.name;
				var fileSize = file.size;
				fileSize = Math.floor(fileSize / 1048576 * 100) / 100 + "MB";
				trace(fileName + "（" + fileSize + "）");
			},
			checkPhone()
			{
				if (!this.phone)
				{
					this.errData.phone = "手机号码不能为空";
					_isValid = false;
				}
				else if (!g.param.phoneReg.test(this.phone))
				{
					this.errData.phone = "手机格式有误";
					_isValid = false;
				}
				else if(this.phone == this.userInfo.phone)
				{
					this.errData.phone = "手机号码未做改变";
					_isValid = false;
				}
				this.$forceUpdate();
			},
			checkCode()
			{
				this.checkPhone();
				if (!this.code)
				{
					this.errData.code = "手机号码不能为空";
					_isValid = false;
				}
				else if (!g.param.codeReg.test(this.code))
				{
					this.errData.code = "手机格式有误";
					_isValid = false;
				}
				this.$forceUpdate();
			},
			checkPersonalInfo()
			{
//				if (!this.avatar)
//				{
//					this.errData.avatar = "请上传头像信息";
//					_isValid = false;
//				}

				if (this.telphone && !g.param.telphoneReg.test(this.telphone))
				{
					this.errData.telphone = "固话号码格式不正确";
					_isValid = false;
				}

				if (this.email && !g.param.emailReg.test(this.email))
				{
					this.errData.email = "邮箱格式不正确";
					_isValid = false;
				}
				this.$forceUpdate();

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
				else if (!g.param.passwordReg.test(this.newPwd))
				{
					this.errData.newPwd = "密码是6-16位的字母或数字";
					_isValid = false;
				}
				if (!this.confirmPwd)
				{
					this.errData.confirmPwd = "请输入确认密码";
					_isValid = false;
				}
				else if (!g.param.passwordReg.test(this.confirmPwd))
				{
					this.errData.confirmPwd = "密码是6-16位的字母或数字";
					_isValid = false;
				}
				else if (this.confirmPwd != this.newPwd)
				{
					this.errData.confirmPwd = "两次密码输入不一致";
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

	.file-input {
		width: 120px;
		height: 120px;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 2;
		opacity: 0;
	}
</style>
