<template>
	<div class="wrap-page register-wrap relative">
		<div class="inner-register is-transformed">
			<p class="register-tit">创客沃土注册</p>
			<div class="form-wrap">
				<div class="register-form">
					<p>登录名:</p>
					<input class="user-name border-gray-light ani-time" type="text" placeholder="请输入登录名：">
				</div>
			</div>
			<div class="form-wrap">
				<div class="register-form">
					<p>姓名:</p>
					<input class="phone-num border-gray-light ani-time" type="text" placeholder="请输入您的姓名：">
				</div>
			</div>
			<div class="form-wrap">
				<div class="register-form">
					<p>密码:</p>
					<input class="phone-num border-gray-light ani-time" type="password" placeholder="请输入密码：">
				</div>
			</div>
			<div class="form-wrap">
				<div class="register-form">
					<p>重复密码:</p>
					<input class="phone-num border-gray-light ani-time" type="password" placeholder="请再输入密码：">
				</div>
			</div>
			<div class="action-wrap">
				<span class="back-btn ani-time pointer left">返回</span>
				<span class="register-btn ani-time pointer right">注册</span>
			</div>

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