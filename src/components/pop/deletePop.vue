<template>
	<div class="delete-pop absolute gray-shadow" v-show="isDeletePop">
		<div class="sure-content absolute">
			<div class="quesiton-txt">
				<img :src="g.path.images+'/quesiton-icon.png'" alt="">
				<slot></slot>
			</div>
			<div class="btn-wrap clear">
				<i class="action-btn right cancel-btn ani-time pointer"
				   @click.stop="onClick_cancelBtn">取消</i>
				<i class="action-btn right delete-btn ani-time pointer"
				   @click.stop="onClick_confirmBtn">删除
				</i>
			</div>
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
		props: {
			isDeletePop: false
		},
		components: {},
		methods: {
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
		right: -18px;
		top: -132px;
		z-index: 5;
		width: 268px;
		height: 118px;
		background: #ffffff;
		-webkit-border-radius: 4px;
		-moz-border-radius: 4px;
		border-radius: 4px;
		&:before {
			position: absolute;
			content: "";
			height: 12px;
			width: 12px;
			bottom: -6px;
			right: 25px;
			overflow: hidden;
			background-color: #ffffff;
			pointer-events: none;
			transform: rotate(-135deg);
			z-index: -1;
			border-top: 1px solid rgba(0, 0, 0, 0.25);
			border-left: 1px solid rgba(0, 0, 0, 0.25);
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
		}
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
				color:#404040;
				font-weight: 100;

				img {
					display: inline-block;
					vertical-align: middle;
				}
				i {
					display: inline-block;
					padding-left: 14px;
					vertical-align: middle;
					height: 62px;
					line-height: 62px;
					font-size: 14px;
					color: #333333;
				}

			}

		}
	}
</style>
