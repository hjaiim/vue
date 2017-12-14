<template>
	<div class="wrap-page relative">
		<div class="login-wrap is-transformed gray-shadow register-wrap">
			<p class="login-tit">注册</p>
			<form-input :maxLength="11" placeholder="请输入登录名" type="text" v-model="account"></form-input>
			<form-input :maxLength="11" placeholder="请输入姓名" type="text" v-model="name"></form-input>
			<form-input type="password" placeholder="请输入密码" v-model="password" errmsg="请输入正确的密码"></form-input>
			<form-input type="password" placeholder="请再次确认输入" v-model="confirmPwd"></form-input>
			<div class="pointer login-btn resetPwd-top ani-time" @click="onClick_registerBtn">注册</div>
			<div class="link-keys ">已有账号？<p class="ani-time" @click="onClick_loginBtn">登录>></p>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import g from './../../global';
	import sha256 from 'sha256';
	import FormInput from "../../components/formInput.vue"
	var _formData = {};
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
				confirmPwd: ''
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
				_formData.logon = this.account;
				_formData.name = this.name;
				_formData.password = sha256(this.password);
				g.net.call("user/register", _formData).then(() =>
				{
					this.init();
					this.onClick_loginBtn();
				})
			},
			onClick_loginBtn()
			{
				g.url = "/login";
			}
		}

	}
</script>
<style lang="sass" rel="stylesheet/scss" type="text/scss" scoped>

</style>
