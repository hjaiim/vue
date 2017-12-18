<template>
	<view-popup @close="onClose_pop"
				:isShowPopView="isShowPopView">
		<div class="orderWork-wrap">
			<p class="note-tit">指派岗位</p>
			<div class="work-menu">
				<div class="role-wrap clear">
					<div class="img-wrap left">
						<img :src="g.path.images+'/default-icon.png'" alt="">
					</div>
					<div class="role-detail left">
						<p>张蓝心</p>
						<ul class="role-box relative clear">
							<li class="left" v-for="n in 3">
								<span>部门经理</span></li>
						</ul>
					</div>
				</div>
				<div class="work-detail clear">
					<span class="menu-name left">岗位名称</span>
					<div class="option-content left relative" @click="onClick_jobMenu">
						商机管理员
						<i class="icon-trangle pointer" :class="isShowRoleList?'rotate':''"></i>
						<drop-list :dropList="roleList" :isShowDropList="isShowRoleList" @change="onClick_roleItem">
						</drop-list>
					</div>
					<span class="stick-name">审核岗</span>
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
	import ViewPopup from "../viewPop.vue";
	import DropList from "../dropList.vue"
	export default{
		data(){
			return {
				g: g,
				isShowRoleList: false,
				roleList: []
			}
		},
		components: {
			ViewPopup,
			DropList

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
			},
			onClick_jobMenu(){
				if (this.isShowRoleList)
				{
					this.isShowRoleList = false;
				}
				else
				{
					this.isShowRoleList = true;
				}
			},
			onClick_roleItem(){
				this.isShowRoleList = false;
			}
		}
	}
</script>
<style lang="sass" rel="stylesheet/scss" type="text/scss" scoped>
	.orderWork-wrap {
		height: 345px;
		.note-tit {
			line-height: 64px;
			height: 64px;
			padding-left: 25px;
			font-size: 15px;
			border-bottom: 1px solid #eaeaea;
		}
		.work-menu {
			padding: 45px 0 0 90px;
			color: #000000;
			font-size: 15px;
			.role-wrap {
				.img-wrap {
					width: 77px;
					height: 77px;
					overflow: hidden;
					-webkit-border-radius: 50%;
					-moz-border-radius: 50%;
					border-radius: 50%;
					img {
						display: block;
						width: 100%;
					}
				}
				.role-detail {
					padding-left: 26px;
					p {
						line-height: 40px;
						height: 40px;

					}
					ul {
						left: -16px;
						li {
							line-height: 40px;
							font-size: 14px;
							height: 40px;
							span {
								display: inline-block;
								height: 14px;
								line-height: 14px;
								padding: 0 16px;
								border-right: 1px solid #999999;
							}
							&:last-child {
								span {
									border-right: 0;
								}
							}
						}
					}
				}
			}
			.work-detail {
				padding-top: 25px;
				.menu-name {
					height: 32px;
					line-height: 32px;
					text-align: right;
					width: 74px;
				}
				.option-content {
					margin-left: 25px;

				}
				.stick-name {
					height: 32px;
					line-height: 32px;
					color: #f2808b;
					padding-left: 16px;
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
