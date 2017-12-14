<template>
	<div class="wrap-page relative">
		<div class="login-wrap is-transformed gray-shadow resetPwd-wrap">
			<p class="login-tit">找回密码</p>
			<form-input placeholder="请输入登录名" type="text" v-model="account"></form-input>
			<form-input type="text" placeholder="请输入您的手机号" errmsg="请输入正确的手机号" v-model="phoneNum"></form-input>
			<div class="verify-wrap relative">
				<form-input type="text" placeholder="请输入验证码" class="send-code" v-model="verifyCode"></form-input>
				<span class="send-btn absolute pointer" @click="onClick_getCodeBtn">获取验证码</span>
			</div>
			<form-input type="password" v-model="password" placeholder="请输入新密码"></form-input>
			<form-input type="password" v-model="confirmPwd" placeholder="请再次确认输入"></form-input>
			<div class="pointer login-btn ani-time resetPwd-top" @click="onClick_resetBtn">确定</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import sha256 from 'sha256';
	import FormInput from "../../components/formInput.vue";
	var _formData = {}, _codeData = {};
	export default{
		created(){
			this.init();
		},
		data(){
			return {
				g: g,
				account: '',
				phoneNum: '',
				password: '',
				errorTip: "",
				confirmPwd: '',
				verifyCode: ''
			}
		},
		components: {
			FormInput
		},
		methods: {
			init()
			{
				this.account = "";
				this.phoneNum = "";
				this.password = "";
				this.confirmPwd = "";
				this.verifyCode = "";

			},
			onClick_getCodeBtn()
			{
				_codeData.logon = this.account;
				_codeData.mobile = this.phoneNum;
				g.net.call("user/resetPasswordSendCode", _codeData).then(() =>
				{
					g.ui.toast("发送成功！");
				})
			},
			onClick_resetBtn()
			{
				_formData.logon = this.account;
				_formData.mobile = this.phoneNum;
				_formData.code = this.verifyCode;
				_formData.password = sha256(this.password);

				g.net.call('user/resetPwd', _formData).then(() =>
				{
					this.init();
					g.url = "/login";
				})

			},

		}
	}
</script>
