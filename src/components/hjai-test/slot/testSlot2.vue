<template>
	<div class="slot2">
		<span>我是子组件slot外内容</span>
		<slot name="header">
			<span>我是slot-header内容</span>
		</slot>
		<slot name="footer">
			<span>我是slot-footer内容</span>
		</slot>
	</div>
	<!--一个组件中如果想使用多个slot那么此时就应该使用具名slot,
	<slot> 元素可以用一个特殊的属性 name 来配置如何分发内容。
	多个 slot 可以有不同的名字。具名 slot 将匹配内容片段中有对应 slot 特性的元素
	-->
</template>
<script type="text/ecmascript-6">
//	import g from "../../global";
	export default{
		created(){

		},
		data(){
			return {
//				g: g
			}
		},
		components: {},
		watch: {},
		methods: {}
	}

</script>
<style type="text/css" lang="sass" rel="stylesheet/css" scoped>

</style>
