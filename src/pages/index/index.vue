<template>
	<div class="wrap-page wrap-container">
		<div class="top-header fixed"></div>
		<div class="wrap-col relative">
			<div class="left-col fixed">
				<div class="scroll-view">
					<nav-bar></nav-bar>
				</div>
			</div>
			<div class="right-col"></div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import g from './../../global';
	import NavBar from "../../components/navBar.vue"
	export default {
		created(){
			this.init();
		},
		data(){
			return {
				g: g

			}
		},
		components: {
			NavBar
		},
		methods: {
			init(){

			},
			update()
			{

			},
			render()
			{

			},
			destroy()
			{

			}

		}
	}
</script>
<style lang="sass" rel="stylesheet/scss" type="text/scss" scoped>
</style>