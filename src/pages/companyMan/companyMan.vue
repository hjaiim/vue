<template>
	<com-layout>
		<div class="plat-wrap">
			<div class="action-wrap clear">
				<span class="add-btn action-btn ani-time left pointer">
					<i class="cross-txt relative"></i>
					<span>新增</span>
				</span>
				<div class="search-wrap clear left">
					<span class="left">公司名称</span>
					<div class="search-bar left relative">
						<input type="text" class="search-name">
						<img class="close-btn absolute pointer" :src="g.path.images+'/close-popup.png'" alt="">
					</div>
				</div>
				<span class="search-btn action-btn ani-time left pointer">查询</span>
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
	@import "../../css/platManage.scss";
</style>