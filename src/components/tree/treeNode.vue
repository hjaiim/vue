<template>
	<li>
		<div>
			<span @click="onClick_item(itemData,$event)" v-show="isValid(itemData) && isShowArrow">
				<!--<c-icon :type="currIdList.indexOf(itemData.id) >= 0 && isValid(itemData)?'bottom-arrow':'right-arrow'" />-->
			</span>
			<span @click="onClick_icon(itemData)">
				<!--<c-icon :type="checkedChildren.indexOf(itemData.id) >= 0?'square-checked':'square-check'" />-->
			</span>
			<span @click="onClick_item(itemData,$event)">{{itemData.name}}</span>
		</div>
		<ul v-show="isValid(itemData) && currIdList.indexOf(itemData.id) >= 0" class="padleft">
			<tree-node :data="child" v-for="child in itemData.children"
					   :checkedList="checkedChildren" @change="onChange_list"></tree-node>
		</ul>
	</li>

</template>
<script type="text/ecmascript-6">
	const prefixCls = "tree-node";
	import * as util from '../../global';
	export default{
		name: "tree-node",
		created(){
			this.init();
		},
		data(){
			return {
				currIdList: [],
				itemData: this.data,
				checkedChildren: []
			}
		},
		props: {
			data: {
				type: Object,
				default: function ()
				{
					return {}
				}
			},
			checkedList: {
				type: Array,
				default: function ()
				{
					return []
				}
			},
			vertical: {
				type: Boolean
			},
			isShowArrow: {
				type: Boolean,
				default: true
			}
		},
		watch: {},
		methods: {
			init()
			{
				this.itemData = __merge({}, this.data);
				this.checkedChildren = __merge({}, this.checkedList);
				this.checkedAllChildren(this.itemData);
			},
			onClick_item($item, $event)
			{
				util.insertOneOrZero(this.currIdList, $item.id);
			},
			onClick_icon($item)
			{
				util.insertOneOrZero(this.checkedChildren, $item.id)
				this.checkedAllChildren($item);
				this.$emit('change', this.checkedChildren);
				this.$forceUpdate();
			},
			onChange_list($idList)
			{
				this.checkedChildren = $idList;
				util.splice(this.checkedChildren, this.itemData.id);
				if ($idList.length > 0)
				{
					util.pushIn(this.checkedChildren, this.itemData.id);
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
</style>
