<template>
	<div class="wrap-page register-wrap relative">
		<div class="inner-register is-transformed">
			<p class="register-tit">创客沃土</p>
			<div class="form-wrap">
				<div class="register-form">
					<p>登录名:</p>
					<input class="user-name border-gray-light ani-time" type="text" placeholder="请输入登录名：">
				</div>
			</div>
			<div class="form-wrap">
				<div class="register-form">
					<p>手机号码:</p>
					<input class="phone-num border-gray-light ani-time" type="text" placeholder="请输入手机号：">
				</div>
			</div>
			<div class="form-wrap">
				<div class="register-form">
					<p>验证码:</p>
					<div class="input-wrap">
						<input class="verify-code border-gray-light ani-time" type="text" placeholder="请输入验证码：">
						<span class="send-btn pointer right ani-time">验证码
						</span>
					</div>
				</div>
			</div>
			<div class="form-wrap">
				<div class="register-form">
					<p>新密码:</p>
					<input class="phone-num border-gray-light ani-time" type="password" placeholder="请输入密码：">
				</div>
			</div>
			<div class="form-wrap">
				<div class="register-form">
					<p>重复密码:</p>
					<input class="phone-num border-gray-light ani-time" type="password" placeholder="请再输入密码：">
				</div>
			</div>
			<div class="sure-btn pointer ani-time">确定</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	export default{
		created(){

		},
		data(){
			return {
				g: g,
			}
		},
		methods: {}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css" scoped>
	@import "../../css/mixin.scss";
	@import "../../css/register.scss";
</style>