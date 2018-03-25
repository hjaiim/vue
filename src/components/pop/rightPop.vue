<template>
	<view-popup @close="onClose_pop"
				:isShowPopView="isShowPopView" class="right-viewPop">
		<div class="right-container">
			<p class="right-content">管理员正在审核您的认证申请，账号暂时关闭，请您耐心等候...
				<span class="right ani-time draw-line" @click="onClick_exitBtn">退出</span></p>
		</div>
	</view-popup>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import loginManager from "../../js/manager/LoginManager"
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
			},
			onClick_exitBtn(){
				loginManager.logout();
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
			font-size: 14px;
			span {
				position: relative;
				top: 106px;
				left: -81px;
				height: auto;
				line-height: initial;
				padding: 5px 5px 0;
				color: #61a4de;
				&:hover {
					color: #2c85d3;
				}
			}
		}
	}
</style>
