<template>
	<li>
		<div>
			<span class="pointer" @click="onClick_item(itemData,$event)" v-show="isValid(itemData) && isShowArrow">
			<i class="diff-trangle"
			   :class="currIdList.indexOf(itemData.id) >= 0 && isValid(itemData)?'rotateRight':''"></i>
			</span>
			<span class="pointer" @click="onClick_icon(itemData)">
				<i class="tick-select relative"
				   :class="checkedChildren.indexOf(itemData.id) >= 0?'action':''"></i>
			</span>
			<span class="pointer" @click="onClick_item(itemData,$event)">{{itemData.name}}</span>
		</div>
		<ul v-show="isValid(itemData) && currIdList.indexOf(itemData.id) >= 0" class="padleft relative tree-diff">
			<tree-node :data="child" v-for="child in itemData.children"
					   :checkedList="checkedChildren" @change="onChange_list"></tree-node>
		</ul>
	</li>

</template>
<script type="text/ecmascript-6">
	const prefixCls = "tree-node";
	import * as util from '../../js/func';
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
			isShowArrow: {
				type: Boolean,
				default: true
			}
		},
		watch: {
			checkedList()
			{
				this.init();
			},
			data()
			{
				this.init();
			}
		},
		methods: {
			init()
			{
				this.itemData = __merge({}, this.data);
				this.checkedChildren = __merge([], this.checkedList);
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
				this.$emit('change', this.checkedChildren, this.itemData);
				this.$forceUpdate();
			},
			onChange_list($idList)
			{

				util.splice(this.checkedChildren, this.tmpItem.id);
				for (var item of this.tmpItem.children)
				{
					if (this.checkedChildren.indexOf(item.id) >= 0)
					{
						util.pushIn(this.checkedChildren, this.tmpItem.id);
					}
				}
				this.$emit('change', this.checkedChildren, this.itemData);
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
<style type="text/css" lang="sass" rel="stylesheet/scss">
	.padleft {
		/*padding-left: 25px;*/
	}

	.tree-list {
		top: -7px;
		left: 47px;
	}

	.tree-diff {
		top: 0px;
		left: 25px;
	}

	.diff-trangle {
		display: inline-block;
		border-left: 10px solid #666666;
		border-bottom: 5px solid transparent;
		border-top: 5px solid transparent;
		-webkit-transition: transform .2s;
		-moz-transition: transform .2s;
		-ms-transition: transform .2s;
		-o-transition: transform .2s;
		transition: transform .2s;
	}

	.rotateRight {
		-webkit-transform: rotate(90deg);
		-moz-transform: rotate(90deg);
		-ms-transform: rotate(90deg);
		-o-transform: rotate(90deg);
		transform: rotate(90deg);
	}

	.tick-select {
		display: inline-block;
		width: 14px;
		height: 14px;
		vertical-align: middle;
		margin: 0 15px 0 0;
		&:after, &:before {
			content: '';
			display: inline-block;
			width: 14px;
			height: 14px;
			left: 0;
			position: absolute;
			bottom: 0;
			text-align: center;
			-webkit-border-radius: 3px;
			-moz-border-radius: 3px;
			border-radius: 3px;
		}
		&:before {
			border: 1px solid #cccccc;
			background-color: #ffffff;
			-moz-transition: all 0.3s ease-in-out;
			-o-transition: all 0.3s ease-in-out;
			-webkit-transition: all 0.3s ease-in-out;
			transition: all 0.3s ease-in-out;
		}
		&:after {
			color: #ffffff;
			content: "\2713";
			line-height: 14px;
			font-size: 14px;
		}

		&:hover {
			&:after {
				color: #c7c7c7;
			}

		}
		&.action {
			&:before {
				border: 1px solid #2c85d3;
				-moz-box-shadow: inset 0 0 0 7px #2c85d3;
				-webkit-box-shadow: inset 0 0 0 7px #2c85d3;
				box-shadow: inset 0 0 0 7px #2c85d3;
			}
			&:after {
				color: #ffffff;
			}

		}
	}

</style>
