<template>
	<ul class="tree-wrap">
		<li v-for="itemData in list">
			<div>
				<span class="pointer" @click="onClick_item(itemData,$event)" v-show="isShowArrow && isValid(itemData)">
					<i class="diff-trangle"
					   :class="currSelectList.indexOf(itemData.id) >= 0 && isValid(itemData)?'rotateRight':''"></i>
				</span>
				<span class="pointer" @click="onClick_icon(itemData)" v-if="showCheckbox">
				<i class="tick-select relative"
				   :class="checkedChildren.indexOf(itemData.id) >= 0?'action':''"></i>
				</span>
				<span class="pointer" @click="onClick_item(itemData,$event)">{{itemData.name}}</span>
			</div>
			<ul v-show="isValid(itemData) && currSelectList.indexOf(itemData.id) >= 0"
				class="padleft relative tree-list">
				<tree-node :data="child" v-for="child in itemData.children" @change="onChange_list"
						   :checkedList="checkedChildren" :isShowArrow="isShowArrow"></tree-node>
			</ul>
		</li>
	</ul>
</template>
<script type="text/ecmascript-6">
	const prefixCls = "c-tree";
	import * as util from '../../js/func';
	import TreeNode from './treeNode.vue';
	import treePool from './treePool';
	export default{
		name: "c-tree",
		created(){
			this.init();
		},
		data(){
			return {
				currSelectList: [],
				list: [],
				checkedChildren: []
			}
		},
		props: {
			listData: {
				type: Array,
				default: function ()
				{
					return []
				}
			},
			checkedList: {
				type: Array,
				default: function ()
				{
					return []
				}
			},
			showCheckbox: {
				type: Boolean,
				default: true
			},
			isShowArrow: {
				type: Boolean,
				default: true
			}
		},
		components: {
			'tree-node': TreeNode
		},
		computed: {
			wrapClass()
			{
				return [
					`${prefixCls}-wrap`
				]
			}
		},
		watch: {},
		methods: {
			init()
			{
				this.list = __merge([], this.listData);
				treePool.removeAll();
				treePool.update(this.list);
				this.checkedChildren = __merge([], this.checkedList);
			},
			onClick_item($item, $event)
			{
				util.insertOneOrZero(this.currSelectList, $item.id);
			},
			onClick_icon($item)
			{
				util.insertOneOrZero(this.checkedChildren, $item.id)
				this.checkedAllChildren($item);
				this.$emit('update', this.checkedChildren);
			},
			onChange_list($idList, $item)
			{
				this.checkedChildren = $idList;
				util.splice(this.checkedChildren, $item.parentId);
				var data = treePool.getDataById($item.parentId);
				for (var item of data.children)
				{
					if (this.checkedChildren.indexOf(item.id) >= 0)
					{
						util.pushIn(this.checkedChildren, data.id);
					}
				}

				this.$emit('update', this.checkedChildren);
			},
			checkedAllChildren($data)
			{
				if (util.typeOf($data['children']) === 'array' && $data['children'].length > 0)
				{
					for (var item of $data['children'])
					{
						if (this.checkedChildren.indexOf($data.id) >= 0)
						{

							util.pushIn(this.checkedChildren, item.id);

						}
						else
						{
							util.splice(this.checkedChildren, item.id)
						}
						this.checkedAllChildren(item);
					}
				}
				;
				this.$forceUpdate();
			},
			isValid(item)
			{
				return Array.isArray(item.children) && item.children.length > 0
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/scss">
	.tree-wrap {
		color: #000000;
		font-size: 14px;
	}

	.flex-col {
		display: flex;
		flex-direction: column;
	}

	.flex-row {
		display: flex;
		flex-direction: row;
	}
</style>
