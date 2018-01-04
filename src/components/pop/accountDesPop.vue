<template>
	<view-popup class="account-content" @close="onClose_pop"
				:isShowPopView="isShowPopView">
		<div class="account-desc">
			<p class="note-tit">用户信息</p>
			<div class="user-list clear">
				<div class="user-item left clear">
					<span class="user-tit left">登录用户名</span>
					<div class="user-txt left">
						<span>{{accountData.username}}</span>
					</div>
				</div>
				<div class="user-item left clear">
					<span class="user-tit left">姓名</span>
					<div class="user-txt left">
						<span>{{accountData.name}}</span>
					</div>
				</div>
				<div class="user-item left clear">
					<span class="user-tit left">所属公司</span>
					<div class="user-txt left">
						<span>{{accountData.companyName}}</span>
					</div>
				</div>
				<div class="user-item left clear">
					<span class="user-tit left">所属部门</span>
					<div class="user-txt left">
						<span>{{accountData.departmentName}}</span>
					</div>
				</div>
				<div class="user-item left clear">
					<span class="user-tit left">职务名称</span>
					<div class="user-txt left">
						<span>{{accountData.dutyName}}</span>
					</div>
				</div>
			</div>
			<div class="user-list clear diff-padding">
				<div class="user-item left clear">
					<span class="user-tit left">手机</span>
					<div class="user-txt left">
						<span>{{accountData.phone}}</span>
					</div>
				</div>
				<div class="user-item left clear">
					<span class="user-tit left">固定电话</span>
					<div class="user-txt left">
						<span>{{accountData.telphone}}</span>
					</div>
				</div>
				<div class="user-item left clear">
					<span class="user-tit left">电子邮箱</span>
					<div class="user-txt left">
						<span>{{accountData.email}} </span>
					</div>
				</div>
			</div>
			<div class="user-list clear diff-padding">
				<div class="user-item left clear">
					<span class="user-tit left">备注</span>
					<div class="user-txt left diff-frame">
						<p>{{accountData.remark}}</p>
					</div>
				</div>
				<div class="user-item left clear">
					<span class="user-tit left diff-distancre">头像</span>
					<div class="user-txt left diff-frame">
						<div class="img-wrap">
							<img
									:src="accountData.avatar?g.param.ossUrl+accountData.avatar:g.path.images+'/default.png'" alt="">
						</div>
					</div>
				</div>
			</div>
			<div class="user-list diff-padding">
				<div class="user-item left clear">
					<span class="user-tit left diff-distancre">身份证照</span>
					<div class="user-txt left diff-frame">
						<div class="card-wrap left pointer" @click="onClick_imgBtn('idCardFront')">
							<img :src="g.param.ossUrl+accountData.idCardFront" alt="">
						</div>
						<div class="card-wrap left pointer">
							<img :src="g.param.ossUrl+accountData.idCardBack" alt=""
								 @click="onClick_imgBtn('idCardBack')">
						</div>
					</div>
				</div>
			</div>
			<div class="user-list diff-padding">
				<div class="user-item left clear">
					<span class="user-tit left diff-distancre">工作照</span>
					<div class="user-txt left diff-frame">
						<div class="card-wrap left work-wrap pointer" @click="onClick_imgBtn('workCard')">
							<img :src="g.param.ossUrl+accountData.workCard" alt="">
						</div>
					</div>
				</div>
			</div>

			<div class="user-list diff-padding" v-if="accountData.authStatus == 1 || accountData.authStatus == 3">
				<div class="user-item left clear">
					<span class="user-tit left diff-distancre">认证反馈</span>
					<div class="user-txt left diff-frame">
						<textarea class="verify-feedback iscroll-ref" v-model="opinion"></textarea>
					</div>
				</div>
			</div>
			<div class="desc-action absolute" v-if="accountData.authStatus == 1 || accountData.authStatus == 3">
				<span class="right cancel-btn ani-time pointer" @click="onClick_rejectedBtn">不通过</span>
				<span class="right action-btn ani-time pointer" @click="onClick_resolvedBtn">通过</span>
			</div>
		</div>
		<transition name="fade">
			<div class="slide-img fixed center-flex" @click="onClick_closeBtn" v-show="isShowSlidePop">
				<div class="desc-img relative">
					<img class="detail-img" :src=showUrl alt="">
					<div @click="onClick_closeBtn"
						 class="return-btn pointer ani-time">
						<img :src="g.path.images+'/close-popup.png'" alt="">
					</div>
				</div>
			</div>
		</transition>
	</view-popup>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import ViewPopup from "../viewPop.vue";
	var _params = null;
	export default{
		created()
		{
			this.init();
		},
		data(){
			return {
				g: g,
				showUrl: '',
				opinion: "",
				isShowSlidePop: false,
				accountData: {}
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
			currId: {
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
				if (this.currId > 0)
				{
					this.accountData = g.data.searchUnverifyPool.getDataById(this.currId);
					window.accountData = this.accountData;
				}
			},
			onClick_rejectedBtn()
			{

				_params = {
					userId: this.currId,
					authStatus: 3,
					authRemark: this.opinion
				};
				g.ui.showLoading()
				g.net.call("user/updateUserAuth", _params).then(($data) =>
				{
					g.ui.hideLoading();
					this.$emit("close", true);
					g.ui.toast("已拒绝该用户");
				}, (err) =>
				{
					g.func.dealErr(err);
				})
			},
			onClick_resolvedBtn()
			{
				_params = {
					userId: this.currId,
					authStatus: 2,
					authRemark: this.opinion
				};
				g.ui.showLoading()
				g.net.call("user/updateUserAuth", _params).then(($data) =>
				{
					g.ui.hideLoading();
					g.ui.toast("已认证该用户");
					this.$emit("close", true);
				}, (err) =>
				{
					g.func.dealErr(err);
				})
			},
			onClose_pop()
			{
				this.$emit('close', false);

			},
			onClick_closeBtn()
			{
				this.isShowSlidePop = false;
			},
			onClick_imgBtn($type)
			{
				this.showUrl = g.param.ossUrl + this.accountData[$type];
				this.isShowSlidePop = true;
			}
		}
	}
</script>
<style lang="sass" rel="stylesheet/scss" type="text/scss" scoped>
	.account-desc {
		height: 930px;
		.user-list {
			font-size: 14px;
			color: #000000;
			padding: 28px 0 0 28px;
			.user-item {
				.user-tit {
					line-height: 50px;
					height: 50px;
					width: 106px;
					text-align: right;
				}
				.diff-distancre {
					height: 77px;
					line-height: 77px;
				}
				.user-txt {
					min-width: 172px;
					margin-left: 25px;
					span {
						height: 50px;
						line-height: 50px;
						word-break: break-all;
					}
					p {
						max-height: 92px;

					}
					.img-wrap {
						img {
							display: block;
							height: 100%;
							width: auto;
						}
					}
					.card-wrap {
						max-width: 200px;
						height: 92px;
						overflow: hidden;
						margin-right: 35px;
						-webkit-border-radius: 4px;
						-moz-border-radius: 4px;
						border-radius: 4px;
						display: table-cell;
						text-align: center;
						vertical-align: middle;
						img {
							vertical-align: text-top;
							height: 100%;
						}
					}
					.work-wrap {
						width: 122px;
						height: 92px;
						margin-right: 0;
					}
					.verify-feedback {
						width: 100%;
						height: 54px;
						padding: 6px;
						border: 1px solid #dedede;
						text-indent: 1em;
						outline: none;
						-webkit-border-radius: 5px;
						-moz-border-radius: 5px;
						border-radius: 5px;
						&:focus {
							border: 1px solid #cccccc;
						}
					}

				}
				.diff-frame {
					width: 485px;
					padding: 18px 0 10px;
				}
			}
		}
		.diff-padding {
			padding: 0 0 0 28px;
		}
	}

	.desc-action {
		right: 0;
		bottom: 0;
		padding: 0 34px 42px 0;
		span {
			margin-left: 24px;
			width: 88px;
			height: 36px;
			line-height: 36px;
		}
	}

	.slide-img {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 100;
		background: rgba(0, 0, 0, .2);
		-webkit-perspective: 1300px;
		-moz-perspective: 1300px;
		perspective: 1300px;
		cursor: default;
		.desc-img {
			min-width: 480px;
			max-height: 70%;
			max-width: 100%;
			background: transparent;
			-webkit-border-radius: 5px;
			-moz-border-radius: 5px;
			border-radius: 5px;
			.detail-img {
				-webkit-user-select: none;
				min-width: 480px;
				max-height: 70%;
				max-width: 100%;
				background-position: 0px 0px, 10px 10px;
				background-size: 20px 20px;
				background-image: linear-gradient(45deg, #eeeeee 25%, transparent 25%, transparent 75%, #eeeeee 75%, #eeeeee 100%), linear-gradient(45deg, #eeeeee 25%, white 25%, white 75%, #eeeeee 75%, #eeeeee 100%);
			}
			.return-btn {
				position: absolute;
				right: -38px;
				top: -38px;
				padding: 10px;
				width: 25px;
				background: transparent;
				&:hover {
					-webkit-transform: translate3d(0, 5px, 0);
					-moz-transform: translate3d(0, 5px, 0);
					-ms-transform: translate3d(0, 5px, 0);
					-o-transform: translate3d(0, 5px, 0);
					transform: translate3d(0, 5px, 0);
				}
			}
		}
	}
</style>
