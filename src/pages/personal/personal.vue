<template>
	<com-layout>
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