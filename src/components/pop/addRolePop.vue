<template>
	<view-popup @close="onClose_pop"
				:isShowPopView="isShowPopView">
		<div class="add-role-container">
			<p class="mod-tit">设置新角色</p>
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
						<textarea type="text" class="form-control role-explain ani-time" v-model="desc"></textarea>
					</p>
					<div class="from-group clear">
						<span class="form-title left">平台权限</span>
						<div class="tree-relate left">
							<div class="tree-height">
								<div class="tree-height" is="scroll-group">
									<common-tree :listData="listData" @change="onChange_treeMenu" :isShowArrow="true"
												 :checkedList="checkedList"></common-tree>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="role-action-wrap clear">
					<div class="pop-btn right pointer cancel-btn" @click="onClick_cancelBtn">取消</div>
					<div class="btn-submit pop-btn right pointer action-btn" @click="onClick_confirmBtn">提交</div>
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
	import ScrollGroup from "../scrollGroup.vue"
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
				rights: [],
				listData: [
					{
						id: "No1-1",
//						name: "test",
						children: [
							{
								id: "No2-1",
								name: "平台管理",
								children: [
									{
										id: "No3",
										name: "业务设定",
									},
									{
										id: "No4",
										name: "公司设定",
									},
									{
										id: "No5",
										name: "角色管理",
									},
									{
										id: "No6",
										name: "流程设定",
									}
								]
							},
							{
								id: "No2-2",
								name: "人员管理",
								children: [
									{
										id: "No3",
										name: "账号管理",
									}
								]
							},
							{
								id: "No2-3",
								name: "商机管理",
								children: [
									{
										id: "No3",
										name: "商机全局浏览",
									}

								]
							}

						]
					},
				],
				checkedList: ['No2-2']
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
			currId($val)
			{
				this.init();
			}
		},
		methods: {
			init()
			{
				if (this.currId)
				{
					var roleData = g.data.searchRolePool.getDataById(this.currId);
					this.name = roleData.name;
					this.desc = roleData.desc;
					this.rights = roleData.rights;
				}
				else
				{
					this.name = "";
					this.desc = "";
					this.rights = "1,3,5";
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
					permissionIds: this.rights
				};
				if (this.currId != 0)
				{
					_params.roleId = this.currId;
					postUrl = "permission/editRole";
				}
				g.net.call(postUrl, _params).then(($data) =>
				{
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
			onChange_treeMenu($list)
			{
				trace('$list', $list)
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
