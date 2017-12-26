<template>
	<com-layout currPath="/roleman">
		<div class="plat-wrap">
			<div class="action-wrap clear">
				<span class="add-btn action-btn ani-time left pointer" @click="onClick_addRoleBtn">
					<i class="cross-txt relative"></i>
					<span>新角色</span>
				</span>
			</div>
			<div class="table-content role-table">
				<table class="inner-table" ref="roleCon">
					<thead>
					<tr>
						<th><span class="rank-num">序号</span></th>
						<th>角色名称</th>
						<th>说明</th>
						<th>设定人</th>
						<th>已分配</th>
						<th><p class="action-menu">操作</p></th>
					</tr>
					</thead>
					<tbody>
					<tr v-for="(item,index) in roleList">
						<td><span class="rank-num">{{index+1}}</span></td>
						<!--:class="[index==2?'is-picked':'', index==5?'wait-pick':'']"-->
						<td><span>{{item.name}}</span></td>
						<td><p class="role-desc" :style="{width:tdWidth*0.3+'px'}">{{item.desc}}</p></td>
						<td>{{item.setter}}</td>
						<td>{{item.distribute}}</td>
						<td>
							<p class="action-menu clear">
								<span class="left pointer draw-line ani-time" @click="onClick_detailBtn(item.id)">编辑
								</span>
								<span class="right pointer draw-line ani-time" @click="onClick_deleteBtn(item.id)">删除
									<delete-pop :isDeletePop="item.isShow"
												@close="onClose_deletePop">
										<i>您是否真的要删除该角色？</i>
									</delete-pop>
							</span>
							</p>
						</td>
					</tr>
					</tbody>
				</table>
				<div class="show-page clear" v-if="g.data.searchRolePool.totalPage > 1">
					<common-page class="right" :total="g.data.searchRolePool.total" :currPage="currPage"
								 :showTotalCount="true"
								 :showElevator="true" :showFirstAndEnd="true"
								 @change="onChange_pageCom"></common-page>
				</div>
			</div>
		</div>
		<add-role-pop :isShowPopView="isShowRolePop" :currId="currId" @close="onClose_rolePop"></add-role-pop>
	</com-layout>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import ComLayout from "../../components/comLayout.vue";
	import CommonPage from "../../components/page.vue";
	import DeletePop from "../../components/pop/deletePop.vue";
	import AddRolePop from "../../components/pop/addRolePop.vue";
	import {searchRoleList} from "./roleMan";
	var _params = null;
	var _delId = 0;
	export default{
		created(){
			this.routerUpdated();
		},
		data(){
			return {
				g: g,
				roleList: [],
				currId: 0,
				isShowRolePop: false,
				tdWidth: 0
			}
		},
		components: {
			ComLayout,
			CommonPage,
			DeletePop,
			AddRolePop

		},
		watch: {
			roleList($val)
			{
				if ($val.length == 0)
				{
					this.updateUrl();
				}
			}
		},
		methods: {
			routerUpdated()
			{
				this.roleList = g.data.searchRolePool.list;
				this.$nextTick(() =>
				{
					this.tdWidth = this.$refs['roleCon'].clientWidth;
				})
			},
			onClick_addRoleBtn()
			{
				this.currId = 0;
				this.isShowRolePop = true;
			},
			onClick_detailBtn($id)
			{
				this.currId = $id;
				this.isShowRolePop = true;
			},
			onClick_deleteBtn($id)
			{
				_delId = $id;
				g.data.searchRolePool.getDataById(_delId).update({isShow: true});
			},
			onClose_deletePop($result)
			{
				g.data.searchRolePool.getDataById(_delId).update({isShow: false});
				if ($result)
				{
					_params = {roleId: _delId};
					g.ui.showLoading()
					g.net.call("permission/delRole", _params).then(($data) =>
					{
						g.ui.hideLoading();
						g.data.searchRolePool.remove(_delId);
						g.ui.toast("角色删除成功!")
					}, (err) =>
					{
						g.func.dealErr(err);
					})
				}
			},
			onClose_rolePop($result)
			{
				this.isShowRolePop = false;
				if ($result)
				{
					_params = {
						page: 1,
						pageSize: 10
					};
					searchRoleList(_params).then(() =>
					{
						this.routerUpdated();
					})
				}
			},
			onChange_pageCom($page)
			{
				this.currPage = $page;
				this.updateUrl();
			},
			updateUrl()
			{
				g.url = {
					path: "/roleman",
					query: {
						page: this.currPage
					}
				}
			}

		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css" scoped>
	@import "../../css/mixin.scss";
	@import "../../css/platManage.scss";
</style>