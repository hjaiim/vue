<template>
	<div class="wrap-page relative">
		<div class="login-wrap is-transformed gray-shadow resetPwd-wrap">
			<p class="login-tit">找回密码</p>
			<form-input :maxLength="11" placeholder="请输入登录名" type="text" v-model="account"></form-input>
			<form-input type="text" v-model="phoneNum" placeholder="请输入您的手机号" errmsg="请输入正确的手机号"></form-input>
			<div class="verify-wrap relative">
				<form-input type="text" v-model="verifyCode" placeholder="请输入验证码" class="send-code"></form-input>
				<span class="send-btn absolute pointer">获取验证码</span>
			</div>
			<form-input type="password" v-model="password" placeholder="请输入新密码"></form-input>
			<form-input type="password" v-model="nextPsd" placeholder="请再次确认输入"></form-input>
			<div class="pointer login-btn ani-time resetPwd-top">确定</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import FormInput from "../../components/formInput.vue"
	export default{
		created(){

		},
		data(){
			return {
				g: g,
				account: '',
				phoneNum: '',
				password: '',
				errorTip: "",
				nextPsd: '',
				verifyCode: ''
			}
		},
		components: {
			FormInput
		},
		methods: {}
	}
</script>
