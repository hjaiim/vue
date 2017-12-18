<template>
	<view-popup class="account-content" @close="onClose_pop"
				:isShowPopView="isShowPopView">
		<div class="account-desc">
			<p class="note-tit">角色设置</p>
			<div class="user-list clear">
				<div class="user-item left clear">
					<span class="user-tit left">登录用户名</span>
					<div class="user-txt left">
						<span>hahaha</span>
					</div>
				</div>
				<div class="user-item left clear">
					<span class="user-tit left">姓名</span>
					<div class="user-txt left">
						<span>张三</span>
					</div>
				</div>
				<div class="user-item left clear">
					<span class="user-tit left">所属公司</span>
					<div class="user-txt left">
						<span>江苏分公司</span>
					</div>
				</div>
				<div class="user-item left clear">
					<span class="user-tit left">所属部门</span>
					<div class="user-txt left">
						<span>运营部</span>
					</div>
				</div>
				<div class="user-item left clear">
					<span class="user-tit left">职务名称</span>
					<div class="user-txt left">
						<span>运营经理</span>
					</div>
				</div>
			</div>
			<div class="user-list clear diff-padding">
				<div class="user-item left clear">
					<span class="user-tit left">手机</span>
					<div class="user-txt left">
						<span>13000000000</span>
					</div>
				</div>
				<div class="user-item left clear">
					<span class="user-tit left">固定电话</span>
					<div class="user-txt left">
						<span>12345678</span>
					</div>
				</div>
				<div class="user-item left clear">
					<span class="user-tit left">电子邮箱</span>
					<div class="user-txt left">
						<span>dfsaf@das.com </span>
					</div>
				</div>
			</div>
			<div class="user-list clear diff-padding">
				<div class="user-item left clear">
					<span class="user-tit left">备注</span>
					<div class="user-txt left diff-frame">
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean</p>
					</div>
				</div>
				<div class="user-item left clear">
					<span class="user-tit left diff-distancre">头像</span>
					<div class="user-txt left diff-frame">
						<div class="img-wrap">
							<img :src="g.path.images+'/default-icon.png'" alt="">
						</div>
					</div>
				</div>
			</div>
			<div class="user-list diff-padding">
				<div class="user-item left clear">
					<span class="user-tit left diff-distancre">身份证照</span>
					<div class="user-txt left diff-frame">
						<div class="card-wrap left pointer" @click="onClick_imgBtn()">
							<img :src="g.path.images+'/card.png'" alt="">
						</div>
						<div class="card-wrap left pointer">
							<img :src="g.path.images+'/card.png'" alt="" @click="onClick_imgBtn()">
						</div>
					</div>
				</div>
			</div>
			<div class="user-list diff-padding">
				<div class="user-item left clear">
					<span class="user-tit left diff-distancre">身份证照</span>
					<div class="user-txt left diff-frame">
						<div class="card-wrap left work-wrap">
							<img :src="g.path.images+'/work-card.png'" alt="">
						</div>
					</div>
				</div>
			</div>
			<div class="user-list diff-padding">
				<div class="user-item left clear">
					<span class="user-tit left diff-distancre">认证反馈</span>
					<div class="user-txt left diff-frame">
						<textarea class="verify-feedback"></textarea>
					</div>
				</div>
			</div>
			<div class="desc-action absolute">
				<span class="right cancel-btn ani-time pointer">不通过</span>
				<span class="right action-btn ani-time pointer">通过</span>
			</div>
		</div>
		<transition name="fade">
			<div class="slide-img fixed center-flex" v-show="isShowSlidePop">
				<div class="desc-img relative">
					<img :src=showUrl alt="">
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
	import g from "../../global"
	import ViewPopup from "../viewPop.vue"
	export default{
		data(){
			return {
				g: g,
				isShowSlidePop: false,
				showUrl: '',
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
			},
			onClick_closeBtn(){
				this.isShowSlidePop = false;
			},
			onClick_imgBtn($url){
				this.showUrl = $url;
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
			padding: 30px 0 0 30px;
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
					width: 150px;
					margin-left: 25px;
					span {
						height: 50px;
						line-height: 50px;
					}
					p {
						max-height: 92px;

					}
					.card-wrap {
						width: 130px;
						height: 92px;
						overflow: hidden;
						margin-right: 35px;
						-webkit-border-radius: 4px;
						-moz-border-radius: 4px;
						border-radius: 4px;
						img {
							display: block;
							width: 100%;
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
						padding: 5px 0;
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
					width: 418px;
					padding: 10px 0 10px;
				}
			}
		}
		.diff-padding {
			padding: 0 0 0 30px;
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
			width: 480px;
			height: 360px;
			background: #ffffff;
			-webkit-border-radius: 5px;
			-moz-border-radius: 5px;
			border-radius: 5px;
			img {
				width: 100%;
				display: block;
				height: 100%;
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
