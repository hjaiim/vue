<template>
	<com-layout currPath="/oppman">
		<div class="oppman-wrap">
			<div class="oppman-banner clear">
				<div class="business-form left" ref="businessType">
					<span class="personal-title business-title  left">业务名称</span>
					<div class="personal-content left relative form-list business-list" @click="onClick_dropListBtn">
						<span :class="['icon-trangle', isShowBusinessList?'rotate':'']"></span>
						<ul class="absolute drop-list" v-show="isShowBusinessList">
							<li @click="onClick_typeItem(item.id)" v-for="item in typeList">{{item.name}}</li>
						</ul>
					</div>
				</div>

				<div class="from-group status-form p-left left">
					<span class="form-title left">状态</span>
                    <span class="action-box status-type left" @click="onClick_statusItem(0)">
                        <i class="pointer" :class="status == 0?'action':''"></i>
                        <span>审核中</span>
                    </span>
                    <span class="action-box status-type left" @click="onClick_statusItem(1)">
                        <i class="pointer" :class="status == 1?'action':''"></i>
                        <span>未通过</span>
                    </span>
                      <span class="action-box status-type left" @click="onClick_statusItem(2)">
                        <i class="pointer" :class="status == 2?'action':''"></i>
                        <span>已通过</span>
                    </span>
				</div>
				<div class="date-box p-left left">
					<span class="create-time left">创建时间</span>
					<div class="date-form left relative" @click="onClick_dateSelect('start')">
						2017-12-25 00:00:00
						<img :src="g.path.images+'/date-icon.png'" alt="" class="absolute date-icon">
					</div>
					<span class="date-line left">-</span>
					<div class="date-form left relative" @click="onClick_dateSelect('end')">
						2017-12-25 00:00:00
						<img :src="g.path.images+'/date-icon.png'" alt="" class="absolute date-icon">
					</div>
				</div>
				<div class="search-box search-size left clear clearfix">
					<span class="customer-name left">客户经理</span>
					<input type="text" class="search-input left" v-model="creatorName">
				</div>
				<div class=" search-box search-size p-left left">
					<span class="customer-name">客户公司名称</span>
					<input type="text" class="search-input" v-model="companyName">
					<span class="search-btn active-btn ani-time pointer" @click="onClick_searchBtn">搜索</span>
					<span class="all-btn active-btn ani-time pointer" @click="onClick_selectAllBtn">全部</span>
				</div>
			</div>
			<div class="table-content oppman-table">
				<table class="inner-table">
					<thead>
					<tr>
						<th><span class="rank-num">序号</span></th>
						<th>单号</th>
						<th>客户经理</th>
						<th>所属公司</th>
						<th>客户公司名称</th>
						<th>业务名称</th>
						<th>创建时间</th>
						<th>审核状态</th>
						<th><p class="action-menu">操作</p></th>
					</tr>
					</thead>
					<tbody>
					<tr v-for="(item,index) in businessList">
						<td><span class="rank-num">{{index+1}}</span></td>
						<td><span>{{item.orderNo}}</span></td>
						<td>{{item.creatorName}}</td>
						<td>{{item.companyName}}</td>
						<td>{{item.customerCompName}}</td>
						<td>{{item.typeName}}</td>
						<td>{{item.createTime}}</td>
						<td>{{item.auditStatusDesc}}</td>
						<td>
							<p class="action-menu clear" v-if="item.operation== 0">
                                <span class="right pointer draw-line ani-time"
									  @click="onClick_detailBtn(item.id)">详情</span>
							</p>

							<p class="action-menu clear" v-if="item.operation== 1">
                                <span class="right pointer draw-line ani-time"
									  @click="onClick_editBtn(item.id)">重新编辑</span>
							</p>

							<p class="action-menu clear" v-if="item.operation== 2">
                                <span class="right pointer draw-line ani-time"
									  @click="onClick_auditBtn(index+1)">审核</span>
							</p>

						</td>
					</tr>
					</tbody>
				</table>
				<div class="show-page clear" v-if="g.data.searchBusinessPool.totalPage > 1">
					<common-page class="right" :total="g.data.searchBusinessPool.total" :currPage="currPage"
								 :showPageSize="false"
								 :showTotalCount="true"
								 :showElevator="true"
								 :showFirstAndEnd="true"
								 @change="onChange_pageCom"
					></common-page>
				</div>
			</div>
		</div>
		<business-detail-pop :isShowPopView="isShowDetailPop" :currId="currId"></business-detail-pop>
	</com-layout>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import ComLayout from "../../components/comLayout.vue"
	import CommonPage from "../../components/page.vue";
	import BusinessDetailPop from "../../components/pop/businessDetail.vue"
	export default{
		created(){
			this.routerUpdated();
		},
		data(){
			return {
				g: g,
				businessList: [],
				typeList: [],
				isShowDetailPop: false,
				currPage: 1,
				type: 1,
				status: 1,
				startTime: 0,
				endTime: g.timeTool.getNowStamp(),
				creatorName: '',
				companyName: "",
				currId:0
			}
		},
		components: {
			ComLayout,
			CommonPage,
			BusinessDetailPop
		},
		methods: {
			init()
			{
				this.currPage = 1;
				this.type = 0;
				this.status = 0;
				this.startTime = 0;
				this.endTime = g.timeTool.getNowStamp();
				this.creatorName = "";
				this.companyName = "";
			},
			routerUpdated()
			{
				this.businessList = g.data.searchBusinessPool.list;
				this.currPage = int(g.vue.getQuery("page", 1));
				this.type = g.vue.getQuery("type", 1);
				this.status = g.vue.getQuery("status", 1);
				this.startTime = g.vue.getQuery("startTime", 0);
				this.endTime = g.vue.getQuery("endTime", g.timeTool.getNowStamp());
				this.creatorName = g.vue.getQuery("creatorName", 1);
				this.companyName = g.vue.getQuery("companyName", 1);
			},
			onClick_dropListBtn()
			{
				if (this.isShowBusinessList)
				{
					this.isShowBusinessList = false;
				}
				else
				{
					this.isShowBusinessList = true;
				}
			},
			onClick_typeItem($type)
			{
				this.type = $type;
			},
			onClick_statusItem($status)
			{
				this.status = $status;
			},
			onClick_dateSelect($type)
			{
			},
			onClick_searchBtn()
			{
				this.updateUrl();
			},
			onClick_selectAllBtn()
			{
				this.init();
				this.updateUrl();
			},
			onChange_pageCom($page)
			{
				this.currPage = $page;
				this.updateUrl();
			},
			onClick_detailBtn($id)
			{
				if (g.data.businessPool.hasDetail($id))
				{
					this.isShowDetailPop = true;
				}
				else
				{

				}
			},
			onClick_editBtn()
			{

			},
			onClick_auditBtn()
			{

			},
			updateUrl()
			{
				g.url = {
					path: "/oppman",
					query: {
						page: this.currPage,
						type: this.type,
						status: this.status,
						startTime: this.startTime,
						endTime: this.endTime,
						creatorName: this.creatorName,
						companyName: this.companyName
					}
				};
			}
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css" scoped>
	@import "../../css/oppMan.scss";
</style>