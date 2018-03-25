<template>
	<view-popup @close="onClose_pop"
				:isShowPopView="isShowPopView">
		<div class="orderWork-wrap">
			<p class="note-tit">指派岗位</p>
			<div class="work-menu">
				<div class="role-wrap clear">
					<div class="img-wrap left">
						<img :src="accountData.avatar?g.param.ossUrl+accountData.avatar:g.path.images+'/default.png'" alt="">
					</div>
					<div class="role-detail left">
						<p>{{accountData.name}}</p>
						<ul class="role-box relative clear">
							<li class="left">
								<span>{{accountData.companyName}}</span></li>
							<li class="left" v-show="accountData.departmentName">
								<span>{{accountData.departmentName}}</span></li>
							<li class="left" v-show="accountData.dutyName">
								<span>{{accountData.dutyName}}</span></li>
							<li class="left" v-show="!accountData.departmentName&&!accountData.dutyName"><span>直属人员</span></li>
						</ul>

					</div>
				</div>
				<div class="work-detail clear">
					<span class="menu-name left">岗位名称</span>
					<div class="option-content left relative pointer" @click="onClick_jobMenu">
						{{positionData.name?positionData.name:'请选择'}}
						<i class="icon-trangle pointer" :class="isShowRoleList?'rotate':''"></i>
						<drop-list class="order-workList" :dropList="positionList" :isShowDropList="isShowRoleList"
								   @change="onClick_positionItem">
						</drop-list>
					</div>
					<span class="stick-name">{{positionData.typeDesc}}</span>
				</div>
			</div>
			<div class="action-wrap clear ">
				<span class="cancel-btn pointer right ani-time" @click="onClick_cancelBtn">取消</span>
				<span class="action-btn  pointer right ani-time" @click="onClick_confirmBtn">确认</span>
			</div>
		</div>
	</view-popup>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import ViewPopup from "../viewPop.vue";
	import DropList from "../dropList.vue";
	var _params = null;
	export default{
		data(){
			return {
				g: g,
				isShowRoleList: false,
				positionList: [],
				positionData: {},
				accountData: {}
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
			},
			currOrderId: {
				default: 0
			},
			currWorkId:{
				default: 0
			}
		},
		watch: {
			isShowPopView($val)
			{
				this.init();
			}
		},
		methods: {
			init()
			{
				if (this.currOrderId)
				{
					this.accountData = g.data.searchAccountPool.getDataById(this.currOrderId);
					this.positionList = g.data.searchPositionPool.list;
					this.positionData = this.currWorkId!=-1?g.data.searchPositionPool.getDataById(this.currWorkId):{};

				}
			},
			onClose_pop()
			{
				this.isShowRoleList = false;
				this.$emit('close', false);
			},
			onClick_jobMenu()
			{
				if (this.isShowRoleList)
				{
					this.isShowRoleList = false;
				}
				else
				{
					this.isShowRoleList = true;
				}
			},
			onClick_positionItem($id)
			{
				this.isShowRoleList = false;
				var data = g.data.searchPositionPool.getDataById($id);
				this.positionData = __merge({}, data);
			},
			onClick_cancelBtn()
			{
				this.isShowRoleList = false;
				this.$emit('close', false)
			},
			onClick_confirmBtn()
			{
				this.isShowRoleList = false;
				_params = {
					userId: this.currOrderId,
					stationId: this.positionData.id,
					stationType: this.positionData.type
				};
				g.ui.showLoading()
				g.net.call("user/editUserStation", _params).then(($data) =>
				{
					g.ui.hideLoading();
					var positionData = g.data.searchPositionPool.getDataById(_params.stationId);
					_params.stationTypeDesc = positionData.typeDesc;
					_params.stationName = positionData.name;
					g.data.searchAccountPool.getDataById(_params.userId).update(_params);
					g.ui.toast("岗位设置成功！");
					this.$emit('close', true)
				}, (err) =>
				{
					g.func.dealErr(err);
				})
			}
		}
	}
</script>
<style lang="sass" rel="stylesheet/scss" type="text/scss" scoped>
	.orderWork-wrap {
		height: 380px;
		.work-menu {
			padding: 45px 0 0 90px;
			color: #000000;
			font-size: 15px;
			.role-wrap {
				.role-detail {
					padding-left: 26px;
					p {
						line-height: 40px;
						height: 40px;
					}
					ul {
						left: -16px;
						max-width: 454px;
						li {
							line-height: 40px;
							white-space: nowrap;
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
				padding: 25px 0 10px 0;
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
