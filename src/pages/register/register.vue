<template>
	<div class="wrap-page relative login-page">
		<div class="login-wrap is-transformed gray-shadow register-wrap">
			<p class="login-tit">注册</p>
			<form-input placeholder="请输入登录名" type="text" v-model="account"
						@focus="onFocus_formInput('account')" :errmsg="errData.account"></form-input>
			<form-input placeholder="请输入姓名" type="text" v-model="name"
						@focus="onFocus_formInput('name')" :errmsg="errData.name"></form-input>
			<form-input type="password" placeholder="请输入密码" v-model="password" :errmsg="errData.password"
						@focus="onFocus_formInput('password')"></form-input>
			<form-input type="password" placeholder="请再次确认输入" v-model="confirmPwd"
						@focus="onFocus_formInput('confirmPwd')" :errmsg="errData.confirmPwd"
						@keyenter="onClick_registerBtn"></form-input>
			<div class="pointer login-btn resetPwd-top ani-time" @click="onClick_registerBtn">注册</div>
			<div class="link-keys">已有账号？<span class="ani-time pointer" @click="onClick_loginBtn">登录>></span>
			</div>
		</div>
		<back-login-pop :isShowPopView="isShowLogin"></back-login-pop>
	</div>
</template>
<script type="text/ecmascript-6">
	import g from './../../global';
	import sha256 from 'sha256';
	import FormInput from "../../components/formInput.vue";
	import BackLoginPop from "../../components/pop/backLoginPop.vue"
	var _params = {}, _isValid = true;
	export default {
		created()
		{
			this.init();
		},
		data()
		{
			return {
				g: g,
				account: '',
				name: '',
				password: '',
				confirmPwd: '',
				errData: {},
				isShowLogin: false

			}
		},
		watch: {},
		components: {
			FormInput,
			BackLoginPop
		},
		methods: {
			init()
			{
				this.account = "";
				this.name = "";
				this.password = "";
				this.confirmPwd = "";
			},
			onClick_registerBtn()
			{
				this.checkValid();
				if (!_isValid)
				{
					_isValid = true;
					return;
				}
				_params.logon = this.account;
				_params.name = this.name;
				_params.password = sha256(this.password);
				g.net.call("user/register", _params).then(() =>
				{
					this.isShowLogin = true;
					setTimeout(() =>
					{
						this.isShowLogin = false;
						this.init();
						this.onClick_loginBtn();
					}, 1500);
				}, (err) =>
				{
					this.errData.confirmPwd = err.errorMsg;
					setTimeout(() =>
					{
						this.errData.confirmPwd = "";
					}, 1500);

					this.$forceUpdate();
				})
			},
			onClick_loginBtn()
			{
				g.url = "/login";
			},
			onFocus_formInput($type)
			{
				this.errData[$type] = "";
				this.$forceUpdate();
			},
			checkValid()
			{
				if (!this.account)
				{
					this.errData.account = "请输入登录名";
					_isValid = false;
				}
				else if (!g.param.accountReg.test(this.account))
				{
					this.errData.account = "登录名是6-16位的字母或数字";
					_isValid = false;
				}

				if (!this.name)
				{
					this.errData.name = "请输入姓名";
					_isValid = false;
				}
				else if (!g.param.nameReg.test(this.name))
				{
					this.errData.name = "姓名是2-10个字符的汉字"
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
			}

		}

	}
</script>
<style lang="sass" rel="stylesheet/scss" type="text/scss" scoped>

</style>
