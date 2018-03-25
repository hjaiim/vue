<template>
	<div class="empty-wrap center-flex">
		<div class="empty-content">
			<img :src="g.path.images+'/empty-icon.png'" alt="">
			<p>暂无内容更新</p>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import g from "../../global"
	export default{
		data(){
			return {
				g: g
			}
		},
		components: {},
		methods: {}
	}
</script>
<style lang="sass" rel="stylesheet/scss" type="text/scss" scoped>
	.empty-wrap {
		width: 100%;
		.empty-content {
			padding: 130px 0;
			img {
				display: block;
				width: 224px;
			}
			p {
				line-height: 80px;
				color: #797979;
				font-size: 19px;
				text-align: center;
			}
		}

	}
</style>
