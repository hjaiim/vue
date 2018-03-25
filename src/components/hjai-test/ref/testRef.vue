<template>
	<div>
		<p>{{name}}</p>

		<div @click="onClick_traceRef">打印ref</div>
		<div ref="sex" id="sexDiv">man</div>
		<ul v-for="item in arr">
			<li ref="item">{{item}}</li>
		</ul>
	</div>
	<!--ref给元素祖册引用信息
	1.如果注册的是普通dom元素,引用指向的就是这个当前元素,等同于获取dom元素.
	2.如果注册的是子组件,引用的就是这个组件的实例,那么实例上面的属性自然可以用.
	3.如果和v-for一起用,那么引用的ref是个数组.
		-->

	<!--$refs
	一个对象类型,持有所有ref注册的dom元素
	-->
</template>
<script type="text/ecmascript-6">
	import g from "../../../global";
	export default{
		created(){

		},
		data(){
			return {
				g: g,
				name: 'hjai',
				arr: [1, 2, 4]
			}
		},
		components: {},
		watch: {},
		methods: {
			onClick_repaint($v){
				this.name = $v + 'hjai';
				console.log('重新渲染子组件dom');
			},
			onClick_traceRef()
			{
				console.log(this.$refs.item[1]);
				console.log(this.$refs.sex);
				console.log(document.getElementById('sexDiv'));
			}
		}
	}

</script>
<style type="text/css" lang="sass" rel="stylesheet/css" scoped>

</style>
