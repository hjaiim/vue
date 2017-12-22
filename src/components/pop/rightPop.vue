<template>
	<view-popup @close="onClose_pop"
				:isShowPopView="isShowPopView" class="right-viewPop">
		<div class="right-container">
			<p class="right-content">管理员正在审核您的认证申请，账号暂时关闭，请您耐心等候...</p>
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
			},
		},
		methods: {
			onClose_pop(){
				this.$emit('close');
			}
		}
	}
</script>
<style lang="sass" rel="stylesheet/scss" type="text/scss" scoped>
	.right-container {
		color: #333333;
		height: 180px;
		.right-content {
			line-height: 180px;
			text-align: center;
			font-size: 22px;

		}
	}
</style>
