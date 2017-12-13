<template>
	<com-layout currId="percenter" currPath="/verify">
		<div class="percenter-wrap">
			<div class="menu-wrap">
				<ul class="per-menu clear">
					<li class="left ani-time relative pointer high-active">个人信息</li>
					<li class="left ani-time relative pointer">修改密码</li>
				</ul>
			</div>
			<div class="percenter-inner">
				<p class="icon-collect clear">
					<i class="default-img right">
						<img :src="g.path.images+'/default-icon.png'" alt="">
					</i>
				</p>
			</div>
			<div class="personal-message">
				<div class="personal-form"><span class="personal-title ">登录用户名</span><span class="personal-content">158********</span></div>
				<div class="personal-form"><span class="personal-title">姓名</span><span class="personal-content">张三</span></div>
				<div class="personal-form">
					<span class="personal-title left">所属部门</span>
					<div class="personal-content left relative form-list" @click="onClick_departmentBtn">
						<span class="icon-trangle rotate"></span>
						<ul class="absolute drop-list" v-show="isSow_departmentList">
							<li>幻舞网络</li>
							<li>幻舞网络</li>
							<li>幻舞网络</li>
						</ul>
					</div>
				</div>
				<div class="personal-form">
					<span class="personal-title">手机</span>
					<input class="personal-content pensonal-input">
				</div>
				<div class="personal-form">
					<span class="personal-title">验证码</span>
					<input class="personal-content pensonal-input code">
					<span class="btn-send pointer">发送验证码</span>
				</div>
				<div class="personal-form"><span class="personal-title">固定电话</span><input class="personal-content pensonal-input"></div>
				<div class="personal-form"><span class="personal-title">电子邮箱</span><input class="personal-content pensonal-input"></div>
				<div class="personal-form"><span class="personal-title">备注</span><input class="personal-content pensonal-input note"></div>
				<div class="btn btn-save pointer">保存</div>
			</div>
		</div>
	</com-layout>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import ComLayout from "../../components/comLayout.vue"
	export default{
		created(){

		},
		data(){
			return {
				g: g,
				isSow_dapartmentList:false
			}
		},
		components: {
			ComLayout
		},
		methods: {
			onClick_departmentBtn:{

			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css" scoped>
	@import "../../css/mixin.scss";
	@import "../../css/percenter.scss";
</style>
<style type="text/css" lang="sass" rel="stylesheet/css">
	@import "../../css/personal.scss";
</style>
