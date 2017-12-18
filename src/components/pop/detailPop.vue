<template>
	<view-popup @close="onClose_pop"
				:isShowPopView="isShowPopView">
		<div class="detail-container">
			<p class="note-tit">通知</p>
			<div class="note-content">
				{{msgData.desc}}
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
				msgData:{}
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
			currId:{

			}
		},
		methods: {
			init()
			{
				if(this.currId)
				{
					this.msgData = g.data.messagePool.getDataById(this.currId);
				}
			},
			onClose_pop(){
				this.$emit('close');
			}
		}
	}
</script>
<style lang="sass" rel="stylesheet/scss" type="text/scss" scoped>
	.detail-container {
		color: #333333;
		height: 288px;
		.note-content {
			padding: 35px 72px 0;
			line-height: 36px;
			font-size: 14px;

		}
	}
</style>
