<template>
	<transition name="fade">
		<div class="login-pop fixed center-flex" v-show="isShowPopView">
			<div class="login-content relative">
				<img :src="g.path.images+'/loading.gif'" alt="">
				<p>登录中,请稍后...</p>
			</div>
		</div>
	</transition>
</template>
<script type="text/ecmascript-6">
	import g from "../../global"
	export default{
		data(){
			return {
				g: g,
			}
		},
		props: {
			isShowPopView: {
				type: Boolean,
				default: false
			}
		},
		components: {},
		methods: {}
	}
</script>
<style lang="sass" rel="stylesheet/scss" type="text/scss" scoped>
	.login-pop {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 100;
		background: transparent;
		-webkit-perspective: 1300px;
		-moz-perspective: 1300px;
		perspective: 1300px;
		cursor: default;
		.login-content {
			padding: 5px 15px 20px;
			background: #3c3c3f;
			filter: alpha(opacity=90);
			-moz-opacity: 0.9;
			-khtml-opacity: 0.9;
			opacity: 0.9;
			border-radius: 10px;
			img {
				display: block;
				margin: 10px auto;
			}
			p {
				text-align: center;
				color: #ffffff;
			}
		}
	}
</style>
