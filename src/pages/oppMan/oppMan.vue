<template>
	<com-layout currPath="/oppman">
		<div class="oppman-wrap">
			<div class="oppman-banner clear">
				<div class="business-form left" ref="businessType">
					<span class="personal-title business-title  left">业务名称</span>
					<div class="personal-content left relative form-list business-list pointer"
						 @click="onClick_dropListBtn">
						{{currType}}
						<span :class="['icon-trangle', isShowBusinessList?'rotate':'']"></span>
						<drop-list class="absolute drop-list" :dropList="typeList"
								   :isShowDropList="isShowBusinessList"
								   @change="onClick_typeItem"></drop-list>
					</div>
				</div>
				<div class="from-group status-form p-left left">
					<span class="form-title left">状态</span>
                    <span class="action-box status-type left" @click="onClick_statusItem(1)">
                        <i class="draw-tick relative pointer" :class="statusList.indexOf(1) >= 0?'action':''"></i>
                        <span>审核中</span>
                    </span>
                    <span class="action-box status-type left" @click="onClick_statusItem(-1)">
                        <i class="draw-tick relative pointer" :class="statusList.indexOf(-1)>= 0?'action':''"></i>
                        <span>未通过</span>
                    </span>
                      <span class="action-box status-type left" @click="onClick_statusItem(2)">
                        <i class="draw-tick relative pointer" :class="statusList.indexOf(2)>= 0?'action':''"></i>
                        <span>已通过</span>
                    </span>
				</div>

				<div class="date-box p-left left">
					<span class="create-time left">创建时间</span>
					<div class="date-form left relative pointer" @click="onClick_dateSelect('Start')">
						{{startDate}}
						<img :src="g.path.images+'/date-icon.png'" alt="" class="absolute date-icon">
						<common-date @change="onChange_date" :isShowDatePicker="isShowStartDate"
									 type="hour"></common-date>

					</div>
					<span class="date-line left">-</span>
					<div class="date-form left relative pointer" @click="onClick_dateSelect('End')">
						{{endDate}}
						<img :src="g.path.images+'/date-icon.png'" alt="" class="absolute date-icon">
						<common-date @change="onChange_date" :isShowDatePicker="isShowEndDate"
									 type="hour"></common-date>
					</div>
				</div>
				<div class="search-box search-size left clear clearfix">
					<span class="customer-name left">客户经理</span>
					<input-bar class="search-input left relative" placeholder="" type="text"
							   v-model="creatorName"></input-bar>
				</div>
				<div class=" search-box search-size p-left left">
					<span class="customer-name">客户公司名称</span>

					<input-bar class="search-input relative" placeholder="" type="text"
							   v-model="companyName" @keyenter="onKeyEnter_searchInput"></input-bar>
					<span class=" active-btn ani-time pointer action-btn" @click="onClick_searchBtn">搜索</span>
					<span class=" active-btn ani-time pointer cancel-btn" @click="onClick_selectAllBtn">全部</span>
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
									  @click="onClick_auditBtn(item.id)">审核</span>
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
		<business-detail-pop :isShowPopView="isShowDetailPop" :currId="currId"
							 @close="onClose_detailPop"></business-detail-pop>
	</com-layout>
