<template>
	<view-popup @close="onClose_pop"
				:isShowPopView="isShowPopView">
		<div class="detail-container">
			<p class="note-tit">通知</p>
			<div class="note-content">
				这里是通知内容 爽肤水大润发的发v大润发东方闪电水电费水电费沙发上的电风扇防守打法范甘迪发布
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
	.detail-container {
		color: #333333;
		height:288px;
		.note-tit {
			line-height: 64px;
			height: 64px;
			padding-left: 25px;
			margin: 0 15px;
			font-size: 15px;
			border-bottom: 1px solid #eaeaea;
		}
		.note-content {
			padding: 35px 72px 0 ;
			line-height: 36px;
			font-size: 14px;

		}
	}
</style>
