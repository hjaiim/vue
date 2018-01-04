<template>
	<div class="absolute drop-list drop-ref" v-show="isShowDropList">
		<div class="drop-ref" is="ScrollGroup" :autoHide="true">
			<ul>
				<li class="ani-time pointer" v-for="item in dropList" @click.stop="onClick_dropItem(item.id)">
					{{item.name}}
				</li>
			</ul>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import ScrollGroup from "../../src/jslib/components/scrollGroup.vue"
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
		components: {
			ScrollGroup
		},
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
		min-width: 100%;
		border: 1px solid #dddddd;
		border-radius: 4px;
		z-index: 2;
		background: #ffffff;
		-moz-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
		-webkit-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
		li {
			min-height: 40px;
			white-space: nowrap;
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
		overflow-y: hidden;
	}

	.drop-ref {
		max-height: 204px;
		overflow-y: hidden;
	}

</style>
