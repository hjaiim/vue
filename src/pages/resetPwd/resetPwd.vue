<template>
	<div class="wrap-page relative">
		<div class="login-wrap is-transformed gray-shadow resetPwd-wrap">
			<p class="login-tit">找回密码</p>
			<form-input placeholder="请输入登录名" type="text" v-model="account"
						@focus="onFocus_formInput('account')" :errmsg="errData.account"></form-input>
			<form-input type="text" placeholder="请输入您的手机号" errmsg="请输入正确的手机号" v-model="phone"
						@focus="onFocus_formInput('phone')" :errmsg="errData.phone"></form-input>
			<div class="verify-wrap relative">
				<form-input type="text" placeholder="请输入验证码" class="send-code" v-model="code"
							@focus="onFocus_formInput('code')" :errmsg="errData.code"></form-input>
				<span class="send-btn absolute pointer" @click="onClick_getCodeBtn" :class="isClicked?'disabled':''">
					{{limit == g.param.timeoutClock ?'获取验证码':'倒计时'+limit+'秒'}}</span>
			</div>
			<form-input type="password" v-model="password" placeholder="请输入新密码"
						@focus="onFocus_formInput('password')" :errmsg="errData.password"></form-input>
			<form-input type="password" v-model="confirmPwd" placeholder="请再次确认输入"
						@focus="onFocus_formInput('confirmPwd')" :errmsg="errData.confirmPwd"
						@keyenter="onClick_registerBtn"></form-input>
			<div class="pointer login-btn ani-time resetPwd-top" @click="onClick_resetBtn">确定</div>
			<div class="link-keys diff-margin ">已有账号？<span class="ani-time pointer"
														   @click="onClick_loginBtn">登录>></span>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import sha256 from 'sha256';
	import FormInput from "../../components/formInput.vue";
	var _params = null, _isValid = true, _timer = 0;
	export default{
		created(){
			this.init();
		},
		data(){
			return {
				g: g,
				account: '',
				phone: '',
				password: '',
				errorTip: "",
				confirmPwd: '',
				code: '',
				errData: {},
				limit: g.param.timeoutClock,
				isClicked: false
			}
		},
		components: {
			FormInput
		},
		methods: {
			init()
			{
				this.account = "";
				this.phone = "";
				this.password = "";
				this.confirmPwd = "";
				this.code = "";
			},
			onClick_getCodeBtn()
			{
				this.checkCodeDataValid();
				if (!_isValid)
				{
					_isValid = true;
					return;
				}
				this.isClicked = true;
				this.setClock();
				_params = {
					logon: this.account,
					mobile: this.phone
				};
				g.ui.showLoading();
				g.net.call("user/resetPasswordSendCode", _params).then(() =>
				{
					g.ui.hideLoading();
					g.ui.toast("发送成功！");
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
			onClick_resetBtn()
			{
				this.checkResetDataValid();
				if (!_isValid)
				{
					_isValid = true;
					return;
				}

				_params = {
					logon: this.account,
					mobile: this.phone,
					code: this.code,
					password: sha256(this.password)
				};
				g.ui.showLoading();
				g.net.call('user/resetPassword', _params).then(() =>
				{
					g.ui.hideLoading();
					g.ui.toast("密码重置成功！");
					this.init();
					g.url = "/login";
				}, (err) =>
				{
					g.ui.hideLoading();
					this.errData.confirmPwd = err.errorMsg;
					setTimeout(() =>
					{
						this.errData.confirmPwd = "";
					}, 1500);
					this.$forceUpdate();
				})
			},
			onFocus_formInput($type)
			{
				this.errData[$type] = "";
				this.$forceUpdate();
			},
			checkCodeDataValid()
			{
				if (!this.account)
				{
					this.errData.account = "请输入登录名";
					_isValid = false;
				}
				else if (!g.param.accountReg.test(this.account))
				{
					this.errData.account = "登录名格式不正确";
					_isValid = false;
				}

				if (!this.phone)
				{
					this.errData.phone = "请输入手机号";
					_isValid = false;
				}
				else if (!g.param.phoneReg.test(this.phone))
				{
					this.errData.phone = "手机号格式不正确"
					_isValid = false;
				}
				this.$forceUpdate();
			},
			checkResetDataValid()
			{

				this.checkCodeDataValid();
				if (!this.code)
				{
					this.errData.code = "请输入验证码";
					_isValid = false;
				}
				else if (!g.param.codeReg.test(this.code))
				{
					this.errData.code = "验证码格式有误";
					_isValid = false;
				}

				if (!this.password)
				{
					this.errData.password = "请输入密码";
					_isValid = false;
				}
				else if (!g.param.passwordReg.test(this.password))
				{
					this.errData.password = "密码是6-16位的字母或数字";
					_isValid = false;
				}
				if (!this.confirmPwd)
				{
					this.errData.confirmPwd = "请输入确认密码";
					_isValid = false;
				}
				else if (!g.param.passwordReg.test(this.password))
				{
					this.errData.confirmPwd = "密码是6-16位的字母或数字";
					_isValid = false;
				}
				else if (this.confirmPwd != this.password)
				{
					this.errData.confirmPwd = "两次密码输入不一致";
					_isValid = false;
				}
				this.$forceUpdate();
			},
			onClick_loginBtn()
			{
				g.url = "/login";
			},

		}
	}
</script>
