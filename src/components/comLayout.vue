<template>
	<div class="wrap-page wrap-container clear">
		<div class="header-wrap fixed">
			<com-header></com-header>
			<ul class="header-options clear">
				<li class="left relative pointer ani-time high-active">个人中心</li>
				<li class="left relative pointer ani-time">平台管理</li>
				<li class="left relative pointer ani-time">人员管理</li>
				<li class="left relative pointer ani-time">商机管理</li>
			</ul>
		</div>
		<div class="wrap-col relative">
			<div class="left-col absolute">
				<div class="scroll-view">
					<p class="nav-menu">个人中心内容</p>
					<ul class="nav-list">
						<li class="ani-time pointer high-active">
							<!--<img :src="g.path.images+'/per1.png'" alt="">-->
							<img :src="g.path.images+'/per1-active.png'" alt="">
							<span>个人信息</span>
						</li>
						<li class="ani-time pointer">
							<img :src="g.path.images+'/per2.png'" alt="">
							<span>账户认证</span>
						</li>
						<li class="ani-time pointer high-active">
							<img :src="g.path.images+'/per3-active.png'" alt="">
							<span>消息中心</span>
						</li>
					</ul>
				</div>
			</div>
			<div class="right-col">
				<slot></slot>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import g from "../global";
	import ComHeader from "./header.vue"
	export default{
		data(){
			return {
				g: g
			}
		},
		components: {
			ComHeader,
		},
		methods: {}
	}
</script>
<style lang="sass" rel="stylesheet/scss" type="text/scss">
	.wrap-container {
		width: 100%;
		padding: 0;
		color: #000000;
		.header-wrap {
			top: 0;
			left: 0;
			width: 100%;
			z-index: 10;
			.header-options {
				height: 60px;
				background: #333744;
				li {
					margin: 0 0 0 44px;
					font-size: 16px;
					color: #999999;
					border-bottom: 2px solid transparent;
					height: 58px;
					line-height: 58px;
					&:after {
						width: 0;
						content: "";
						bottom: -2px;
						z-index: 99;
						position: absolute;
						left: 0;
						height: 2px;
						background: #ed5564;
						-webkit-transition: all .3s;
						-moz-transition: all .3s;
						-ms-transition: all .3s;
						-o-transition: all .3s;
						transition: all .3s;
					}
					&:hover {
						color: #ffffff;
						&:after {
							width: 100%;
						}
					}
					&:last-child {
						margin: 0 44px;
					}
				}
				.high-active {
					color: #ffffff;
					border-bottom: 2px solid #e95462;
					&:hover {
						color: #ffffff;
						&:after {
							width: 0;
						}
					}
				}
			}

		}
		.left-col {
			min-height: 100%;
			width: 200px;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			box-sizing: border-box;
			padding: 124px 0 0 0;
			display: -ms-flexbox;
			display: flex;
			left: 0;
			top: 0;
			z-index: 1;
			background: #fafafa;
			-moz-box-shadow: -1px -0px 10px x rgba(0, 0, 0, 0.1) inset;
			-webkit-box-shadow: -1px 0px 10px  rgba(0, 0, 0, 0.1) inset;
			box-shadow: -1px 0px 10px  rgba(0, 0, 0, 0.1) inset;
			.scroll-view {
				width: 200px;
				.nav-menu {
					text-align: center;
					height: 46px;
					line-height: 46px;
					color: #333333;
					font-size: 14px;
				}
				.nav-list {
					li {
						height: 46px;
						line-height: 46px;
						vertical-align: middle;
						text-align: center;
						img {
							display: inline-block;
							vertical-align: middle;
						}
						span {
							display: inline-block;
							height: 46px;
							line-height: 46px;
							vertical-align: middle;
							font-size: 14px;
							color: #656565;
							padding: 0 24px;
						}
						&:hover {
							background: #e0e0e0;
						}
						&.high-active {
							background: #ed5564;
							span {
								color: #ffffff;
							}
						}
					}

				}
			}
		}
		.wrap-col {
			background: #ffffff;
			min-height: 100%;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			box-sizing: border-box;
			padding: 124px 0 0 200px;
		}
		.right-col {
			min-height: 100%;
		}

	}
</style>
