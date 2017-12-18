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
				<span class="send-btn absolute pointer" @click="onClick_getCodeBtn">获取验证码</span>
			</div>
			<form-input type="password" v-model="password" placeholder="请输入新密码"
						@focus="onFocus_formInput('password')" :errmsg="errData.password"></form-input>
			<form-input type="password" v-model="confirmPwd" placeholder="请再次确认输入"
						@focus="onFocus_formInput('confirmPwd')" :errmsg="errData.confirmPwd"></form-input>
			<div class="pointer login-btn ani-time resetPwd-top" @click="onClick_resetBtn">确定</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import sha256 from 'sha256';
	import FormInput from "../../components/formInput.vue";
	var _params = {}, _codeData = {};
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
				errData:{}
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
				if(!_isValid)
				{
					return ;
				}
				_codeData.logon = this.account;
				_codeData.mobile = this.phone;
				g.net.call("user/resetPasswordSendCode", _codeData).then(() =>
				{
					g.ui.toast("发送成功！");
				})
			},
			onClick_resetBtn()
			{
				this.checkResetDataValid();
				if(!_isValid)
				{
					return ;
				}
				_params.logon = this.account;
				_params.mobile = this.phone;
				_params.code = this.code;
				_params.password = sha256(this.password);

				g.net.call('user/resetPwd', _params).then(() =>
				{
					this.init();
					g.url = "/login";
				})
			},
			onFocus_formInput($type)
			{
				this.errData[$type] = "";
			},
			checkCodeDataValid()
			{
				if(!this.account)
				{
					_isValid = false;
					this.errData.account = "内容不能为空";
				}
				if(!this.phone)
				{
					_isValid = false;
					this.errData.phone = "内容不能为空";
				}
			},
			checkResetDataValid()
			{

				this.checkCodeDataValid();
				if(!this.password)
				{
					_isValid = false;
					this.errData.password = "内容不能为空";
				}
				if(!this.confirmPwd)
				{
					_isValid = false;
					this.errData.confirmPwd = "内容不能为空";
				}
				if(!this.code)
				{
					_isValid = false;
					this.errData.code = "内容不能为空";
				}
			}

		}
	}
</script>
