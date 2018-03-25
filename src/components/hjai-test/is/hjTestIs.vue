<template>
	<div class="is-content">
		<p>我是'is'的主体</p>
	</div>
	
	<!--
	父组件引用is,会把2个类合并在一起,内容只有子组件的内容
	-->
</template>
<script type="text/ecmascript-6">
	import g from "../../../global";
	export default{
		created(){

		},
		data(){
			return {
				g: g
			}
		},
		components: {},
		watch: {},
		methods: {}
	}

</script>
<style type="text/css" lang="sass" rel="stylesheet/css" scoped>
	p {
		color: #ed5564;

	}
</style>
