<template>
	<div class="header-top clear">
		<p class="site-name left">联通业务生命同期平台</p>
		<div class="navBar-right right">
			<ul>
				<li class="nav-item">
					<a href="#" class="note-txt">通知</a>
					<i class="note-icon relative">
						<img :src="g.path.images+'/note-icon.png'" alt="">
						<span class="badeg absolute">2</span>
					</i>
				</li>
				<li class="nav-item">
					<a href="#" class="note-txt">统一食品</a>
					<i class="avatar-icon">
						<img :src="g.path.images+'/avatar-icon.png'" alt="">
					</i>
				</li>
				<li class="nav-item">
					<p class="note-txt pointer" @click="onClick_logoutBtn">退出</p>
				</li>
			</ul>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import g from "../global";
	import loginManager from './../js/manager/LoginManager';
	export default{
		data(){
			return {
				g: g
			}
		},
		components: {},
		methods: {
			onClick_logoutBtn()
			{
				loginManager.logout();
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
					-ms-flex-pack: center;
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
					&:last-child {
						border: none;
					}
					.note-txt {
						color: #ffffff;
						font-size: 14px;
					}
					.note-icon {
						padding: 0 19px 0 12px;
						img {
							display: block;
							height: 14px;
						}
						.badeg {
							bottom: 11px;
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
						margin-left: 14px;
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
						}
					}
				}
			}

		}

	}
</style>
