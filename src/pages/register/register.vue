<template>
	<div class="wrap-page relative">
		<div class="login-wrap is-transformed gray-shadow register-wrap">
			<p class="login-tit">注册</p>
			<form-input placeholder="请输入登录名" type="text" v-model="account"
						@focus="onFocus_formInput('account')" :errmsg="errData.account"></form-input>
			<form-input placeholder="请输入姓名" type="text" v-model="name"
						@focus="onFocus_formInput('name')" :errmsg="errData.name"></form-input>
			<form-input type="password" placeholder="请输入密码" v-model="password" :errmsg="errData.password"
						@focus="onFocus_formInput('password')"></form-input>
			<form-input type="password" placeholder="请再次确认输入" v-model="confirmPwd"
						@focus="onFocus_formInput('confirmPwd')" :errmsg="errData.confirmPwd"></form-input>
			<div class="pointer login-btn resetPwd-top ani-time" @click="onClick_registerBtn">注册</div>
			<div class="link-keys ">已有账号？<span class="ani-time pointer" @click="onClick_loginBtn">登录>></span>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import g from './../../global';
	import sha256 from 'sha256';
	import FormInput from "../../components/formInput.vue"
	var _params = {};
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
				errData:{}
			}
		},
		watch: {},
		components: {
			FormInput
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
				if(!_isValid)
				{
					_isValid = true;
					return ;
				}
				_params.logon = this.account;
				_params.name = this.name;
				_params.password = sha256(this.password);
				g.net.call("user/register", _params).then(() =>
				{
					this.init();
					this.onClick_loginBtn();
				})
			},
			onClick_loginBtn()
			{
				g.url = "/login";
			},
			onFocus_formInput($type)
			{
				this.errData[$type] = "";
			},
			checkValid()
			{
				if(!this.account)
				{
					this.errData.account = "表单内容不能为空";
					_isValid = false;
				}
				if(!this.name)
				{
					this.errData.name = "表单内容不能为空";
					_isValid = false;
				}
				if(!this.password)
				{
					this.errData.password = "表单内容不能为空";
					_isValid = false;
				}
				if(!this.confirmPwd)
				{
					this.errData.confirmPwd = "表单内容不能为空";
					_isValid = false;
				}
			}
		}

	}
</script>
<style lang="sass" rel="stylesheet/scss" type="text/scss" scoped>

</style>
