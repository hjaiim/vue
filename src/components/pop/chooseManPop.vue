<template>
	<transition name="fade">
		<div class="select-wrap center-flex fixed" v-show="isShowViewPop">
			<div class="choose-wrap">
				<p class="pop-tit border-bottom">选择人员</p>
				<div class="man-wrap clear border-bottom">
					<span class="left man-tit">已选人员</span>
					<ul class="man-list left">
						<li v-for="item in staffList">
							<span class="relative">
								{{item.name}}<i class="close-search-btn absolute pointer"
												@click="onClick_delBtn(item.id)"></i></span>
						</li>
					</ul>
				</div>
				<ul class="list-menu border-bottom clear">
					<li class="left">头像</li>
					<li class="left">名字</li>
					<li class="left">所属公司</li>
					<li class="left">所属部门</li>
					<li class="left">职务名称</li>
					<li class="left">状态</li>
				</ul>
				<div class="list-wrap">
					<div class="list-wrap" is="scroll-group">
						<div class="inner-content" v-for="item in manList">
							<p class="deal-staff border-bottom" @click="onClick_arrowBtn(item.id)">{{item.name}}
								<span class="right arrow-wrap center-flex pointer">
									<i :class="checkedList.indexOf(item.id) >= 0?'arrow-bottom':'arrow-top'"></i></span>
							</p>
							<ul class="list-menu border-bottom clear" v-for="childItem in item.children"
								v-show="checkedList.indexOf(item.id) >= 0">
								<li class="left">
									<img :src="g.path.images+childItem.avatar" alt=""></li>
								<li class="left">{{childItem.name}}</li>
								<li class="left">{{childItem.companyName}}</li>
								<li class="left">{{childItem.departmentName}}</li>
								<li class="left">{{childItem.dutyName}}</li>
								<li class="left diff-padding">
								<span @click="onClick_selectBtn(childItem.id)">
								<i class="draw-tick relative" :class="childItem.checked?'action':''"></i>
								<span class="draw-line choose-txt">选择</span></span></li>
							</ul>
						</div>
					</div>
				</div>
				<div class="btn-wrap clear">
					<span class="right pointer cancel-btn  ani-time" @click="onClick_closeBtn(false)">取消</span>
					<span class="right pointer action-btn  ani-time" @click="onClick_closeBtn(true)">确定</span>
				</div>
			</div>
		</div>
	</transition>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import ScrollGroup from "../../components/scrollGroup.vue";
	var _childList = [];
	export default{
		created(){
			this.init();
		},
		data(){
			return {
				g: g,
				checkedList: [],
				manList: [],
				childList: []
			}
		},
		props: {
			isShowViewPop: {
				type: Boolean,
				default: false
			},
			idList: {
				type: Array
			}
		},
		components: {
			ScrollGroup
		},
		computed: {
			staffList()
			{
				var list = [];
				for (var child of this.childList)
				{
					var data = g.data.staffPool.getChildById(child);
					if (list.indexOf(data) < 0)
					{
						list.push(data);
					}
				}
				return list;
			}
		},
		watch: {
			isShowViewPop($val)
			{
				this.init();
			}
		},
		methods: {
			init()
			{
				this.manList = g.data.staffPool.list;
				this.childList = __merge([], this.idList);
				for (var item of this.manList)
				{
					for (var child of item.children)
					{
						if (this.childList.indexOf(child.id) >= 0)
						{
							child.update({checked: true})
						}
						else
						{
							child.update({checked: false})
						}
					}
				}
			},
			onClick_delBtn($id)
			{
				var index = this.childList.indexOf($id);
				this.childList.splice(index, 1);
				var data = g.data.staffPool.getChildById($id);
				data.update({checked: false})
			},
			onClick_selectBtn($id)
			{
				var data = g.data.staffPool.getChildById($id);
				if (data.checked)
				{
					var index = this.childList.indexOf($id);
					this.childList.splice(index, 1);
					data.update({checked: false})
				}
				else
				{
					this.childList.push($id);
					data.update({checked: true})
				}
			},
			onClick_arrowBtn($id)
			{
				var index = this.checkedList.indexOf($id);
				if (index >= 0)
				{
					this.checkedList.splice(index, 1);
				}
				else
				{
					this.checkedList.push($id);

				}
			},
			onClick_closeBtn($type)
			{
				this.$emit('close', $type, this.childList)
			}
		}
	}
