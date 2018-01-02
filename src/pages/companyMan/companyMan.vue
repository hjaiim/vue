<template>
	<com-layout currPath="/companyman">
		<div class="plat-wrap">
			<div class="action-wrap clear">
				<span class="add-btn action-btn ani-time left pointer" @click="onClick_addCompanyBtn">
					<i class="cross-txt relative"></i>
					<span>新增</span>
				</span>
				<div class="search-wrap clear left">
					<span class="left">公司名称</span>
					<input-bar class="search-bar left relative" placeholder="" type="text"
							   v-model="customerName" @keyenter="onKeyEnter_inputBar"></input-bar>

				</div>
				<span class="search-btn action-btn ani-time left pointer" @click="onClick_searchBtn">查询</span>
			</div>
			<div class="table-content">
				<table class="inner-table">
					<thead>
					<tr>
						<th><span class="rank-num">序号</span></th>
						<th>公司名称</th>
						<th>部门总数</th>
						<th>职务总数</th>
						<th>公司负责人</th>
						<th>负责人电话</th>
						<th>公司电话</th>
						<th><p class="action-menu">操作</p></th>
					</tr>
					</thead>
					<tbody>
					<tr v-for="(item,index) in companyList">
						<td><span class="rank-num">{{index+1}}</span></td>
						<!--:class="[index==2?'is-picked':'', index==5?'wait-pick':'']"-->
						<td><span>{{item.name}}</span></td>
						<td>{{item.departCount}}</td>
						<td>{{item.dutyCount}}</td>
						<td>{{item.leader}}</td>
						<td>{{item.phone}}</td>
						<td>{{item.telphone}}</td>
						<td>
							<p class="action-menu clear">
                                <span class="left pointer draw-line ani-time" @click="onClick_detailBtn(item.id)">编辑
							</span>
								<span class="right pointer draw-line ani-time" @click="onClick_deleteBtn(item.id)">删除
									<delete-pop :isDeletePop="item.isShow"
												@close="onClose_deletePop">
										<i>您是否真的要删除该公司？</i>
									</delete-pop>
							</span>
							</p>
						</td>
					</tr>
					</tbody>
				</table>
				<empty-pop v-show="companyList.length==0"></empty-pop>
				<div class="show-page clear" v-if="g.data.searchCompanyPool.totalPage > 1">
					<common-page class="right" :total="g.data.searchCompanyPool.total" :currPage="currPage"
								 :showTotalCount="true"
								 :showElevator="true"
								 :showFirstAndEnd="true"
								 @change="onChange_pageCom"></common-page>
				</div>
			</div>
		</div>

		<add-company-pop :isShowPopView="isShowCompanyPop"
						 @close="onClose_companyPop"
						 :currId="currId"></add-company-pop>

	</com-layout>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import ComLayout from "../../components/comLayout.vue";
	import CommonPage from "../../components/page.vue";
	import DeletePop from "../../components/pop/deletePop.vue";
	import AddCompanyPop from "../../components/pop/addCompanyPop.vue";
	import InputBar from "../../components/inputBar.vue";
	import EmptyPop from "../../components/pop/emptyPop.vue"
	import {searchCompanyList} from './companyMan';
	var _delId = 0;
	var _params = null;
	export default{
		created(){

			this.routerUpdated();
		},
		data(){
			return {
				g: g,
				companyList: [],
				currId: 0,
				currPage: 1,
				customerName: "",
				isShowCompanyPop: false
			}
		},
		components: {
			ComLayout,
			CommonPage,
			DeletePop,
			AddCompanyPop,
			InputBar,
			EmptyPop
		},
		computed: {
			totalPages()
			{
				return Math.ceil(g.data.searchCompanyPool.total / 10);
			}
		},
		watch: {
			companyList($val)
			{
				if ($val.length == 0)
				{
					this.currPage = 1;
					this.updateUrl();
				}
			}
		},
		methods: {
			routerUpdated()
			{
				this.companyList = g.data.searchCompanyPool.list;
			},
			onClick_deleteBtn($id)
			{
				_delId = $id;
				g.data.searchCompanyPool.getDataById(_delId).update({isShow: true})
			},
			onClose_deletePop($result)
			{
				g.data.searchCompanyPool.getDataById(_delId).update({isShow: false});
				if ($result)
				{
					_params = {comId: _delId};
					g.ui.showLoading();
					g.net.call("organizeOpt/deleteCompanyById", _params).then(($data) =>
					{
						g.ui.hideLoading();
						g.data.searchCompanyPool.remove(_delId);
						g.ui.toast("公司删除成功！");
					}, (err) =>
					{
						g.func.dealErr(err);
					})
				}
			},
			onClick_detailBtn($id)
			{
				if (g.data.searchCompanyPool.hasDetail($id))
				{
					this.currId = $id;
					this.isShowCompanyPop = true;
				}
				else
				{
					g.ui.showLoading()
					g.net.call("organizeQuery/organizeDetail", {comId: $id}).then(($data) =>
					{
						g.ui.hideLoading();
						var companyData = g.data.searchCompanyPool.getDataById($id);
						if (companyData)
						{
							companyData.update($data.companyResult);
						}
						g.data.departmentPool.removeAll();
						g.data.dutyPool.removeAll();
						g.data.departmentPool.update($data.departWrapperResults);
						this.currId = $id;
						this.isShowCompanyPop = true;
					}, (err) =>
					{
						g.func.dealErr(err);
					})
				}

			},
			onClick_addCompanyBtn()
			{
				this.currId = 0;
				this.isShowCompanyPop = true;
			},
			onClose_companyPop($result)
			{
				this.isShowCompanyPop = false;
				searchCompanyList(g.currentRoute.query).then(() =>
				{
					this.routerUpdated();
				});
			},
			onKeyEnter_inputBar()
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
			updateUrl()
			{
				g.url = {
					path: "/companyman",
					query: {
						page: this.currPage,
						customerName: this.customerName
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