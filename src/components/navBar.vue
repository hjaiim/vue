<template>
	<div class="sj-navbar">
		<ul>
			<li class="nav-list" v-for="navItem in navList">
				<a href="#" class="total-item relative" :class="idList.indexOf(navItem.id) >= 0?'open':''"
				   @click="onClick_navItem(navItem)">First MENu
					<i @click="onClick_navItem(navItem)" class="icon-arrow absolute"
					   :class="idList.indexOf(navItem.id) >= 0?'open':'close'"></i>
				</a>
				<ul class="drop-menu" :class="idList.indexOf(navItem.id) >= 0?'show':'hide'">
					<li v-for="item in 3">
						<a href="#" class="ani-time">HOME</a>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</template>
<script type="text/ecmascript-6">
	import g from  "../global";
	export default{
		data(){
			return {
				g: g,
				idList: [],
				navList: [
					{
						id: 'name1',
					},
					{
						id: 'name2',
					},
					{
						id: 'name3',
					}
				]
			}
		},
		components: {},
		methods: {
			onClick_navItem($navItem){
				if (this.idList.indexOf($navItem.id) >= 0)
				{
					this.idList.splice($navItem.id, 1);
				}
				else
				{
					this.idList.push($navItem.id);
				}
			}
		}
	}
</script>
<style lang="sass" rel="stylesheet/scss" type="text/scss">
	.sj-navbar {
		.nav-list {
			.total-item {
				display: block;
				padding: 13px 15px 12px;
				font-weight: 500;
				color: #e7e7e7;
				&.open {
					text-shadow: rgba(0, 0, 0, .25) 0 -1px 0;
					background: linear-gradient(#334556, #2c4257), #2a3f54;
					box-shadow: rgba(0, 0, 0, .25) 0 1px 0, inset rgba(255, 255, 255, .16) 0 1px 0;
				}
				.icon-arrow {
					display: block;
					font-size: 0.7em;
					color: #ffffff;
					top: 14px;
					right: 10px;
					&:before {
						content: '\25BC';
					}
					.close {
						-moz-transform: rotate(0deg);
						-ms-transform: rotate(0deg);
						-o-transform: rotate(0deg);
						-webkit-transform: rotate(0deg);
						transform: rotate(0deg);
						-moz-transition: -moz-transform 0.4s;
						-o-transition: -o-transform 0.4s;
						-webkit-transition: -webkit-transform 0.4s;
						transition: transform 0.4s;
					}
					.open {
						-moz-transform: rotate(-180deg);
						-ms-transform: rotate(-180deg);
						-o-transform: rotate(-180deg);
						-webkit-transform: rotate(-180deg);
						transform: rotate(-180deg);
						-moz-transition: -moz-transform 0.4s;
						-o-transition: -o-transform 0.4s;
						-webkit-transition: -webkit-transform 0.4s;
						transition: transform 0.4s;
					}

				}
			}
			.drop-menu {
				max-height: 0;
				overflow: hidden;
				list-style: none;
				padding: 0;
				margin: 0;
				&.show, &.hide {
					-moz-transform-origin: 50% 0%;
					-ms-transform-origin: 50% 0%;
					-o-transform-origin: 50% 0%;
					-webkit-transform-origin: 50% 0%;
					transform-origin: 50% 0%;
				}
				&.show {
					display: block;
					max-height: 9999px;
					-moz-transform: scaleY(1);
					-ms-transform: scaleY(1);
					-o-transform: scaleY(1);
					-webkit-transform: scaleY(1);
					transform: scaleY(1);
					animation: showAnimation 0.4s ease-in-out;
					-moz-animation: showAnimation 0.4s ease-in-out;
					-webkit-animation: showAnimation 0.4s ease-in-out;
					-moz-transition: max-height .4s ease-in-out;
					-o-transition: max-height .4s ease-in-out;
					-webkit-transition: max-height .4s ease-in-out;
					transition: max-height .4s ease-in-out;
				}
				&.hide {
					max-height: 0;
					-moz-transform: scaleY(0);
					-ms-transform: scaleY(0);
					-o-transform: scaleY(0);
					-webkit-transform: scaleY(0);
					transform: scaleY(0);
					animation: hideAnimation 0.4s ease-out;
					-moz-animation: hideAnimation 0.4s ease-out;
					-webkit-animation: hideAnimation 0.4s ease-out;
					-moz-transition: max-height 0.4s ease-out;
					-o-transition: max-height 0.4s ease-out;
					-webkit-transition: max-height 0.4s ease-out;
					transition: max-height 0.4s ease-out;
				}
				li {
					a {
						display: block;
						padding: 10px 10px;
						color: #6e6e6e;
						font-weight: 500;
						background-color: #eeeeee;
						-moz-box-shadow: 0 1px 0 white inset, 0 -1px 0 #d4d4d4 inset;
						-webkit-box-shadow: 0 1px 0 white inset, 0 -1px 0 #d4d4d4 inset;
						box-shadow: 0 1px 0 white inset, 0 -1px 0 #d4d4d4 inset;
						text-shadow: 0 -1px 0 rgba(255, 255, 255, 0.3);
						&:hover {
							background: #f6f6f6;
						}
					}

				}
			}
		}
	}

	@keyframes hideAnimation {
		0% {
			-moz-transform: scaleY(1);
			-ms-transform: scaleY(1);
			-o-transform: scaleY(1);
			-webkit-transform: scaleY(1);
			transform: scaleY(1);
		}
		60% {
			-moz-transform: scaleY(0.98);
			-ms-transform: scaleY(0.98);
			-o-transform: scaleY(0.98);
			-webkit-transform: scaleY(0.98);
			transform: scaleY(0.98);
		}
		80% {
			-moz-transform: scaleY(1.02);
			-ms-transform: scaleY(1.02);
			-o-transform: scaleY(1.02);
			-webkit-transform: scaleY(1.02);
			transform: scaleY(1.02);
		}
		100% {
			-moz-transform: scaleY(0);
			-ms-transform: scaleY(0);
			-o-transform: scaleY(0);
			-webkit-transform: scaleY(0);
			transform: scaleY(0);
		}
	}

	@keyframes showAnimation {
		0% {
			-moz-transform: scaleY(0.1);
			-ms-transform: scaleY(0.1);
			-o-transform: scaleY(0.1);
			-webkit-transform: scaleY(0.1);
			transform: scaleY(0.1);
		}
		40% {
			-moz-transform: scaleY(1.04);
			-ms-transform: scaleY(1.04);
			-o-transform: scaleY(1.04);
			-webkit-transform: scaleY(1.04);
			transform: scaleY(1.04);
		}
		60% {
			-moz-transform: scaleY(0.98);
			-ms-transform: scaleY(0.98);
			-o-transform: scaleY(0.98);
			-webkit-transform: scaleY(0.98);
			transform: scaleY(0.98);
		}
		80% {
			-moz-transform: scaleY(1.04);
			-ms-transform: scaleY(1.04);
			-o-transform: scaleY(1.04);
			-webkit-transform: scaleY(1.04);
			transform: scaleY(1.04);
		}
		100% {
			-moz-transform: scaleY(0.98);
			-ms-transform: scaleY(0.98);
			-o-transform: scaleY(0.98);
			-webkit-transform: scaleY(0.98);
			transform: scaleY(0.98);
		}
		80% {
			-moz-transform: scaleY(1.02);
			-ms-transform: scaleY(1.02);
			-o-transform: scaleY(1.02);
			-webkit-transform: scaleY(1.02);
			transform: scaleY(1.02);
		}
		100% {
			-moz-transform: scaleY(1);
			-ms-transform: scaleY(1);
			-o-transform: scaleY(1);
			-webkit-transform: scaleY(1);
			transform: scaleY(1);
		}
	}
</style>
