<template>
	<div class="wrap-page relative">
		<div class="login-wrap is-transformed gray-shadow register-wrap">
			<p class="login-tit">注册</p>
			<form-input :maxLength="11" placeholder="请输入登录名" type="text" v-model="account"></form-input>
			<form-input :maxLength="11" placeholder="请输入姓名" type="text" v-model="nickName"></form-input>
			<form-input type="password"
						v-model="password" placeholder="请输入密码" errmsg="请输入正确的密码"></form-input>
			<form-input type="password" v-model="nextPsd" placeholder="请再次确认输入"></form-input>
			<div class="pointer login-btn resetPwd-top ani-time">注册</div>
			<div class="link-keys ">已有账号？<router-link class="ani-time" tag="a" to="/login">登录>></router-link>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import g from './../../global';
	import FormInput from "../../components/formInput.vue"
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
				nickName: '',
				password: '',
				errorTip: "",
				nextPsd: '',
			}
		},
		watch: {},
		components: {
			FormInput
		},
		methods: {
			init(){
			}
		}

	}
</script>
<style lang="sass" rel="stylesheet/scss" type="text/scss" scoped>

</style>
