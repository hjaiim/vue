<template>
	<com-layout currPath="/positionman">
		<div class="plat-wrap">
			<div class="action-wrap clear">
				<span class="add-btn action-btn ani-time left pointer" @click="onClick_addPostBtn">
					<i class="cross-txt relative"></i>
					<span>新增</span>
				</span>
			</div>
			<div class="table-content post-table">
				<table class="inner-table">
					<thead>
					<tr>
						<th><span class="rank-num">序号</span></th>
						<th>岗位名称</th>
						<th>类型</th>
						<th>设定人</th>
						<th>设定时间</th>
						<th><p class="action-menu">操作</p></th>
					</tr>
					</thead>
					<tbody>
					<tr v-for="(item,index) in positionList">
						<td><span class="rank-num">{{index+1}}</span></td>
						<td>{{item.name}}</td>
						<td>{{item.typeDesc}}</td>
						<td>{{item.creator}}</td>
						<td>{{item.createTime}}</td>
						<td>
							<p class="action-menu clear">
								<span class="left pointer draw-line ani-time"
									  @click="onClick_detailBtn(item.id)">修改</span>
								<span class="right pointer draw-line ani-time" @click="onClick_deleteBtn(item.id)">删除
									<delete-pop :isDeletePop="item.isShow"
												@close="onClose_deletePop">
										<i>您是否真的要删除该岗位吗？</i>
									</delete-pop>
							</span>
							</p>
						</td>
					</tr>
					</tbody>
				</table>
				<empty-pop v-show="positionList.length==0"></empty-pop>
				<div class="show-page clear" v-if="g.data.searchPositionPool.totalPage > 1">
					<common-page class="right" :total="g.data.searchPositionPool.total" :currPage="currPage"
								 :showTotalCount="true"
								 :showElevator="true" :showFirstAndEnd="true"
								 @change="onChange_pageCom"></common-page>
				</div>
			</div>
		</div>
		<add-post-pop :isShowPopView="isShowPostPop" :currId="currId" @close="onClose_postPop"></add-post-pop>
	</com-layout>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import ComLayout from "../../components/comLayout.vue";
	import CommonPage from "../../components/page.vue";
	import DeletePop from "../../components/pop/deletePop.vue";
	import AddPostPop from "../../components/pop/addPostPop.vue";
	import {searchPositionList} from "./positionMan";
	import EmptyPop from "../../components/pop/emptyPop.vue"
	var _params = null;
	var _delId = 0;
	export default{
		created()
		{
			this.routerUpdated();
		},
		data(){
			return {
				g: g,
				currId: 0,
				currPage: 1,
				positionList: [],
				isShowPostPop: false
			}
		},
		components: {
			ComLayout,
			CommonPage,
			DeletePop,
			AddPostPop,
			EmptyPop
		},
		watch: {
			positionList($val)
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
				this.currPage = int(g.vue.getQuery('page', 1));
				this.positionList = g.data.searchPositionPool.list;
			},
			onClick_addPostBtn()
			{
				this.currId = 0;
				this.isShowPostPop = true;
			},
			onClick_deleteBtn($id)
			{
				_delId = $id;
				g.data.searchPositionPool.getDataById(_delId).update({isShow: true});
			},
			onClose_deletePop($result)
			{
				g.data.searchPositionPool.getDataById(_delId).update({isShow: false});
				if ($result)
				{
					_params = {stationId: _delId};
					g.ui.showLoading()
					g.net.call("organizeOpt/deleteStationById", _params).then(($data) =>
					{
						g.ui.hideLoading();
						g.data.searchPositionPool.remove(_delId);
						g.ui.toast("岗位删除成功!");

					}, (err) =>
					{
						g.func.dealErr(err);
					})
				}
			},
			onClick_detailBtn($id)
			{
				this.currId = $id;
				this.isShowPostPop = true;
			},
			onClose_postPop($result)
			{
				this.isShowPostPop = false;
				if ($result)
				{
					_params = {
						page: this.currPage,
						pageSize: 10
					};
					searchPositionList(_params).then(() =>
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
					path: '/positionman',
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