</template>
<script type="text/ecmascript-6">
	import g from "../../global";
	import * as func from "../../js/func"
	import ComLayout from "../../components/comLayout.vue"
	import CommonPage from "../../components/page.vue";
	import BusinessDetailPop from "../../components/pop/businessDetail.vue";
	import InputBar from "../../components/inputBar.vue";
	import CommonDate from "../../components/dateBox.vue";
	import DropList from "../../components/dropList.vue"
	var _dateType = "", _params = null;
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
				isShowBusinessList: false,
				currPage: 1,
				isShowStartDate: false,
				isShowEndDate: false,
				type: 1,
				statusList: [],
				startTime: 1400000000,
				endTime: g.timeTool.getNowStamp(),
				creatorName: '',
				companyName: "",
				currId: 0
			}
		},
		components: {
			ComLayout,
			CommonPage,
			BusinessDetailPop,
			InputBar,
			CommonDate,
			DropList
		},
		computed: {
			currType()
			{
				if (this.type > 0)
				{
					return g.data.staticTypePool.getDataById(this.type) &&
							g.data.staticTypePool.getDataById(this.type).name;
				}
				return "全部";
			},
			startDate()
			{
				return g.timeTool.getFullDate(this.startTime, true);
			},
			endDate()
			{
				return g.timeTool.getFullDate(this.endTime, true);
			}
		},
		methods: {
			init()
			{
				this.currPage = 1;
				this.type = -1;
				this.statusList = [1, -1, 2];
				this.startTime = 1400000000;
				this.endTime = g.timeTool.getNowStamp();
				this.creatorName = "";
				this.companyName = "";
			},
			routerUpdated()
			{
				this.typeList = g.data.staticTypePool.list;
				this.businessList = g.data.searchBusinessPool.list;
				this.currPage = int(g.vue.getQuery("page", 1));
				this.type = g.vue.getQuery("type", -1);
				var statusList = g.vue.getQuery("statusList", "[1,-1,2]");
				this.statusList = JSON.parse(statusList).map(function (item)
				{
					return int(item);
				});
				this.startTime = g.vue.getQuery("startTime", 1400000000);
				this.endTime = g.vue.getQuery("endTime", g.timeTool.getNowStamp());
				this.creatorName = g.vue.getQuery("creatorName", "");
				this.companyName = g.vue.getQuery("companyName", "");
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
				this.isShowStartDate = false;
				this.isShowEndDate = false;
			},
			onClick_typeItem($type)
			{
				this.type = $type;
				this.isShowBusinessList = false;
			},
			onClick_statusItem($status)
			{
				var index = this.statusList.indexOf($status);
				if (index >= 0)
				{
					this.statusList.splice(index, 1);
				}
				else
				{
					this.statusList.push($status);
				}
			},
			onClick_dateSelect($type)
			{
				_dateType = $type;
				this['isShow' + $type + 'Date'] = true;
			},
			onKeyEnter_searchInput()
			{
				this.onClick_searchBtn();
			},
			onClick_searchBtn()
			{
				this.currPage = 1;
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
				if (g.data.searchBusinessPool.hasDetail($id))
				{
					this.currId = $id;
					this.isShowDetailPop = true;
				}
				else
				{
					_params = {orderId: $id};
					g.net.call("bo/viewOrderDetail", _params).then(($data) =>
					{
						g.data.searchBusinessPool.getDataById($id).update($data);
						this.currId = $id;
						this.isShowDetailPop = true;
					})
				}
			},
			onClick_editBtn($id)
			{
				g.url = {
					path: "/oppapply",
					query: {
						id: $id
					}
				}
			},
			onClick_auditBtn($id)
			{
				var businessData = g.data.searchBusinessPool.getDataById($id);
				_params = {
					orderId: $id,
					todoId: businessData.engineResult.todoId,
					processTemplateId: businessData.engineResult.processTemplateId,
					processInstanceId: businessData.engineResult.processInstanceId,
					taskId: businessData.engineResult.taskId,
					taskInstanceId: businessData.engineResult.taskInstanceId
				};
				g.net.call("bo/auditOrderDetail", _params).then(($data) =>
				{
					g.data.searchBusinessPool.getDataById($id).update($data);
					this.currId = $id;
					this.isShowDetailPop = true;
				})
			},
			onClose_detailPop(){
				this.isShowDetailPop = false;
			},
			updateUrl()
			{
				debugger;

				g.url = {
					path: "/oppman",
					query: {
						page: this.currPage,
						type: this.type,
						statusList: JSON.stringify(this.statusList),
						startTime: this.startTime,
						endTime: this.endTime,
						creatorName: this.creatorName,
						companyName: this.companyName
					}
				};
			},
			onChange_date($timeStamp)
			{
				this[_dateType.toLowerCase() + 'Time'] = $timeStamp;
				this.isShowStartDate = false;
				this.isShowEndDate = false;
				_dateType = "";
			},
		}
	}
</script>
<style type="text/css" lang="sass" rel="stylesheet/css" scoped>
	@import "../../css/oppMan.scss";
</style>