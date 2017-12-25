<template>
	<view-popup @close="onClose_pop"
				:isShowPopView="isShowPopView">
		<div class="add-role-container">
			<p class="mod-tit">{{currId>0?'编辑角色':'设置新角色'}}</p>
			<div class="mod-company-content">
				<div class="company-message no-border">
					<p class="from-group">
						<span class="form-title left">角色名称</span>
						<input-bar class="form-control" placeholder="" type="text"
								   v-model="name"></input-bar>
						<span class="requied">*</span>
					</p>
					<p class="from-group">
						<span class="form-title left">角色说明</span>
					<div class=""></div>
						<textarea type="text" class="form-control role-explain ani-time role-textarea"
								  v-model="desc"></textarea>
					</p>
					<div class="from-group clear">
						<span class="form-title left">平台权限</span>
						<div class="tree-relate left">
							<div class="tree-height">
								<div class="tree-height" is="scroll-group">
									<common-tree :listData="listData" @update="onUpdate_treeMenu" :isShowArrow="true"
												 :checkedList="checkedList"></common-tree>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="role-action-wrap clear">
					<div class="pop-btn right pointer cancel-btn ani-time" @click="onClick_cancelBtn">取消</div>
					<div class="btn-submit pop-btn right pointer action-btn ani-time" @click="onClick_confirmBtn">提交
					</div>
				</div>
			</div>
		</div>
	</view-popup>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import ViewPopup from "../viewPop.vue";
	import InputBar from "../inputBar.vue";
	import CommonTree from "../tree/tree.vue"
	import ScrollGroup from "../../jslib/components/scrollGroup.vue"
	var _params = null;

	export default{
		created()
		{
			this.init();
		},
		data(){
			return {
				g: g,
				name: "",
				desc: [],
				listData: [],
				checkedList: []
			}
		},
		components: {
			ViewPopup,
			InputBar,
			CommonTree,
			ScrollGroup
		},
		props: {
			isShowPopView: {
				type: Boolean,
				default: false
			},
			currId: {
				default: 0
			}
		},
		watch: {
			isShowPopView($val)
			{
				this.init();
			}
		},
		methods: {
			init()
			{
				this.listData = __merge([], g.data.staticRightPool.list);
				if (this.currId)
				{
					var roleData = g.data.searchRolePool.getDataById(this.currId);
					this.name = roleData.name;
					this.desc = roleData.desc;
					this.checkedList = roleData.rights.split(',').map(function (item)
					{
						return int(item);
					});
				}
				else
				{
					this.name = "";
					this.desc = "";
					this.checkedList = [];
				}
			},
			onClose_pop()
			{
				this.$emit('close', false);
			},
			onClick_cancelBtn()
			{
				this.onClose_pop();
			},
			onClick_confirmBtn()
			{
				var postUrl = "permission/addRole";
				_params = {
					roleName: this.name,
					roleDesc: this.desc,
					permissionIds: this.checkedList.join(',')
				};
				if (this.currId != 0)
				{
					_params.roleId = this.currId;
					postUrl = "permission/editRole";
				}
				g.net.call(postUrl, _params).then(($data) =>
				{
					this.init();
					if (this.currId != 0)
					{
						g.data.searchRolePool.getDataById(this.currId).update(_params);
						g.ui.toast("角色编辑成功!")
					}
					this.$emit('close', true);
				}, (err) =>
				{
					g.func.dealErr(err);
				})
			},
			onUpdate_treeMenu($list)
			{
				trace("$list", $list);
				this.checkedList = $list;
			}
		}
	}
</script>
<style lang="sass" rel="stylesheet/scss" type="text/scss" scoped>
	.add-role-container {
		color: #333333;
		.mod-tit {
			line-height: 64px;
			height: 64px;
			padding-left: 25px;
			margin: 0 10px;
			font-size: 15px;
			border-bottom: 1px solid #eaeaea;
		}
		.mod-company-content {
			padding: 20px 10px 45px;
			line-height: 36px;
			font-size: 14px;
		}
	}

</style>
<style lang="sass" rel="stylesheet/scss" type="text/scss">
	@import "../../css/pop.scss";
</style>
