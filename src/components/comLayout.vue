<template>
	<div class="wrap-page wrap-container clear">
		<div class="header-wrap fixed">
			<com-header></com-header>
			<nav-header @click="onClick_navItem" ref="navHeader"></nav-header>
		</div>
		<div class="wrap-col relative">
			<div class="left-col fixed">
				<div class="scroll-view">
					<p class="nav-menu">{{navItem.desc}}</p>
					<ul class="nav-list">
						<li class="ani-time pointer"
							:class="child.highLightList.indexOf(currPath) >= 0 ?'high-active':'' "
							@click="onClick_childItem(child.path)"
							v-for="child in navItem.children">
							<!--<img :src="g.path.images+'/per1.png'" alt="">-->
							<img :src="child.highLightList.indexOf(currPath)>= 0?
										g.path.images+child.lightIcon:
										g.path.images+child.icon"
								 alt="">
							<span>{{child.name}}</span>
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
	import NavHeader from "./navHeader.vue"
	export default{
		created()
		{
			this.init();
		},
		data(){
			return {
				g: g,
				navItem: {},
				currentId: ""
			}
		},
		props: {
			currId: {},
			currPath:{
				default:"/"
			}
		},
		components: {
			ComHeader,
			NavHeader
		},
		methods: {
			init()
			{
				this.$nextTick(() =>
				{
					this.$refs.navHeader.update(this.currId);
					this.currentId = this.currId;
					this.update(this.currPath);
				});
			},
			update($url)
			{
				this.navItem = g.data.staticNavPool.getDataById(this.currentId);
				g.url = $url || (this.navItem.children && this.navItem.children[0].path);
			},
			onClick_navItem($id)
			{
				this.currentId = $id;
				this.update();
			},
			onClick_childItem($path)
			{
				this.update($path);
			}

		}
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
			z-index: 9;
			background: #fafafa;
			-moz-box-shadow: -1px -0px 10px x rgba(0, 0, 0, 0.1) inset;
			-webkit-box-shadow: -1px 0px 10px rgba(0, 0, 0, 0.1) inset;
			box-shadow: -1px 0px 10px rgba(0, 0, 0, 0.1) inset;
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
