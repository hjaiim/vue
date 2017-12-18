<template>
	<view-popup @close="onClose_pop"
				:isShowPopView="isShowPopView">
		<p class="note-tit">删除</p>
		<div class="delete-pop relative">
			<div class="sure-content absolute">
				<div class="quesiton-txt">
					<img :src="g.path.images+'/quesiton-icon.png'" alt="">
					<span>您确定要删除全部消息？</span>
				</div>
				<div class="btn-wrap clear">
					<i class="action-btn right cancel-btn ani-time pointer"
					   @click.stop="onClick_cancelBtn">取消</i>
					<i class="action-btn right delete-btn ani-time pointer"
					   @click.stop="onClick_confirmBtn">确定
					</i>
				</div>
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
				g: g
			}
		},
		props: {
			isShowPopView: false
		},
		components: {
			ViewPopup
		},
		methods: {
			onClose_pop(){
				this.$emit('close', false);
			},
			onClick_cancelBtn(){
				this.$emit('close', false);
			},
			onClick_confirmBtn(){
				this.$emit('close', true);
			}
		}
	}
</script>
<style lang="sass" rel="stylesheet/scss" type="text/scss" scoped>
	.delete-pop {
		height: 118px;
		width: 100%;
		background: #ffffff;
		-webkit-border-radius: 4px;
		-moz-border-radius: 4px;
		border-radius: 4px;
		.sure-content {
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			cursor: default;
			background-color: #ffffff;
			.quesiton-txt {
				height: 62px;
				line-height: 62px;
				padding: 0 0 6px 28px;
				vertical-align: middle;
				text-align: left;
				img {
					display: inline-block;
					vertical-align: middle;
				}
				span {
					display: inline-block;
					padding-left: 14px;
					vertical-align: middle;
					height: 62px;
					line-height: 62px;
					font-size: 14px;
					color: #333333;
				}
			}
			.btn-wrap {
				.action-btn {
					height: 32px;
					width: 58px;
					line-height: 32px;
				}
			}

		}
	}
</style>
