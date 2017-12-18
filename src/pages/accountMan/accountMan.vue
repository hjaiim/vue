<template>
	<com-layout currPath="/accountman">
		<div class="staff-wrap">
			<div class="status-wrap clear">
				<span class="total-nums left">岗位类别</span>
				<div class="action-box left" @click="onClick_positionType(0)">
					<i class="pointer"></i>
					<span>未分配</span>
				</div>
				<div class="action-box left" @click="onClick_positionType(1)">
					<i class="pointer action"></i>
					<span>提交员</span>
				</div>
				<div class="action-box left" @click="onClick_positionType(2)">
					<i class="pointer action"></i>
					<span>审核员</span>
				</div>
				<div class="verify-btn total-btn right pointer" @click="onClick_unVerifyBtn">待认证>></div>
				<div class="option-wrap left ani-time">
					<div class="staff-option left clear">
						<span class="left staff-name">平台角色</span>
						<div class="option-content relative left pointer" @click.stop="onClick_dropListBtn">
							所有<i class="icon-trangle pointer" :class="isShowStatusList?'rotate':''"></i>
							<drop-list :dropList=roleList :isShowDropList="isShowStatusList"
									   @change="onClick_roleItem" ref="dropList"></drop-list>
						</div>
					</div>
					<div class="search-name left clear">
						<span class="left">姓名</span>
						<input-bar class="search-input left relative" placeholder="" type="text"
								   v-model="name"></input-bar>
					</div>
					<div class="action-wrap left clear">
						<span class="left action-btn ani-time pointer" @click="onClick_searchBtn">查询</span>
						<span class="left total-btn ani-time pointer" @click="onClick_selectAllBtn">全部</span>
					</div>
				</div>
			</div>
			<div class="table-content staff-table">
				<table class="inner-table">
					<thead>
					<tr>
						<th><span class="rank-num">序号</span></th>
						<th>姓名</th>
						<th>所属公司</th>
						<th>所属部门</th>
						<th>职务名称</th>
						<th>岗位名称</th>
						<th>岗位类型</th>
						<th>角色</th>
						<th><p class="action-menu">操作</p></th>
					</tr>
					</thead>
					<tbody>
					<tr v-for="(item,index) in accountList">
						<td><span class="rank-num">{{index+1}}</span></td>
						<td>{{item.name}}</td>
						<td>{{item.companyName}}</td>
						<td>{{item.departmentName}}</td>
						<td>{{item.dutyName}}</td>
						<td>{{item.positionName}}</td>
						<td>{{item.positionType}}</td>
						<td>{{item.roleName}}</td>
						<td>
							<p class="action-menu clear">
								<span class="left pointer draw-line ani-time" @click="onClick_jobBtn(item)">岗位设置
								</span>
								<span class="left pointer draw-line ani-time" @click="onClick_roleBtn(item)">角色设置</span>
								<span class="left pointer draw-line ani-time" @click="onClick_stopBtn(item)">停用</span>
							</p>
						</td>
					</tr>
					</tbody>
				</table>
				<div class="show-page clear" v-if="g.data.searchAccountPool.totalPage > 1">
					<common-page class="right" :total="g.data.searchAccountPool.total" :currPage="currPage"
								 :showPageSize="false" :showTotalCount="true"
								 :showElevator="true"
								 :showFirstAndEnd="true"
								 @change="onChange_pageCom"></common-page>
				</div>
			</div>
			<set-role-pop @close="onClose_setRolePop" :isShowPopView="isShowSetRolePop"></set-role-pop>
			<order-work-pop @close="onClose_orderWorkPop" :isShowPopView="isShowOrderWorkPop"></order-work-pop>
		</div>
	</com-layout>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import ComLayout from "../../components/comLayout.vue";
	import CommonPage from "../../components/page.vue";
	import DropList from "../../components/dropList.vue";
	import InputBar from "../../components/inputBar.vue";
	import SetRolePop from "../../components/pop/setRolePop.vue";
	import OrderWorkPop from "../../components/pop/orderWorkPop.vue";
	export default{
		created(){
			this.routerUpdated();
		},
		data(){
			return {
				g: g,
				accountList: [],
				roleList: [],
				currPage: 1,
				currRole: 0,
				name: "",
				typeList: [0, 1, 2],
				isShowStatusList: false,
				isShowSetRolePop: false,
				isShowOrderWorkPop: true,
			}
		},
		components: {
			ComLayout,
			CommonPage,
			DropList,
			InputBar,
			SetRolePop,
			OrderWorkPop
		},
		methods: {
			routerUpdated()
			{
				this.accountList = g.data.searchAccountPool.list;
				this.typeList = JSON.parse(g.vue.getQuery("typeList", "[]"));
				this.currPage = int(g.vue.getQuery("page", 1));
				this.name = g.vue.getQuery("name", "");
				this.currRole = g.vue.getQuery("role", 0);
				this.initEvents();
			},
			init()
			{
				this.typeList = [0, 1, 2];
				this.currPage = 1;
				this.name = "";
				this.currRole = 0;
				this.updateUrl();
			},
			initEvents()
			{
				document.addEventListener("click", this.onClick_doc);
			},
			removeEvents()
			{
				document.removeEventListener("click", this.onClick_doc);
			},
			onClick_doc(e)
			{
				if (this.$refs.dropList && !this.$refs.dropList.$el.contains(e.target))
				{
					this.isShowStatusList = false;
				}
			},
			onClick_positionType($type)
			{
				var index = this.typeList.indexOf($type);
				if (index >= 0)
				{
					this.typeList.splice(index, 1);
				}
				else
				{
					this.typeList.push($type);
				}
				this.currPage = 1;
			},
			onClick_roleItem($id)
			{
				this.currRole = $id;
				this.currPage = 1;
			},
			onChange_pageCom($page)
			{
				this.currPage = $page;
				this.updateUrl();
			},
			onClick_dropListBtn()
			{
				if (this.isShowStatusList)
				{
					this.isShowStatusList = false;
				}
				else
				{
					this.isShowStatusList = true;
				}
			},
			onClick_selectAllBtn()
			{
				this.init();
				this.updateUrl()
			},
			onClick_searchBtn()
			{
				this.updateUrl();
			},
			onClick_jobBtn($item)
			{
				this.isShowOrderWorkPop = true;
			},
			onClick_roleBtn($item)
			{
				this.isShowSetRolePop = true;
			},
			onClick_stopBtn($item)
			{

			},
			onClose_setRolePop()
			{
				this.isShowSetRolePop = false;
			},
			onClose_orderWorkPop(){
				this.isShowOrderWorkPop = false;
			},
			onClick_unVerifyBtn()
			{
				g.url = "/unverifyman";
			},
			updateUrl()
			{
				g.url = {
					path: "/account",
					query: {
						typeList: JSON.stringify(this.typeList),
						page: int(this.currPage),
						name: this.name,
						role: this.currRole
					}
				}
			}
		},
		beforeDestroy()
		{
			this.removeEvents();
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">
	@import "../../css/mixin.scss";
	@import "../../css/accountman.scss";
</style>