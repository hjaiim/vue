<template>
	<div>
		<div>我的姓名{{name}}</div>
		<div>我的年龄{{age}}</div>
		<div>我的爱好</div>
		<div v-for="item in hobby">
			<span>{{item}}</span>
		</div>
		<div>{{'自定义' + custom}}</div>
	</div>
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
			name: {
				type: String,
				default: 'hjai'//默认值
			},
			age: {
				type: Number,
				default: 27,
				required: true//毕传的值,否者报错
			},
			hobby: {
				type: Array,
				default: function ()//数组/对象应该用函数返回,父组件没有任何值传
				{
					return ['basketball', 'computer-game', 'sleep']
				}
			},
			custom: {
				validator: function ($v)// 自定义验证函数(值小于10就会报错)
				{
					return $v < 10
				}
			}
		},
		components: {},
		watch: {},
		methods: {}
	}

</script>
<style type="text/css" lang="sass" rel="stylesheet/css" scoped>

</style>
