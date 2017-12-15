<template>
	<com-layout currId="/">
		<div class="percenter-wrap">
			<div class="menu-wrap">
				<percenter-tab></percenter-tab>
			</div>
			<div class="personal-message" v-show="type=='modpwd'">
				<p class="personal-form"><span class="personal-title">手机</span><input
						class="personal-content pensonal-input"></p>
				<p class="personal-form"><span class="personal-title">固定电话</span><input
						class="personal-content pensonal-input"></p>
				<p class="personal-form"><span class="personal-title">电子邮箱</span><input
						class="personal-content pensonal-input"></p>
				<div class="btn btn-save pointer">保存</div>
			</div>
		</div>
	</com-layout>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import ComLayout from "../../components/comLayout.vue"
	import PercenterTab from "../../components/percenterTab.vue";
		export default{
		created(){

		},
		data(){
			return {
				g: g,
			}
		},
		components: {
			ComLayout,
			PercenterTab
		},
		methods: {}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css" scoped>
	@import "../../css/mixin.scss";
	@import "../../css/percenter.scss";
</style>
<!--<style type="text/css" lang="sass" rel="stylesheet/css">-->
	<!--@import "../../css/personal.scss";-->
<!--</style>-->
