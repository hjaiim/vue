<template>
	<ul class="absolute drop-list" v-show="isShowDropList">
		<li class="pointer ani-time" v-for="item in dropList" @click.stop="onClick_dropItem(item.id)">{{item.name}}</li>
	</ul>
</template>
<script type="text/ecmascript-6">
	export default{
		data(){
			return {}
		},
		props: {
			isShowDropList: {
				type: Boolean,
				default: false
			},
			dropList: {
				type: Array
			}
		},
		components: {},
		methods: {
			onClick_dropItem($id)
			{
				this.$emit('change', $id);
			}
		}
	}
</script>
<style lang="sass" rel="stylesheet/scss" type="text/scss" scoped>
	.drop-list {
		top: 100%;
		left: -1px;
		width: 100%;
		border: 1px solid #dddddd;
		border-radius: 4px;
		z-index: 2;
		background: #ffffff;
		-moz-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
		-webkit-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
		li {
			height: 40px;
			line-height: 40px;
			padding: 0 12px;
			border-bottom: 1px solid #dddddd;
			&:last-child {
				border-bottom: none;
			}
			&:hover {
				background: #f8f8f8;
			}
		}
	}

	.order-workList {
		max-height: 123px;
		overflow: auto;
	}

</style>
