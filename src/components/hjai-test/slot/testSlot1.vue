<template>
	<div class="slot1">
		<span>我是子组件内容</span>
		<slot></slot>
	</div>

		<!--单个内容分发:
		当子组件模板只有一个没有属性的 slot 时，
		父组件整个内容片段将插入到 slot 所在的 DOM 位置，
		并替换掉 slot 标签本身。
		-->
</template>
<script type="text/ecmascript-6">
//	import g from "../../global";
	export default{
		created(){

		},
		data(){
			return {

			}
		},
		components: {},
		watch: {},
		methods: {}
	}

</script>
<style type="text/css" lang="sass" rel="stylesheet/css" scoped>

</style>
