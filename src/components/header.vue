<template>
	<div class="header-top clear">
		<p class="site-name left">联通业务生命周期平台</p>
		<div class="navBar-right right">
			<ul>
				<li class="nav-item pointer" @click="onClick_msgCenter">
					<span class="note-txt diff-padding">通知</span>
					<span class="note-icon relative">
						<img :src="g.path.images+'/note-icon.png'" alt="">
						<i class="badeg absolute">{{userInfo.msgCount}}</i>
					</span>
				</li>
				<li class="nav-item pointer" @click="onClick_perCenter">
					<span class="note-txt">{{userInfo.username}}</span>
					<span class="avatar-icon">
						<img
								:src="userInfo.avatar?g.param.ossUrl+userInfo.avatar:g.path.images+'/default.png'"
								alt="">
					</span>
				</li>
				<li class="nav-item pointer" @click="onClick_logoutBtn">
					<span class="note-txt ">退出</span>
				</li>
			</ul>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import g from "../global";
	import loginManager from './../js/manager/LoginManager';
	export default{
		created()
		{
			g.func.updateUserInfo();
			this.init();
		},
		data(){
			return {
				g: g,
				userInfo: {}
			}
		},
		components: {},
		methods: {
			init()
			{
				this.userInfo = g.data.userInfo;
				this.$forceUpdate();
			},
			onClick_logoutBtn()
			{
				loginManager.logout();
			},
			onClick_msgCenter()
			{
				g.url = "/message";
			},
			onClick_perCenter()
			{
				g.url = "/";
			}
		}
	}
</script>
<style lang="sass" rel="stylesheet/scss" type="text/scss">
	.header-top {
		background: #ed5564;
		height: 64px;
		.site-name {
			height: 64px;
			line-height: 64px;
			font-size: 20px;
			color: #ffffff;
			letter-spacing: 1px;
			padding-left: 35px;
		}
		.navBar-right {
			ul {
				height: 64px;
				display: -webkit-flex;
				display: -moz-box;
				display: -ms-flexbox;
				display: -webkit-box;
				display: flex;
				-webkit-box-align: center;
				-moz-box-align: center;
				-ms-flex-align: center;
				-webkit-align-items: center;
				align-items: center;
				-webkit-box-pack: center;
				-moz-box-pack: center;
				-ms-flex-pack: center;
				.nav-item {
					padding: 0 24px;
					height: 28px;
					border-right: 1px dashed #ffffff;
					display: table;
					/*-ms-flex-pack: center;*/
					/*display: -webkit-flex;*/
					/*display: -moz-box;*/
					/*display: -ms-flexbox;*/
					/*display: -webkit-box;*/
					/*display: flex;*/
					/*-webkit-box-align: center;*/
					/*-moz-box-align: center;*/
					/*-ms-flex-align: center;*/
					/*-webkit-align-items: center;*/
					/*align-items: center;*/
					/*-webkit-box-pack: center;*/
					/*-moz-box-pack: center;*/
					/*-ms-flex-pack: center;*/

					&:last-child {
						border: none;
					}
					span {
						display: table-cell;
						vertical-align: middle;
						text-align: center;
					}
					.note-txt {
						color: #ffffff;
						padding-right: 14px;
						font-size: 14px;
					}
					.diff-padding {
						padding-right: 0;
					}
					.note-icon {
						padding: 0 19px 0 12px;
						img {
							display: block;
							height: 14px;
						}
						.badeg {
							top: -3px;
							right: 13px;
							width: 16px;
							padding: 3px 0;
							height: 10px;
							line-height: 10px;
							-webkit-border-radius: 50%;
							-moz-border-radius: 50%;
							border-radius: 50%;
							background: #ffffff;
							color: #ff635c;
							font-size: 9px;
							text-align: center;
						}
					}
					.avatar-icon {
						width: 28px;
						height: 28px;
						background: #ffffff;
						-webkit-border-radius: 50%;
						-moz-border-radius: 50%;
						border-radius: 50%;
						overflow: hidden;
						img {
							display: block;
							width: 28px;
							height: 28px;
						}
					}
				}
			}

		}

	}
</style>
