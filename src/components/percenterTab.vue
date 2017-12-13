<template>
	<ul class="per-menu clear">
		<li class="left ani-time relative pointer" :class="type=='personal'?'high-active':''"
			@click="onClick_navItem('personal')">
			个人信息
		</li>
		<li class="left ani-time relative pointer" :class="type=='modpwd'?'high-active':''"
			@click="onClick_navItem('modpwd')">修改密码
		</li>
	</ul>
</template>
<script type="text/ecmascript-6">
	import g from "../global";
	export default{
		created(){
			this.init();
		},
		data(){
			return {
				g: g,
			}
		},
		props: {
			type: {}
		},
		methods: {
			init()
			{
			},
			onClick_navItem($id)
			{
				this.$emit("click", $id);
			}
		}
	}
</script>
<style type="text/scss" lang="sass" rel="stylesheet/scss">
	.per-menu {
		li {
			height: 60px;
			line-height: 60px;
			margin-right: 50px;
			font-size: 16px;
			color: #7a7a7a;
			&:after {
				width: 0;
				content: "";
				bottom: -1px;
				z-index: 2;
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
				color: #000000;
				&:after {
					width: 100%;
				}
			}
			&.high-active {
				color: #000000;
				&:after {
					width: 100%;
				}
			}
		}
	}

</style>