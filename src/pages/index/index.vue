<template>
	<com-layout currId="percenter" currPath="/">
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
				<p class="personal-form"><span class="personal-title">所属公司</span><span class="personal-content">苏州分公司</span></p>
				<p class="personal-form"><span class="personal-title">所属部门</span><span class="personal-content">销售部</span></p>
				<p class="personal-form"><span class="personal-title">职务名称</span><span class="personal-content">销售经理</span></p>
				<p class="personal-form"><span class="personal-title">岗位名称</span><span class="personal-content">客户经理</span></p>
				<p class="personal-form"><span class="personal-title">角色</span><span class="personal-content">人员认证权</span></p>
				<p class="personal-form"><span class="personal-title">姓名</span><span class="personal-content">张三</span></p>
				<p class="personal-form">
					<span class="personal-title">手机</span>
					<input class="personal-content pensonal-input">
					<span class="bind-phone pointer">解绑</span>
				</p>
				<p class="personal-form">
					<span class="personal-title">验证码</span>
					<input class="personal-content pensonal-input code">
					<span class="btn-send pointer">发送验证码</span>
					<span class="bind-phone pointer">解绑</span>
				</p>
				<p class="personal-form"><span class="personal-title">固定电话</span><input class="personal-content pensonal-input"></p>
				<p class="personal-form"><span class="personal-title">电子邮箱</span><input class="personal-content pensonal-input"></p>
				<p class="personal-form"><span class="personal-title">备注</span><input class="personal-content pensonal-input note"></p>
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
			}
		},
		components: {
			ComLayout
		},
		methods: {}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css" scoped>
	@import "../../css/mixin.scss";
	@import "../../css/percenter.scss";
</style>
<style type="text/css" lang="sass" rel="stylesheet/css">
	@import "../../css/personal.scss";
</style>
