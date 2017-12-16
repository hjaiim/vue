<template>
	<view-popup @close="onClose_pop"
				:isShowPopView="isShowPopView">
		<div class="setRule-wrap">
			<p class="note-tit">角色设置</p>
			<div class="set-content">

			</div>
		</div>
	</view-popup>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import ViewPopup from "../viewPop.vue"
	export default{
		data(){
			return {
				g: g,
			}
		},
		components: {
			ViewPopup
		},
		props: {
			isShowPopView: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			onClose_pop(){
				this.$emit('close');
			}
		}
	}
</script>
<style lang="sass" rel="stylesheet/scss" type="text/scss" scoped>
	.setRule-wrap {
		height: 384px;
		.note-tit {
			line-height: 64px;
			height: 64px;
			padding-left: 25px;
			margin: 0 15px;
			font-size: 15px;
			border-bottom: 1px solid #eaeaea;
		}
		.set-content {

		}
	}
</style>