</script>
<style lang="sass" rel="stylesheet/scss" type="text/scss" scoped>
	.select-wrap {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 100;
		background: rgba(0, 0, 0, .2);
		-webkit-perspective: 1300px;
		-moz-perspective: 1300px;
		perspective: 1300px;
		cursor: default;
	}

	.choose-wrap {
		width: 78%;
		min-width: 996px;
		padding-bottom: 30px;
		font-size: 15px;
		background: #ffffff;
		-webkit-border-radius: 5px;
		-moz-border-radius: 5px;
		border-radius: 5px;
		color: #666666;
		.pop-tit {
			height: 60px;
			line-height: 60px;
			padding-left: 35px;
			font-size: 15px;
		}
		.man-wrap {
			height: 66px;
			padding-left: 52px;
			.man-tit {
				line-height: 66px;
			}
			.man-list {
				li {
					line-height: 66px;
					height: 66px;
					vertical-align: middle;
					padding-left: 30px;
					span {
						padding: 6px;
					}
				}
			}
		}
		.list-menu {
			li {
				height: 48px;
				line-height: 48px;
				width: 16%;
				padding: 0 10px;
				-webkit-box-sizing: border-box;
				-moz-box-sizing: border-box;
				box-sizing: border-box;
				vertical-align: middle;
				&:nth-child(1) {
					padding-left: 52px;
				}
				&:last-child {
					padding-left: 40px;
				}
				&.diff-padding {
					padding-left: 10px;
				}
				img {
					display: inline-block;
					vertical-align: middle;
					margin-bottom: 4px;
					width: 28px;
					height: 28px;
					overflow: hidden;
					-webkit-border-radius: 50%;
					-moz-border-radius: 50%;
					border-radius: 50%;
				}
				&:after {
					content: "";
					display: inline-block;
					vertical-align: middle;
					width: 0;
					height: 100%;
				}
				.choose-txt {
					margin-left: 12px;
				}

			}
		}
		.list-wrap {
			max-height: 350px;

			overflow: hidden;
		}
		.deal-staff {
			height: 56px;
			line-height: 56px;
			border-left: 4px solid #ed5564;
			padding-left: 48px;
			background: #f7fbfc;
			color: #000000;
			.arrow-wrap {
				width: 65px;
				height: 56px;
				border-left: 1px solid #efefef;

			}

		}
		.btn-wrap {
			padding-top: 65px;
			margin-right: 35px;
			span {
				width: 88px;
				height: 36px;
				margin-left: 25px;
				line-height: 36px;
				text-align: center;
			}
			.action-btn {
				color: #ffffff;
			}
		}
	}

	.border-bottom {
		border-bottom: 1px solid #efefef;
	}

	.close-search-btn {
		width: 12px;
		height: 12px;
		right: -12px;
		top: 4px;
		padding: 4px;
		margin-top: -10px;
		background: transparent;
		-moz-border-radius: 50%;
		-webkit-border-radius: 50%;
		border-radius: 50%;
		-moz-transition: ease-in-out 100ms;
		-o-transition: ease-in-out 100ms;
		-webkit-transition: ease-in-out 100ms;
		transition: ease-in-out 100ms;
		&:before {
			left: 50%;
			top: 50%;
			margin-left: -7px;
			margin-top: -1px;
			width: 14px;
			height: 2px;
			background-color: #9d9d9d;
			content: "";
			position: absolute;
			-moz-transform: rotate(45deg);
			-ms-transform: rotate(45deg);
			-webkit-transform: rotate(45deg);
			transform: rotate(45deg);
		}
		&:after {
			width: 14px;
			height: 2px;
			background-color: #9d9d9d;
			content: "";
			left: 50%;
			top: 50%;
			margin-left: -7px;
			margin-top: -1px;
			position: absolute;
			-moz-transform: rotate(-45deg);
			-ms-transform: rotate(-45deg);
			-webkit-transform: rotate(-45deg);
			transform: rotate(-45deg);
		}
		&:hover {
			-moz-transform: scale(0.9);
			-ms-transform: scale(0.9);
			-webkit-transform: scale(0.9);
			transform: scale(0.9);
		}
		&:active {
			-moz-transition: ease-in-out 200ms;
			-o-transition: ease-in-out 200ms;
			-webkit-transition: ease-in-out 200ms;
			transition: ease-in-out 200ms;
			-moz-transform: scale(1.6);
			-ms-transform: scale(1.6);
			-webkit-transform: scale(1.6);
			transform: scale(1.6);
			opacity: 0;
		}
	}

</style>
