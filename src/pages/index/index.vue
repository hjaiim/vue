<template>
	<com-layout></com-layout>
</template>
<script type="text/ecmascript-6">
	import g from './../../global';
	import ComLayout from "../../components/comLayout.vue"
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
			ComLayout
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