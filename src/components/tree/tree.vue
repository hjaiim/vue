<template>
	<ul >
		<li v-for="itemData in list">
			<div>
				<span @click="onClick_item(itemData,$event)" v-show="isShowArrow && isValid(itemData)">
				<!--<c-icon-->
						<!--:type="currIdList.indexOf(itemData.id) >= 0 && isValid(itemData)?'bottom-arrow':'right-arrow'"/>-->
				</span>
				<span @click="onClick_icon(itemData)" v-if="showCheckbox">
				<!--<c-icon :type="checkedChildren.indexOf(itemData.id) >= 0?'square-checked':'square-check'"/>-->
				</span>
				<span @click="onClick_item(itemData,$event)">{{itemData.name}}</span>
			</div>
			<ul v-show="isValid(itemData) && currIdList.indexOf(itemData.id) >= 0" class="padleft">
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
	export default{
		name: "c-tree",
		created(){
			this.init();
		},
		data(){
			return {
				currIdList: [],
				list: this.listData,
				tmpItem: {},
				checkedChildren: this.checkedList
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
		watch:{
			listData($val)
			{
				this.init();
			},
			checkedList($val)
			{
				this.init();
			}
		},
		methods: {
			init()
			{
				this.list = __merge({},this.listData);
				this.checkedChildren = __merge({},this.checkedList);
				for (var item of this.list)
				{
					this.checkedAllChildren(item)
				}
			},
			onClick_item($item, $event)
			{
				util.insertOneOrZero(this.currIdList, $item.id);
				this.tmpItem = $item;
			},
			onClick_icon($item)
			{
				this.tmpItem = $item;
				util.insertOneOrZero(this.checkedChildren, $item.id)
				this.checkedAllChildren($item);
				this.$emit('change', this.checkedChildren);
			},
			onChange_list($idList)
			{
				this.checkedChildren = $idList;
				util.splice(this.checkedChildren, this.tmpItem.id);
				if ($idList.length > 0)
				{
					util.pushIn(this.checkedChildren, this.tmpItem.id);
				}
				this.$emit('change', this.checkedChildren);
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
			},
			isValid(item)
			{
				return Array.isArray(item.children) && item.children.length > 0
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">
	.padleft {
		padding-left: 40px;
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
