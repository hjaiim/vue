<template>
	<div class="is-content">
		<p>我是'is'的主体</p>
	</div>

	<!--
	父组件引用is,会把2个类合并在一起,内容只有子组件的内容,
	些元素内部不能使用自定义标签或者自定义标签内也不能放某些特殊的标签，
	这时候就要用is代替一下，让html语法符合规则验证。is属于指定要在内部使用的标签。
	<ul>
    	<component-name></component-name>  会报错
	</ul>

	<ul>
    	<li is="component-name"></li>		没问题
	</ul>
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
