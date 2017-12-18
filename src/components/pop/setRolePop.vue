<template>
	<view-popup @close="onClose_pop"
				:isShowPopView="isShowPopView">
		<div class="setRole-wrap">
			<p class="note-tit">角色设置</p>
			<div class="set-content">
				<div class="role-list clear">
					<p class="left">姓名</p>
					<div class="left menu-item">张岚</div>
				</div>
				<div class="role-list clear">
					<p class="left">所属公司</p>
					<div class="left menu-item">沛城分公司</div>
				</div>
				<div class="role-list clear">
					<p class="left">职务名称</p>
					<div class="left menu-item">销售部经理</div>
				</div>
				<div class="role-list radio-show clear">
					<p class="left">角色选择</p>
					<div class="left menu-item">
						<ul class="role-list clear">
							<li class="left" v-for="(n,index) in 3">
								<div class="action-box role-item">
									<i class="pointer action"></i>
									<span>人员管理权</span>
								</div>
							</li>
						</ul>
					</div>
				</div>
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
	.setRole-wrap {
		height: 386px;
		.set-content {
			padding-top: 20px;
			.role-list {
				font-size: 14px;
				margin-bottom: 15px;
				color: #666666;
				p {
					width: 130px;
					height: 40px;
					line-height: 40px;
					text-align: right;
				}
				.menu-item {
					padding-left: 24px;
					height: 40px;
					line-height: 40px;
				}
			}
			.radio-show {
				color: #101010;
				.role-list {
					.role-item {
						height: 40px;
						line-height: 40px;
						margin: 0;
						vertical-align: middle;
						span {
							height: 40px;
							line-height: 40px;
							vertical-align: middle;
							padding: 0 18px;
						}
					}
				}
			}
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
