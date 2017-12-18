<template>
	<view-popup @close="onClose_pop"
				:isShowPopView="isShowPopView">
		<div class="orderWork-wrap">
			<div class="work-menu">

			</div>
			<div class="action-wrap clear ">
				<span class="cancel-btn pointer right ani-time">取消</span>
				<span class="action-btn  pointer right ani-time">确认</span>
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
	.orderWork-wrap {
		height: 386px;
		.note-tit {
			line-height: 64px;
			height: 64px;
			padding-left: 25px;
			font-size: 15px;
			border-bottom: 1px solid #eaeaea;
		}
		.work-menu {
			padding: 45px 0 0 90px;
		}
		.action-wrap {
			padding: 18px 34px 0 0;
			span {
				width: 88px;
				line-height: 36px;
				height: 36px;
				text-align: center;
				margin-left: 34px;
			}
		}
	}
</style>
