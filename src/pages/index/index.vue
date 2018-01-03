<template>
	<com-layout currPath="/" ref="layout">
		<div class="percenter-wrap">
			<div class="menu-wrap">
				<percenter-tab @click="onClick_tabItem" :type="type"></percenter-tab>
			</div>
			<div class="percenter-inner" v-show="type=='personal'">
				<div class="icon-collect clear">
					<div class="relative upload-head right pointer">
						<img class="default-img"
							 :src="avatar?g.param.ossUrl+avatar:g.path.images+'/default.png'" alt="">
						<iframe class="default-avatar" name="fileUpload"
								:src="g.path.base+'/upload.html?type=pic&subType=avatar&redirectUrl='+g.path.base+'/uploadApi.html&access='+g.param.uploadAccess" v-if="!avatar"></iframe>
						<p class="err-msg absolute">{{errData.avatar}}</p>
						<div class="absolute upload-btn">
							<p class="load-text" v-if="!avatar">修改头像</p>
							<img :src="g.path.images+'/del-head.png'" alt=""
								 class="del-head absolute pointer" @click="onClick_delBtn" v-if="avatar">
							<!--<iframe class="iframe-wrap absolute pointer" name="fileUpload" v-if="hasIframe"-->
									<!--:src="g.path.base+'/upload.html?type=file&redirectUrl='+g.path.base+'/uploadApi.html&access='+g.param.uploadAccess"></iframe>-->
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
							   v-model="phone" :readonly="readonly" :errmsg="errData.phone"
							   @focus="onFocus_inputBar('phone')"></input-bar>
					<span class="bind-phone pointer ani-time" @click="onClick_unbindBtn" v-if="readonly">解绑</span>
				</p>
				<p class="personal-form" v-if="!readonly">
					<span class="personal-title">验证码</span>
					<input-bar class="personal-content pensonal-input code" placeholder="" type="text"
							   v-model="code" :errmsg="errData.code" @focus="onFocus_inputBar('code')"></input-bar>
					<span class="btn-send pointer" @click="onClick_sendCodeBtn" :class="isClicked?'disabled':''">
						{{limit==g.param.timeoutClock?'获取验证码':'倒计时'+limit+'秒'}}</span>
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
				<div class="personal-form relative">
					<span class="personal-title">备注</span>
					<textarea id="textarea" contenteditable="true" class="pensonal-input note" placeholder=""
							  v-model="remark" @focus="onFocus_inputBar('remark')"></textarea>
					<p class="err-msg absolute"> {{errData.remark}}</p>
				</div>
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
							   @focus="onFocus_inputBar('confirmPwd')" @keyenter="onClick_updatePwd"></input-bar>

				</div>
				<div class="btn btn-save pointer action-btn ani-time" @click="onClick_updatePwd">保存</div>
			</div>
		</div>
	</com-layout>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import * as util from '../../js/func'
	import ComLayout from "../../components/comLayout.vue"
	import PercenterTab from "../../components/percenterTab.vue"
	import InputBar from "../../components/inputBar.vue"
	import UploadBtn from "../../components/upload.vue";
	import sha256 from "sha256";
	var _params = null, _isValid = true, _timer = 0, _attach = {}, _avatar = "";
	export default{
		created(){
			this.routerUpdated();
			this.$nextTick(()=>
			{
				var text = document.getElementById("textarea");
				util.autoTextarea(text);// 调用
			})
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
				errData: {},
				limit: g.param.timeoutClock,
				isClicked: false

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
				window.uploadComplete = this.uploadComplete;
				window.sendMsg = this.sendMsg;
			},
			sendMsg($type, $info)
			{
				if ($type == "error")
				{
					this.errData[$info.type] = $info.msg;
					this.$forceUpdate();
				}
				else
				{
					g.ui.showLoading();
					this.errData[$info.type] = "";
					this.$forceUpdate();
					_attach.type = $info.type;
					if (_avatar)
					{
						g.net.call(g.param.delPicAccess, {fileName: _avatar}).then(() =>
						{
						}, (err) =>
						{
						});
					}
				}
			},
			uploadComplete($data)
			{
				g.ui.hideLoading();
				this[_attach.type] = $data.fileName;
				if (_avatar != this[_attach.type])
				{
					_avatar = this[_attach.type];
				}
				this.errData[_attach.type] = "";
				this.$forceUpdate();
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
			onClick_delBtn()
			{
				this.avatar = "";
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
				this.isClicked = true;
				this.setClock();
				_params = {mobile: this.phone};
				g.ui.showLoading();
				g.net.call("user/applyUserAuthSendCode", _params).then(($data) =>
				{
					g.ui.hideLoading();
					g.ui.toast("验证码发送成功");
				}, (err) =>
				{
					g.func.dealErr(err);

				})
			},
			setClock()
			{
				_timer = setTimeout(()=>
				{
					this.limit--;
					if (this.limit == 0)
					{
						clearTimeout(_timer);
						this.isClicked = false;
						this.limit = g.param.timeoutClock;
					}
					else
					{
						this.setClock();
					}
				}, 1000)
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
				g.ui.showLoading()
				g.net.call("user/updateUserMobile", _params).then(($data) =>
				{
					g.ui.hideLoading();
					g.data.userInfo.update(_params);
					g.ui.toast("手机号修改成功")
					this.readonly = true;
				}, (err) =>
				{
					g.func.dealErr(err);
				});
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

				g.ui.showLoading();
				g.net.call("user/updateUserInfo", _params).then(() =>
				{
					_avatar = "";
					g.ui.hideLoading();
					g.data.userInfo.update(_params);
					this.$refs.layout.updateHeader();

					g.ui.toast("用户信息修改成功！");
				}, (err) =>
				{
					g.func.dealErr(err);
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
				g.ui.showLoading()
				g.net.call("user/updatePassword", _params).then(() =>
				{
					g.ui.hideLoading();
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
				else if (this.phone == this.userInfo.phone)
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
					this.errData.code = "验证码不能为空";
					_isValid = false;
				}
				else if (!g.param.codeReg.test(this.code))
				{
					this.errData.code = "验证码格式有误";
					_isValid = false;
				}
				this.$forceUpdate();
			},
			checkPersonalInfo()
			{
				if (this.telphone && !g.param.telphoneReg.test(this.telphone))
				{
					this.errData.telphone = "固话号码格式不正确";
					_isValid = false;
				}

				if (this.remark && this.remark.length >= 200)
				{
					this.errData.remark = "字符长度超出限制，最多可输入200字符";
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

	.err-msg {
		color: #ed5564;
	}
</style>
