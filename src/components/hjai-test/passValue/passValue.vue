<template>
	<div>
		<slot></slot>
		<div>子组件获得的值为{{age}}</div>
		<button @click="parentClick">子组件按钮</button>
	</div>

	<!--父组件传值给子组件props,
	子组件传值给父组件函数回调this.$emit('父组件event','value')
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
		props: {
			age: {
				default: 0,
				type: Number
			}
		},
		components: {},
		watch: {},
		methods: {
			parentClick(){
				this.$emit('change', '我从父组件获得年龄的值为' + this.age);
			}
		}
	}

</script>
<style type="text/css" lang="sass" rel="stylesheet/css" scoped>
	button{
		background-color: red;
	}
</style>
