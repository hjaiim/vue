<template>
	<com-layout class="unverify-wrap" currPath="/accountman" :isInited="false">
		<div class="staff-wrap">
			<div class="status-wrap clear">
				<div class="verify-btn total-btn right pointer" @click="onClick_verifyBtn">已认证</div>
				<div class="option-wrap left">
					<div class="search-name left clear ">
						<span class="left diff-padding">姓名</span>
						<input-bar class="search-input left relative" placeholder="" type="text"
								   v-model="name"></input-bar>
					</div>
					<div class="action-wrap left clear">
						<span class="left action-btn ani-time pointer" @click="onClick_searchBtn">查询</span>
						<span class="left total-btn ani-time pointer" @click="onClick_selectAllBtn">全部</span>
					</div>
				</div>
			</div>
			<div class="table-content verify-table">
				<table class="inner-table">
					<thead>
					<tr>
						<th><span class="rank-num">序号</span></th>
						<th>姓名</th>
						<th>所属公司</th>
						<th>所属部门</th>
						<th>职务名称</th>
						<th>提交时间</th>
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
						<td>{{item.createTime}}</td>
						<td>
							<p class="clear diff-action">
								<span class="right pointer draw-line ani-time" @click="onClick_detailBtn(item.id)">详情
								</span>
							</p>
						</td>
					</tr>
					</tbody>
				</table>
				<empty-pop v-show="accountList.length==0"></empty-pop>
				<div class="show-page clear" v-if="g.data.searchUnverifyPool.totalPage > 1">
					<common-page class="right" :total="g.data.searchUnverifyPool.total" :currPage="currPage"
								 :showPageSize="false"
								 :showTotalCount="true"
								 :showElevator="true"
								 :showFirstAndEnd="true"
								 @change="onChange_pageCom"></common-page>
				</div>
			</div>
			<account-des-pop @close="onClose_accountDesPop" :currId="currId"
							 :isShowPopView="isShowDetailPop"></account-des-pop>
		</div>
	</com-layout>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import ComLayout from "../../components/comLayout.vue";
	import CommonPage from "../../components/page.vue";
	import DropList from "../../components/dropList.vue";
	import InputBar from "../../components/inputBar.vue";
	import AccountDesPop from "../../components/pop/accountDesPop.vue"
	import {searchUnverifyList} from "./unverifyMan";
	import EmptyPop from "../../components/pop/emptyPop.vue"
	export default{
		created(){
			this.routerUpdated();
		},
		data(){
			return {
				g: g,
				accountList: [],
				isShowDetailPop: false,
				currPage: 1,
				name: "",
				currId: 0
			}
		},
		components: {
			ComLayout,
			CommonPage,
			DropList,
			InputBar,
			AccountDesPop,
			EmptyPop
		},
		watch: {
			accountList($val)
			{
				if ($val.length == 0)
				{
					this.onClick_selectAllBtn();
				}
			}
		},
		methods: {
			init()
			{
				this.currPage = 1;
				this.name = "";
			},
			routerUpdated()
			{
				this.accountList = g.data.searchUnverifyPool.list;
				this.currPage = int(g.vue.getQuery("page", 1));
				this.name = g.vue.getQuery("name", "");
			},
			onClick_verifyBtn()
			{
				g.url = "/accountman";
			},
			onKeyenter_inputBar()
			{
				this.onClick_searchBtn();
			},
			onClick_searchBtn()
			{
				this.currPage = 1;
				this.updateUrl();
			},

			onChange_pageCom($page)
			{
				this.currPage = $page;
				this.updateUrl();
			},
			onClick_selectAllBtn()
			{
				this.init();
				this.updateUrl();
			},
			onClose_accountDesPop($result)
			{
				this.isShowDetailPop = false;
				if ($result)
				{
					searchUnverifyList().then(() =>
					{
						this.routerUpdated();
					})
				}
			},
			onClick_detailBtn($id)
			{
				if (g.data.searchUnverifyPool.hasDetail($id))
				{
					this.currId = $id;
					this.isShowDetailPop = true;
				}
			},
			updateUrl()
			{
				g.url = {
					path: "/unverifyman",
					query: {
						page: this.currPage,
						name: this.name
					}
				}
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css">
	@import "../../css/mixin.scss";
	@import "../../css/accountman.scss";
</style>